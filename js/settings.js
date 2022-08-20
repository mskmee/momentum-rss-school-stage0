import { changeLanguage, language } from "./language_block.js";
import { backgroundSourceCheck } from "./background.js";
import { data } from "./greatings_block.js";

    const multiLanguageOption = {'ua': {
                                    'Language': {'Мова': [{'en': 'англ'}, {'ru': 'рус'}, {'ua': 'укр'}]},
                                    'Visability':{'Відображення': [{'time': 'часи'}, {'date': 'дата'},{'greeting': 'привітання'}, {'quote': 'цитата'}, {'weather': 'погода'}, {'player': 'плеер'}, {'todolist': 'список завдань'}, {'languege-block': 'мова'}]},
                                    'Photo-Source': {'Джерело зображень': [{'github': 'github'}, {'flickr': 'flickr'}, {'unsplash': 'unsplash'}]},},
                            'ru': {
                                'Language': {'Язык': [{'en': 'англ'}, {'ru': 'рус'}, {'ua': 'укр'}]},
                                'Visability':{'Отображение': [{'time': 'часы'}, {'date': 'дата'},{'greeting': 'приветствие'}, {'quote': 'цитата'}, {'weather': 'погода'}, {'player': 'плеер'}, {'todolist': 'список задач'}, {'languege-block': 'язык'}]},
                                'Photo-Source': {'Источник изображений': [{'github': 'github'}, {'flickr': 'flickr'}, {'unsplash': 'unsplash'}]},},
                            'en': {
                                'Language': {'Мова': [{'en': 'англ'}, {'ru': 'рус'}, {'ua': 'укр'}]},
                                'Visability':{'Відображення': [{'time': 'часи'}, {'date': 'дата'},{'greeting': 'привітання'}, {'quote': 'цитата'}, {'weather': 'погода'}, {'player': 'плеер'}, {'todolist': 'список завдань'}, {'languege-block': 'мова'}]},
                                'Photo-Source': {'Джерело зображень': [{'github': 'github'}, {'flickr': 'flickr'}, {'unsplash': 'unsplash'}]},},
};

const toggleIcon = document.querySelector('.toggle-url'),
      chooseBlock = document.querySelector('.choose-block'),
      settingsBlock = document.querySelector('.settings-block');

export function optionsUpd(values, lang = 'en'){
    const settingsContainer = document.querySelector('.settings');
    if(settingsContainer.firstChild){
        while(settingsContainer.firstChild){
            settingsContainer.removeChild(settingsContainer.firstChild)
        }
    }
    for(let key in values){
        const itemValue = document.createElement('div'),
            newItem = document.createElement('div'),
            itemKey = document.createElement('div');

        newItem.classList.add('setting-item');
        itemKey.classList.add('option-key');
        itemValue.classList.add('option-value');
        if(lang === 'ua'){
            itemKey.innerHTML = Object.keys(multiLanguageOption[lang][key]);
        }else if(lang === 'ru'){
            itemKey.innerHTML = Object.keys(multiLanguageOption[lang][key]);
        }else{
            itemKey.innerHTML = key;
        }
        for(let el of values[key]){
            // let objectValue = Object.keys(el).join('')
            // let dataArr = Object.values(multiLanguageOption[lang][key]);
            // let optionTranslate = findTranslationToOption(dataArr, objectValue)
            const newValueItem = document.createElement('div');
            newValueItem.classList.add('value-item', `${Object.keys(el)}-option`, `${key.toLocaleLowerCase()}-option`);
            if(el[Object.keys(el)] === 'on'){
                newValueItem.classList.add('option-active')
            }
            // lang === 'en' ? newValueItem.innerHTML = `${Object.keys(el)}`.toUpperCase() : newValueItem.innerHTML = optionTranslate.toUpperCase()
            newValueItem.innerHTML = `${Object.keys(el)}`.toUpperCase();
            itemValue.append(newValueItem);
        }
        newItem.append(itemKey);
        newItem.append(itemValue);
        settingsContainer.append(newItem);
    }
    const newItem = document.createElement('div'),
            backgroundQuery = document.createElement('div'),
            backgroundQueryValue = document.createElement('input');
    newItem.classList.add('setting-item');
    backgroundQuery.classList.add('option-key');
    backgroundQueryValue.classList.add('option-value', 'background-query');
    backgroundQueryValue.setAttribute('type', 'text');
    lang === 'ua' ? backgroundQuery.textContent = 'Запит для фото' : lang === 'ru' ? 
    backgroundQuery.textContent = 'Запрос для фото' : backgroundQuery.textContent = 'Background query';
    newItem.append(backgroundQuery, backgroundQueryValue);
    settingsContainer.append(newItem);
}

const findTranslationToOption = (arr, optionValue) => {
    let newData = ''
    arr.forEach(el => {
        el.forEach(data => {
            if(data[optionValue] !== undefined){
                newData = data[optionValue];
            }
            })
        }) 
    return newData
}

