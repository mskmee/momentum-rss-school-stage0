import { showDayTime } from "./time.js";
import { data } from "./greatings_block.js";
import { optionsUpd } from "./settings.js";

const body = document.querySelector('body'),
      nextButton = document.querySelector('.slide-next'),
      prevButton = document.querySelector('.slide-prev');

export let backgroundSource = '';
let githubImgId = '';
let githubBackgrounUrl = '';
let flickrImgArr = '';
let backgroundImgQuery = null;

const setBackground = (url) => {
    const img = new Image();
    img.src = url;
    img.onload = () => {
        body.style.backgroundImage = `url(${url})`;
    }
}

export const getBodyBackgroundUrl = () => {
    let dayTime = showDayTime()
    if(!githubImgId){
        githubImgId = Math.floor(Math.random() * (21 - 1) + 1);
    } 
    githubBackgrounUrl = githubImgId <= 9 ? `https://raw.githubusercontent.com/mskmee/mementum/assets/images/${dayTime}/0${githubImgId}.jpg` :
    `https://raw.githubusercontent.com/mskmee/mementum/assets/images/${dayTime}/${githubImgId}.jpg`
    setBackground(githubBackgrounUrl)
}

const getNextSliderItem = (backgroungUrl) => {
    let reg = /\d\d/gm;
    if(githubImgId === 20){
        githubImgId = 1
    }else{
        githubImgId += 1
    }
    let newBackgroundUrl = githubImgId <= 9 ? githubBackgrounUrl.replace(reg, `0${githubImgId}`) : githubBackgrounUrl.replace(reg, githubImgId);
    githubBackgrounUrl = newBackgroundUrl;
    setBackground(githubBackgrounUrl);
} 

const getPrevSliderItem = (backgroungUrl) => {
    let reg = /\d\d/gm;
    if(githubImgId === 1){
        githubImgId = 20
    }else{
        githubImgId -= 1
    }
    let newBackgroundUrl = githubImgId <= 9 ? githubBackgrounUrl.replace(reg, `0${githubImgId}`) : githubBackgrounUrl.replace(reg, githubImgId);
    githubBackgrounUrl = newBackgroundUrl;
    clearEventListenersFromButtons()
    nextButton.addEventListener('click', getNextSliderItem);
    prevButton.addEventListener('click', getPrevSliderItem);
    setBackground(githubBackgrounUrl)

}

async function getImgUnsplash() {
    let dayTime = showDayTime(),
        url;
    if(backgroundImgQuery){
        url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${backgroundImgQuery}&client_id=RwBc87BvCiGm461juosBScj90kgwkautcQGlut5mbaY`;
    }else{
        url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${dayTime}&client_id=RwBc87BvCiGm461juosBScj90kgwkautcQGlut5mbaY`;
    }
    const result = await fetch(url);

    if(result.status === 404 || result.status === 403){
        return changeBackgroundSourceToGit()
    }else{
        const data = await result.json();
        const imgUrl = data.urls.regular;
        setBackground(imgUrl)
    }
}

async function getImgFlickr(){
    let dayTime = showDayTime(),
        url;
    if(backgroundImgQuery){
        url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=c370b51aad42f5c70ff732180eed21df&tags=${backgroundImgQuery}&extras=url_l&format=json&nojsoncallback=1`;
    }else{
        url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=c370b51aad42f5c70ff732180eed21df&tags=${dayTime}&extras=url_l&format=json&nojsoncallback=1`;
    }
    const result = await fetch(url);
    if(result.status === 404 || result.status === 403){
        return changeBackgroundSourceToGit()
    }else{
        const data = await result.json();
        return flickrImgArr = await data.photos.photo.map((el) => el.url_l);
    }
}

async function nextPrevImgFlickr(){
    flickrImgArr = await getImgFlickr();
    const imgID = Math.floor(Math.random() * flickrImgArr.length)
    const imgUrl = flickrImgArr[imgID]
    if(imgUrl === undefined){ //check url from flicker
        nextPrevImgFlickr()
    }
    setBackground(imgUrl)
}

const clearEventListenersFromButtons = (source = null) => {
    if(source === 'github'){
        nextButton.removeEventListener('click', getImgUnsplash);
        prevButton.removeEventListener('click', getImgUnsplash);
        nextButton.removeEventListener('click', nextPrevImgFlickr);
        prevButton.removeEventListener('click', nextPrevImgFlickr);
    }else if(source === 'unsplash'){
        nextButton.removeEventListener('click', nextPrevImgFlickr);
        prevButton.removeEventListener('click', nextPrevImgFlickr);
        nextButton.removeEventListener('click', getNextSliderItem);
        prevButton.removeEventListener('click', getPrevSliderItem);
    }else if(source === 'flickr'){
        nextButton.removeEventListener('click', getImgUnsplash);
        prevButton.removeEventListener('click', getImgUnsplash);
        nextButton.removeEventListener('click', getNextSliderItem);
        prevButton.removeEventListener('click', getPrevSliderItem);
    }else{
        nextButton.removeEventListener('click', nextPrevImgFlickr);
        prevButton.removeEventListener('click', nextPrevImgFlickr);
        nextButton.removeEventListener('click', getImgUnsplash);
        prevButton.removeEventListener('click', getImgUnsplash);
        nextButton.removeEventListener('click', getNextSliderItem);
        prevButton.removeEventListener('click', getPrevSliderItem);
    }
}

export const backgroundSourceCheck = (bg, url) => {
    if(bg === 'github'){    
        clearEventListenersFromButtons(bg);
        getBodyBackgroundUrl();
        nextButton.addEventListener('click', getNextSliderItem);
        prevButton.addEventListener('click', getPrevSliderItem);
    }else if(bg === 'unsplash'){
        backgroundImgQuery = url;
        clearEventListenersFromButtons(bg);
        getImgUnsplash();
        nextButton.addEventListener('click', getImgUnsplash);
        prevButton.addEventListener('click', getImgUnsplash);   
    }else if(bg === 'flickr'){
        backgroundImgQuery = url;
        clearEventListenersFromButtons(bg);
        nextPrevImgFlickr();
        nextButton.addEventListener('click', nextPrevImgFlickr);
        prevButton.addEventListener('click', nextPrevImgFlickr);   
}
}

const changeBackgroundSourceToGit = () => {
    backgroundSourceCheck('github')
    for(let el in data['Photo-Source']){
        for(const key of Object.keys(data['Photo-Source'][el])){
            if(key === 'github'){
                data['Photo-Source'][el][key] = 'on';
            }else{
                data['Photo-Source'][el][key] = 'off';
            }
        }
    }
    optionsUpd(data);
    let languageUse = ''
    for(const el in data['Language']){
        for(const [key, value] of Object.entries(data['Language'][el])){
            if(value === 'on'){
                languageUse = key
            }
        }
    }
    optionsUpd(data, languageUse);
    if(languageUse === 'en'){
        alert("Image server doesn't work right now. We change it for github")
    }else if(languageUse === 'ru'){
        alert('Сервер с изображениями не доступен. Меняем сервер на github')
    }else{
        alert('Немає доступу до серверу з зображеннями. Змінили його на github')
    }
    backgroundSourceCheck('github')
}
