const preloader = document.querySelector('.preloader');
const overlay = document.querySelector('.body-overlay');
const configBth = document.querySelector('.config-switcher');
const congigBox = document.querySelector('.config-box');
const blocks = document.querySelectorAll('.block');
const blokSwitchers = document.querySelectorAll('.block-switcher');
const switchPoints = document.querySelectorAll('.switch-point');

let lang = `en`;
const radioLang = document.getElementsByName('language');

function getRandomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min; 
}

for (let i = 0; i < blocks.length; i++) {
    blokSwitchers[i].addEventListener('click', () => {
        blocks[i].classList.toggle('hidden');
        blokSwitchers[i].classList.toggle('checked');
        switchPoints[i].classList.toggle('on-off');
    });
}

function showHideConfig() {

    if (overlay.classList.contains('hidden')) {
        
        overlay.classList.toggle('hidden');
        congigBox.classList.toggle('config-slide');
        configBth.classList.add('half-rotate');
        configBth.classList.remove('half-rotate-back');

    } else {

        overlay.classList.toggle('hidden');
        congigBox.classList.toggle('config-slide');
        configBth.classList.remove('half-rotate');
        configBth.classList.add('half-rotate-back');

    }
}

function translateConfig() {
    const blokSwitchersHeader = document.querySelectorAll('.config-header');
    const blokSwitchersText = document.querySelectorAll('.config-text');
    const bgTagsText = document.querySelector('.bg-text');
    const preloaderText = document.querySelector('.preloader-text');

    preloaderText.textContent = translation[lang].preloader;

    bgTagsInput.setAttribute('placeholder', `${translation[lang].backgroundCongigPlaceholder}`);
    bgTagsInput.setAttribute('title', `${translation[lang].backgroundErrorTooltip}`);
    
    for (let i = 0; i < blokSwitchersHeader.length; i++) {
        blokSwitchersHeader[i].textContent = translation[lang].blockSwitchersHeader[i];
    }
    
    for (let i = 0; i < blokSwitchersText.length; i++) {
        blokSwitchersText[i].textContent = translation[lang].blockSwitchersText[i];
    }
    
    bgTagsText.textContent = translation[lang].backgroundCongigText;
}

function switchLang() {

    for (let radio of radioLang ) { 

    if (radio.checked) {

        lang = radio.value;
        
        translateConfig();
        checkTodoInput();
        checkTodoList();
        translateTodo();
        translateCityDefault();
        checkCityInput();
        showTime();
        setGreetingInputPlaceholderLang();
        translateQuote();
        
    }
}

}

function updateLang() {
    header.classList.add('lang-change');
    main.classList.add('lang-change');
    footer.classList.add('lang-change');
    congigBox.classList.add('config-change');
        configBth.classList.remove('half-rotate');
        configBth.classList.add('half-rotate-back');
  
    setTimeout(switchLang, 400);
    setTimeout(() => {
        configBth.classList.add('half-rotate');
        configBth.classList.remove('half-rotate-back');
    }, 400)
    
    header.addEventListener('animationend', () => header.classList.remove('lang-change'));
    main.addEventListener('animationend', () => main.classList.remove('lang-change'));
    footer.addEventListener('animationend', () => footer.classList.remove('lang-change'));
    congigBox.addEventListener('animationend', () => congigBox.classList.remove('config-change'));
        
}

configBth.addEventListener('click', showHideConfig);

overlay.addEventListener('click', (el) => {
    let target = el.target;

    if (!target.closest('.config-box') && target != congigBox) {
        showHideConfig();
    }
})

document.addEventListener('keydown', (el) => {
    if (!overlay.classList.contains('hidden') && el.key === `Escape`) {
        showHideConfig()
    }
});

for (let radio of radioLang) {
    radio.addEventListener('click', () => {
        for (let radio of radioLang) {
            radio.removeAttribute('checked');
        }
        
        radio.setAttribute('checked', '');
        
        updateLang();
    });
}