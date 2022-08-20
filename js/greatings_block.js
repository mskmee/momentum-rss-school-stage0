import { ShowWeather } from "./weather.js";
import { optionsUpd, setObjectVisabilityFromOptions} from "./settings.js";
import { backgroundSourceCheck} from "./background.js";

export let data;

if(JSON.parse(localStorage.getItem('state'))){
    data = JSON.parse(localStorage.getItem('state'))
}else{
    data = {
            'Language': [{'en': 'on'}, {'ru': 'off'}, {'ua': 'off'}],
            'Visability': [{'time': 'off'}, {'date': 'off'},{'greeting': 'off'}, {'quote': 'off'}, {'weather': 'off'}, {'player': 'off'}, {'todolist': 'off'}, {'languege-block': 'off'}],
            'Photo-Source': [{'github': 'off'}, {'flickr': 'off'}, {'unsplash': 'on'}],
}
}

setObjectVisabilityFromOptions(data)

const userNameBlock = document.querySelector('.name'),
      cityInputBlock = document.querySelector('.city');

export const setLocalStorage = () => {
    localStorage.setItem('name', userNameBlock.value);
    localStorage.setItem('city', cityInputBlock.value);
    localStorage.setItem('state', JSON.stringify(data));
}

export const getLocalStorage = () => {
    if(localStorage.getItem('name')){
        userNameBlock.value = localStorage.name
    }
    if(localStorage.getItem('city')){
        cityInputBlock.value = localStorage.city
        ShowWeather(localStorage.city)
    }else{
        cityInputBlock.value = 'Minsk';
        ShowWeather('Minsk');
    }
    if(!JSON.parse(localStorage.getItem('state'))){
        optionsUpd(data, 'en');
        backgroundSourceCheck('flickr');
    }else{
        const data = JSON.parse(localStorage.getItem('state'));
        for(const el in data.Language){
            for(const [key, value] of Object.entries(data.Language[el])){
                if(value === 'on'){
                    optionsUpd(data, key);
                }
            }
        }
        for(const el in data['Photo-Source']){
            for(const [key, value] of Object.entries(data['Photo-Source'][el])){
                if(value === 'on'){
                    if(localStorage.getItem('bgquery')){
                        const bgImgQ = document.querySelector('.background-query');
                        bgImgQ.value = localStorage.bgquery;
                        backgroundSourceCheck(key, localStorage.bgquery);
                    }else{
                        backgroundSourceCheck(key);
                    }
                }
            }
        }
    }
}