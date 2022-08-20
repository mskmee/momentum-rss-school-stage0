import { language } from "./language_block.js";


const timeBlock = document.querySelector('.time'),
greatingsBlock = document.querySelector('.greeting'),
dateBlock = document.querySelector('.date');

const englishToRu = {
    'afternoon': 'день',
    'evening': 'вечер',
    'night': 'ночи',
    'morning': 'утро',
};

const englishToUa = {
    'afternoon': 'дня',
    'evening': 'вечора',
    'night': 'ночі',
    'morning': 'ранку',
};

const getTime = () => {
    let now = new Date();
    let time = now.toLocaleString('en-GB');
    return time.split(',')[1]
}

const toCapitalise = (word) => {
    let result = word[0].toUpperCase() + word.slice(1);
    return result
}

const getDate = () => {
    let now = new Date();
    let options = { weekday: 'long', year: undefined, month: 'long', day: 'numeric' };
    let date = '';
    if(language === 'ru'){
        date = now.toLocaleDateString('ru-RU', options).split(' ').map((item) => toCapitalise(item)).join(' ');
    }else if(language === 'ua'){
        date = now.toLocaleDateString('uk-UA', options).split(' ').map((item) => toCapitalise(item)).join(' ');
        
    }else if(language === 'en'){
        date = now.toLocaleDateString('en-US', options)
    }
    return date
}

const showDate = () => {
    dateBlock.innerHTML = getDate();
}

export const showTime = () => {
    let dayTime = showDayTime();
    if(language === "ua"){
        if(englishToUa[dayTime] === 'ночі'){
            greatingsBlock.textContent = 'Доброї ночі';
        }else{
            greatingsBlock.textContent = `Доброго ${englishToUa[dayTime]}`;
        }
    }else if(language === 'ru'){
        if(englishToRu[dayTime] === 'утро'){
            greatingsBlock.textContent = 'Доброе утро';
        }else if(englishToRu[dayTime] === 'ночи'){
            greatingsBlock.textContent = 'Доброй ночи';
        }else{
            greatingsBlock.textContent = `Добрый ${englishToRu[dayTime]}`;
        }
    }else if(language === 'en'){
        greatingsBlock.textContent = `Good ${dayTime}`;
    }
    timeBlock.textContent = getTime();
    showDate()
    setTimeout(showTime, 1000)
}

export const showDayTime = () => {
    let time = +getTime().split(':')[0];
    switch(true){
        case (time >= 12 && time < 18):
            return 'afternoon'

        case (time >= 18 && time < 24):
            return 'evening'

        case (time >= 0 && time < 6):
            return 'night'
            
        default:
            return 'morning'
    }
}
