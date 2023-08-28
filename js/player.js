const play = document.querySelector('.play-btn');
const playPrevBtn = document.querySelector('.audio-prev');
const playNextBtn = document.querySelector('.audio-next');
const playlistShowHide = document.querySelector('.playlist-hidden');
const nowPlayingCover = document.querySelector('.now-playing-cover');
const nowPlaying = document.querySelector('.now-playing');
const nowPlayingAuthor = document.querySelector('.now-playing-author');
const volumeBtn = document.querySelector('.volume');
const volumeBar = document.querySelector('.volume-bar');
const volumeLevel = document.querySelector('.volume-level');
const timelineBar = document.querySelector('.timeline-bar');
const progressBar = document.querySelector('.progress-bar');
const currentSongTime = document.querySelector('.current-time');
const endSongTime = document.querySelector('.song-length');
const playlistBox = document.querySelector('.playlist-box');
let isPlay = false;
let playNum = 0;

const audio = new Audio();
import playlist from './playlist.js';
audio.src = playlist[playNum].src;
audio.volume = 0.75;
audio.muted = false;

for (let i = 0; i < playlist.length; i++) {

    const playlistBox = document.querySelector('.playlist');
    const playlistItem = document.createElement('li');
    playlistItem.classList.add('play-item');

    if (i % 2 === 0) { playlistItem.classList.add('play-item-even')};

    playlistItem.textContent = playlist[i].title;
    
    playlistBox.append(playlistItem);

    const playlistButton = document.createElement('button');
    playlistButton.classList.add('button');
    playlistButton.classList.add('play-mini');
    
    playlistItem.prepend(playlistButton);    
}

let playlistButtons = document.querySelectorAll('.play-mini');
let playlistItems = document.querySelectorAll('.play-item');

for (let i = 0; i < playlistButtons.length; i++) {
    playlistButtons[i].addEventListener('click', () => {

        if (!isPlay) {

            if (playNum === i) {

                playAudio();

            } else {      

                playNum = i;
                audio.src = playlist[playNum].src;
                playAudio();

            }

            
        } else {

            if (playNum === i) {

                audio.pause();
                isPlay = false;
                playlistButtons[playNum].classList.toggle('pause');
                playlistItems[playNum].classList.remove('playing');
                play.classList.toggle('pause');

            } else {

                playlistButtons[playNum].classList.toggle('pause');
                playlistItems[playNum].classList.remove('playing');
                play.classList.toggle('pause');
                playNum = i;
                audio.src = playlist[playNum].src;
                isPlay = false;
                playAudio();

            }
            
        }
    })
}

function playAudio() {

    if (!isPlay) {
        
        audio.play();
        isPlay = true;
        play.classList.toggle('pause');
        playlistButtons[playNum].classList.toggle('pause');
        playlistItems[playNum].classList.toggle('playing');
        playlistItems[playNum].scrollIntoView({behavior: "smooth", block: "start"});

    } else {

        audio.pause();
        isPlay = false;
        play.classList.toggle('pause');
        playlistButtons[playNum].classList.toggle('pause');
        playlistItems[playNum].classList.toggle('playing');
    }
}


function playPrev() {
    if (isPlay) {
        playlistButtons[playNum].classList.toggle('pause');
        playlistItems[playNum].classList.toggle('playing');
    }
    
    (playNum !== 0) ? playNum-- : playNum = playlist.length - 1;
    
    audio.src = playlist[playNum].src;
    
    if (!isPlay) {
        
        audio.play();
        isPlay = true;
        play.classList.toggle('pause');
        playlistButtons[playNum].classList.toggle('pause');
        playlistItems[playNum].classList.toggle('playing');
        playlistItems[playNum].scrollIntoView({behavior: "smooth", block: "start"});
    } else {
        audio.play();
        isPlay = true;
        playlistButtons[playNum].classList.toggle('pause');
        playlistItems[playNum].classList.toggle('playing');
        playlistItems[playNum].scrollIntoView({behavior: "smooth", block: "start"});
    }
}

function playNext() { 
    if (isPlay) {
        playlistButtons[playNum].classList.toggle('pause');
        playlistItems[playNum].classList.toggle('playing');
    }

    (playNum !== playlist.length - 1) ? playNum++ : playNum = 0;

    audio.src = playlist[playNum].src;

    if (!isPlay) {
        
        audio.play();
        isPlay = true;
        play.classList.toggle('pause');
        playlistButtons[playNum].classList.toggle('pause');
        playlistItems[playNum].classList.toggle('playing');
        playlistItems[playNum].scrollIntoView({behavior: "smooth", block: "start"});

    } else {

        audio.play();
        isPlay = true;
        playlistButtons[playNum].classList.toggle('pause');
        playlistItems[playNum].classList.toggle('playing');
        playlistItems[playNum].scrollIntoView({behavior: "smooth", block: "start"});

    }

}

function getSongTime(currentAudio) {
    let hours = Math.floor(+currentAudio / 3600);
    let minutes = Math.floor(+currentAudio / 60) - hours * 60;
    let seconds = Math.round(+currentAudio % 60);

    return (hours === 0) ? `${String(minutes).padStart(2, 0)}:${String(seconds).padStart(2, 0)}` : `${String(hours % 60).padStart(2, 0)}:${String(minutes % 60).padStart(2, 0)}:${String(seconds % 60).padStart(2, 0)}`
}

function setSongProgress() {
    currentSongTime.textContent = getSongTime(audio.currentTime);
    progressBar.style.width = `${audio.currentTime / audio.duration * 100}%`;
}

setInterval(setSongProgress, 500);

function setVolumeLevel() {
    volumeLevel.style.width = `${audio.volume * 100}%`
}


audio.addEventListener('loadeddata', () => {
    endSongTime.textContent = getSongTime(audio.duration);
    nowPlayingCover.style.backgroundImage = `url(${playlist[playNum].cover})`;
    nowPlaying.textContent = playlist[playNum].title;
    nowPlayingAuthor.textContent = playlist[playNum].author;
});

audio.addEventListener('ended', () => {
    playlistButtons[playNum].classList.toggle('pause');
    playlistItems[playNum].classList.toggle('playing');
    
    (playNum !== playlist.length - 1) ? playNum++ : playNum = 0;

    audio.src = playlist[playNum].src;
    isPlay = false;
    play.classList.toggle('pause');

    setTimeout(playAudio, 1000);
})

volumeBtn.addEventListener('click', () => {
    if (audio.muted) {
        audio.muted = false;
        volumeBtn.classList.toggle('mute');
    } else {
        audio.muted = true;
        volumeBtn.classList.toggle('mute');
    }
})

volumeBar.addEventListener('click', (el) => {
    let volumeBarWidth = window.getComputedStyle(volumeBar).width;
    let clickVolume = el.offsetX / Number(volumeBarWidth.slice(0, -2));

    audio.volume = clickVolume;
    setVolumeLevel();


});

timelineBar.addEventListener('click', (el) => {
    let timelineWidth = window.getComputedStyle(timelineBar).width;
    let clickTime = el.offsetX / Number(timelineWidth.slice(0, -2)) * audio.duration;

    audio.currentTime = clickTime;
});


play.addEventListener('click', playAudio);
playPrevBtn.addEventListener('click', playPrev);
playNextBtn.addEventListener('click', playNext);
playlistShowHide.addEventListener('click', () => {
    playlistBox.classList.toggle('hidden');
    playlistBox.classList.toggle('config-slide');
    playlistShowHide.classList.toggle('playlist-shown');
});

setVolumeLevel();