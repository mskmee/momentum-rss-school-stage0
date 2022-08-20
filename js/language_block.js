import { showTime } from "./time.js";
import { ShowWeather } from "./weather.js";
import { translateQuote } from "./quotes.js";
import { quoteId } from "./quotes.js";
import { data } from "./greatings_block.js";
import { optionsUpd } from "./settings.js";

const dataRu = {
    'Язык': [{'en': 'on'}, {'ru': 'off'}, {'ua': 'off'}],
    'Виддимость': [{'время': 'off'}, {'дата': 'off'},{'приветсвтвие': 'off'}, {'цитата': 'off'}, {'погода': 'off'}, {'проигрыватель': 'off'}, {'список дел': 'off'}, {'панель смены языка': 'off'}],
    'Photo-Source': [{'github': 'off'}, {'flickr': 'off'}, {'unsplash': 'on'}],
}

const dataUa = {
    'Language': [{'en': 'on'}, {'ru': 'off'}, {'ua': 'off'}],
    'Visability': [{'time': 'off'}, {'date': 'off'},{'greeting': 'off'}, {'quote': 'off'}, {'weather': 'off'}, {'player': 'off'}, {'todolist': 'off'}, {'languege-block': 'off'}],
    'Photo-Source': [{'github': 'off'}, {'flickr': 'off'}, {'unsplash': 'on'}],
}

export const getLanguage = () => {
    if(JSON.parse(localStorage.getItem('state'))){
        for(const el in JSON.parse(localStorage.getItem('state')).Language){
            for(const [key, value] of Object.entries(JSON.parse(localStorage.getItem('state')).Language[el])){
                if(value === 'on'){
                     return key;
                }
            }
        }
    }else{
        return 'en'
    }
}
export let language = getLanguage();

const languageActive = document.querySelector('.languege-block'),
      languageChosen = document.querySelector('.lang'),
      chooseBlock = document.querySelector('.choose-block'),
      languageList = document.querySelector('.languege-list');

languageChosen.textContent = language.toUpperCase();

export const openLanguageChange = () => {   
    languageList.classList.add('_active');
    chooseBlock.classList.add('_active');
}

export const changeLanguage = (lang) => {
    if(lang !== ''){
        language = lang;
        languageChosen.textContent = lang.toUpperCase();
        for(const el in data['Language']){
            for(const [key, value] of Object.entries(data['Language'][el])){
                if(key === lang){
                    data['Language'][el][key] = 'on'
                }else data['Language'][el][key] = 'off'
            }
        }
        optionsUpd(data, lang)
        showTime();
        translateQuote(quoteId, lang);
        ShowWeather(document.querySelector('.city').value);
    }
}

const closeLanguageChange = (e) => {
    let newLanguage = '';
    const optionsBlock = document.querySelector('.settings-block');
    if(languageList.classList.contains('_active') && e.target.contains(languageActive) || e.target.classList.contains('languege')){
        if(e.target.classList.contains('languege')){
            newLanguage = e.target.classList.value.split(' ')[1]
        }
        if(language !== newLanguage){
            changeLanguage(newLanguage);
        }
        if(optionsBlock.classList.contains('_active')){
            languageList.classList.remove('_active')
        }else{
            languageList.classList.remove('_active')
            chooseBlock.classList.remove('_active')
        }
    }
    if(e.target.contains(chooseBlock)){
        languageList.classList.remove('_active')
        chooseBlock.classList.remove('_active')
    }
}

if(languageList){
    languageActive.addEventListener('click', openLanguageChange);
    window.addEventListener('click', (e) => closeLanguageChange(e));
}