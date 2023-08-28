const body = document.querySelector('body');
const header = document.querySelector('header');
const main = document.querySelector('main');
const footer = document.querySelector('footer');
const timeBox = document.querySelector('.time');
const dateBox = document.querySelector('.date');
const helloBox = document.querySelector('.hello');


function showTime() {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    const timeOfDay = translation[lang].timesOfDay[getTimeOfDay()];
    const greetings = translation[lang].greetings[getTimeOfDay()];

    timeBox.textContent = currentTime;
    helloBox.textContent = `${greetings} ${timeOfDay},`;

    showDate();
    getTimeOfDay();
    setTimeout(showTime, 1000);
}

function showDate() {
    const date = new Date();
    const currentDate = date.toLocaleDateString(translation[lang].dateLang, translation[lang].dateOptionsFirst) + `, ` + date.toLocaleDateString(translation[lang].dateLang, translation[lang].dateOptionsSecond);

    dateBox.textContent = currentDate;
}

function getTimeOfDay() {
    const date = new Date();
    const hours = date.getHours();

    return Math.floor(hours / 6);
}