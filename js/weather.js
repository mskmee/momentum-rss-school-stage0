import { showDayTime } from "./time.js";
import { language } from "./language_block.js";


const weatherTemp = document.querySelector('.temperature'),
      weatherIcon = document.querySelector('.weather-icon'),
      weatherDescription = document.querySelector('.weather-description'),
      weatherWind = document.querySelector('.wind'),
      weatherHumidity = document.querySelector('.humidity'),
      cityInputBlock = document.querySelector('.city'),
      weatherErrorBlock = document.querySelector('.weather-error');

async function getWeather(city, lang) {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${lang}&appid=cfdbca1de4077b4497776f73387fbb92&units=metric`;
    const result = await fetch(url);

    if(result.status === 400){
        return `Error! Nothing to geocode for!`
    } else if(result.status === 404){
        return `Error! City not found for ${city}`
    }
    const data = await result.json();
    return data
}

export const ShowWeather = (city, e) => {
    let value = getWeather(city, language);
    let daytime = showDayTime();
    weatherTemp.textContent = '';
    weatherDescription.textContent = '';
    weatherWind.textContent = '';
    weatherHumidity.textContent = ``
    weatherIcon.className = 'weather-icon owf';

    value.then((a) => {
        try{
            if(a.includes('Error')){
                weatherErrorBlock.textContent = a;
            }
        }catch(e){
            weatherErrorBlock.textContent = '';
            weatherTemp.textContent = `${Math.floor(+a.main.temp)}°C`;
            if(a.weather[0].description === 'уривчасті хмари'){
                weatherDescription.textContent = 'Переважна хмарність';
            }else{
                weatherDescription.textContent = a.weather[0].description[0].toUpperCase() + a.weather[0].description.slice(1);
            }
            if(language === 'ru'){
                weatherWind.textContent = `Скорость ветра: ${Math.floor(+a.wind.speed)} м/с`;
                weatherHumidity.textContent = `Влажность: ${a.main.humidity} %`
            }else if(language === 'ua'){
                weatherWind.textContent = `Швидкість вітру: ${Math.floor(+a.wind.speed)} м/с`;
                weatherHumidity.textContent = `Вологість: ${a.main.humidity} %`
            }else{
                weatherWind.textContent = `Wind speed: ${Math.floor(+a.wind.speed)} m/s`;
                weatherHumidity.textContent = `Humidity: ${a.main.humidity} %`
            }
            if(daytime === 'evening' || daytime === 'night'){
                weatherIcon.classList.remove(`owf-${a.weather[0].id}-d`)
                weatherIcon.classList.add(`owf-${a.weather[0].id}-n`)
            }else{
                weatherIcon.classList.remove(`owf-${a.weather[0].id}-n`)
                weatherIcon.classList.add(`owf-${a.weather[0].id}-d`)
            }
        }
    })
}

export const getWeatherUppdateEveryHour = () => {
    setInterval(function(){ShowWeather(cityInputBlock.value);}, 3600000)
}

cityInputBlock.addEventListener('change', (e) => ShowWeather(cityInputBlock.value, e));