export const getImgQuery = () => {
    const bgImgQ = document.querySelector('.background-query');
    localStorage.setItem('bgquery', bgImgQ.value);
    const url = bgImgQ.value.toLocaleLowerCase();
    for(const el in data['Photo-Source']){
        for(const [key, value] of Object.entries(data['Photo-Source'][el])){
            if(value === 'on'){
                backgroundSourceCheck(key, url);
            }
        }
    }
}

const openSettings = () => {
    if(settingsBlock.classList.contains('_active')){
        settingsBlock.classList.remove('_active');
    }else{
        settingsBlock.classList.add('_active');
        chooseBlock.classList.add('_active');
        const bgImgQ = document.querySelector('.background-query');
        bgImgQ.addEventListener('change', getImgQuery);
    }
}

const hiddenElementFromOptions = (option) => {
    let element = ''
    if(option === '.greeting'){
        element = document.querySelector('.greeting-container'); 
    }else if(option === '.quote'){
        element = document.querySelector('.quote-container');   
    }else if(option === '.languege'){
        element = document.querySelector('.languege-block');
    }else{
        element = document.querySelector(option);
    }
    setElementInvisible(element);
}   

const showElementFromOptions = (option) => {
    let element = ''
    if(option === '.greeting'){
        element = document.querySelector('.greeting-container');
    }else if(option === '.quote'){
        element = document.querySelector('.quote-container');
    }else if(option === '.languege'){
        element = document.querySelector('.languege-block');
    }else{
        element = document.querySelector(option)
    }
    setElementVisible(element)
}

const setElementVisible = (element) => {
    element.style.visibility  = 'visible';
    element.style.opacity = 1;
    element.style.transition = 'visibility 0s linear 0s, opacity 1000ms';
}

const setElementInvisible = (element) => {
    element.style.visibility = 'hidden';
    element.style.opacity = 0;
    element.style.transition = 'visibility 0s linear 300s, opacity 300ms';  
}

const switchOptionValueInLLocalHostToOn = (value) => {
    for(let i in data['Visability']){
        for(const key of Object.keys(data['Visability'][i])){
            if(key === value){
                data['Visability'][i][key] = 'on'
            }
        }
    }
}

const switchOptionValueInLLocalHostToOff = (value) => {
    for(let i in data['Visability']){
        for(const key of Object.keys(data['Visability'][i])){
            if(key === value){
                data['Visability'][i][key] = 'off'
            }
        }
    }
}

const closeSettings = (e) => {
    if(e.target.classList.contains('value-item') && !e.target.classList.contains('photo-source-option') && !e.target.classList.contains('language-option')){
        e.target.classList.toggle('option-active');
        if(e.target.classList.contains('option-active')){
            const elementClass = `.${e.target.classList[1].split('-')[0]}`;
            if(e.target.classList.contains('visability-option')){
                hiddenElementFromOptions(elementClass);
                switchOptionValueInLLocalHostToOn(e.target.textContent.toLocaleLowerCase())
            }
        }else{
            const elementClass = `.${e.target.classList[1].split('-')[0]}`;
            if(e.target.classList.contains('visability-option')){
                showElementFromOptions(elementClass);
                switchOptionValueInLLocalHostToOff(e.target.textContent.toLocaleLowerCase())
            }
        }}
    if(e.target.classList.contains('language-option')){
        const languageArr = document.querySelectorAll('.language-option');
        if(!e.target.classList.contains('option-active')){
            for(let el of languageArr){
                el.classList.remove('option-active');
            }
            e.target.classList.add('option-active');
            changeLanguage(e.target.textContent.toLocaleLowerCase());
            if(localStorage.getItem('bgquery')){
                const bgImgQ = document.querySelector('.background-query');
                bgImgQ.value = localStorage.bgquery;
            }
    }
}
    if(e.target.contains(chooseBlock) && settingsBlock.classList.contains('_active')){
        settingsBlock.classList.remove('_active');
        chooseBlock.classList.remove('_active');
    }
    if(e.target.classList.contains('photo-source-option')){
        const photoSources = document.querySelectorAll('.photo-source-option');
        if(!e.target.classList.contains('option-active')){
            for(let el of photoSources){
                el.classList.remove('option-active');
            }
            e.target.classList.add('option-active');
            for(let el in data['Photo-Source']){
                for(const [key, value] of Object.entries(data['Photo-Source'][el])){
                    if(key === e.target.textContent.toLocaleLowerCase()){
                        data['Photo-Source'][el][key] = 'on';
                    }else{
                        data['Photo-Source'][el][key] = 'off';
                    }
                }
            }
            getImgQuery();
        }
    }
}

export const setObjectVisabilityFromOptions = (data) => {
    let visabilityArr = data['Visability'];
    for(let el in visabilityArr){
        for(const [key, value] of Object.entries(visabilityArr[el])){
            let element = '';
            if(value === 'on'){
                if(key === 'quote'){
                    element = document.querySelector('.quote-container');
                }else if(key === 'greeting'){
                    element = document.querySelector('.greeting-container');
                }else{
                    element = document.querySelector(`.${key}`);
                }
                setElementInvisible(element);
            }
        }
    }
    optionsUpd(data);
}

toggleIcon.addEventListener('click', openSettings);
window.addEventListener('click', (e) => {closeSettings(e)});