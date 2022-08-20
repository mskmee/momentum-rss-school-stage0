import playList from "./playlist.js";

const playPauseIcon = document.querySelector('.play'),
      audio = document.querySelector('audio'),
      prevTreckIcon = document.querySelector('.play-prev'),
      nextTreckIcon = document.querySelector('.play-next'),
      playListContainer = document.querySelector('.play-list'),
      seekSlider = document.getElementById('seek-slider'),
      currentTimeContainer = document.getElementById('corrent-time'),
      durationContainer = document.getElementById('duration-time');


export let isPlay = false;

let playNum = 0,
    endNum = playList.length - 1;

playList.forEach((el) => {
    const li = document.createElement('li');
    li.classList.add('play-item');
    li.textContent = el.title;
    playListContainer.append(li);
})

const playListArr = document.querySelectorAll('.play-item');

const playMusicFromPlaylist = (event) => {
    if(!isPlay){
        isPlay = true;
    }
    if(!playPauseIcon.classList.contains('pause')) playPauseIcon.classList.add('pause')
    playListArr[playNum].classList.remove('item-active');
    let el = event.target;
    while(el.tagName.toLowerCase() != 'li') {
        el = el.parentNode;
    };
    playNum = [].indexOf.call(el.parentNode.children, el);
    playListArr[playNum].classList.add('item-active');
    playAudio()
}

playListContainer.addEventListener ('click', (e) => {playMusicFromPlaylist(e)});

const playAudio = () => {
    audio.currentTime = 0;
    audio.src = playList[playNum].src
    audio.play();
}

const pauseAudio = () => {
    audio.pause();
}

export const playPauseMusic = () => {
    if(isPlay){
        pauseAudio();
        playPauseIcon.classList.remove('pause')
        playListArr[playNum].classList.remove('item-active');
        isPlay = false;
    }else{
        playAudio();
        playPauseIcon.classList.add('pause')
        playListArr[playNum].classList.add('item-active');
        isPlay = true;
    }
}

const playNextTreck = () => {
    if(!isPlay){
        isPlay = true;
    }
    if(!playPauseIcon.classList.contains('pause')) playPauseIcon.classList.add('pause')
    playListArr[playNum].classList.remove('item-active');
    if(playNum  === endNum){
        playNum = 0;
    }else{
        playNum += 1;
    }
    playListArr[playNum].classList.add('item-active');
    playAudio();
}

const playPrevTreck = () => {
    if(!isPlay){
        isPlay = true;
    }
    if(!playPauseIcon.classList.contains('pause')) playPauseIcon.classList.add('pause')
    playListArr[playNum].classList.remove('item-active');
    if(playNum === 0){
        playNum = endNum;
    }else{    
        playNum -= 1;
    }
    playListArr[playNum].classList.add('item-active');
    playAudio();
}

const calculateTheTime = (sec) => {
    const minutes = Math.floor(sec / 60);
    const second = Math.floor(sec % 60);
    const returnedSeconds = second < 10 ? `0${second}` : second 
    return `${minutes}:${returnedSeconds}`
}

// const displayDuration = () => {
//     durationContainer.textContent = calculateTheTime(audio.duration)
// }

// const setSliderMax = () => {
//     seekSlider.max = Math.floor(audio.duration);
//   }

// if(audio.readyState > 0){
//     displayDuration();
//     setSliderMax();
// }else{
//     audio.addEventListener('loadedmetadata', () => {
//         displayDuration();
//         setSliderMax();
//     })
// }

// audio.addEventListener('timeupdate', () => {
//     seekSlider.value = Math.floor(audio.currentTime);
//     currentTimeContainer.textContent = calculateTheTime(seekSlider.value);
// });

playPauseIcon.addEventListener('click', playPauseMusic);
nextTreckIcon.addEventListener('click', playNextTreck);
prevTreckIcon.addEventListener('click', playPrevTreck);
// audio.addEventListener('ended', playNextTreck);
// seekSlider.addEventListener('input', () => {
//     currentTimeContainer.textContent = calculateTheTime(seekSlider.value);
// });
// seekSlider.addEventListener('change', () => {
//     audio.currentTime = seekSlider.value;
// });