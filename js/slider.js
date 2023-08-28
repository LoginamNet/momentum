const bgTagsInput = document.querySelector('.tags');
const prevSlideBtn = document.querySelector('.slider-left');
const nextSlideBtn = document.querySelector('.slider-right');
const radioBg = document.getElementsByName('image-source');

let imageTag;
let randomNum = getRandomNum(1, 20);
let dayTime = `${translation[lang].greetings[getTimeOfDay()]} ${translation[lang].timesOfDay[getTimeOfDay()]}`;

function getCollectionImg() {
    let timeOfDay = translation[`en`].timesOfDay[getTimeOfDay()];
    let bgNum = String(randomNum).padStart(2, `0`);
    const img = new Image();
    img.src = `https://github.com/LoginamNet/stage1-tasks/blob/assets/images/${timeOfDay}/${bgNum}.jpg?raw=true`;

    img.onload = () => {
        preloader.classList.add('preloader-hidden');
        body.style.backgroundImage = `url(${img.src})`;
        preloader.addEventListener('animationend', () => {
            preloader.classList.add('hidden');
            preloader.classList.remove('preloader-hidden');
        });
    }
};

async function getFlickrImg() {  

    (!bgTagsInput.value) ? imageTag = translation[`en`].timesOfDay[getTimeOfDay()] : imageTag = bgTagsInput.value;

    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=12c3ea25f33843286339b8ae58660766&per_page=500&tags=${imageTag}&extras=url_l,url_h&format=json&nojsoncallback=1&sort=relevance`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.photos.pages === 0) {

        imageTag = translation[`en`].timesOfDay[getTimeOfDay()]

        const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=12c3ea25f33843286339b8ae58660766&per_page=500&tags=${imageTag}&extras=url_l,url_h&format=json&nojsoncallback=1&sort=relevance`;
        const res = await fetch(url);
        const data = await res.json();

        let randomImage = getRandomNum(1, 399);

        if (data.photos.photo[randomImage].url_l === undefined) {
            getFlickrImg()
        } else {
            const img = new Image();
            img.src = data.photos.photo[randomImage].url_l;

            img.onload = () => {
                preloader.classList.add('preloader-hidden');
                body.style.backgroundImage = `url(${img.src})`;
                preloader.addEventListener('animationend', () => {
                    preloader.classList.add('hidden');
                    preloader.classList.remove('preloader-hidden');
                });
                bgTagsInput.classList.add('tags-error');
                bgTagsInput.setAttribute('title', `${translation[lang].backgroundErrorTooltip}`);
            }
        }

    } else {

        let randomImage = getRandomNum(1, 399);

        if (data.photos.photo[randomImage].url_l === undefined) {
            getFlickrImg()
        } else {
            const img = new Image();
            img.src = data.photos.photo[randomImage].url_l;

            img.onload = () => {
                preloader.classList.add('preloader-hidden');
                body.style.backgroundImage = `url(${img.src})`;
                preloader.addEventListener('animationend', () => {
                    preloader.classList.remove('preloader-hidden');
                    preloader.classList.add('hidden');
                });
                bgTagsInput.classList.remove('tags-error');
                bgTagsInput.removeAttribute('title');
            }
        }

    }

    
};

async function getUpsplashImg() {  

    (!bgTagsInput.value) ? imageTag = translation[`en`].timesOfDay[getTimeOfDay()] : imageTag = bgTagsInput.value;

    const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${imageTag}&client_id=_emrN1zkUSAkfantk5_3ZDWD-aVeL_cCeg2m6fRmipk`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.errors) {

        imageTag = translation[`en`].timesOfDay[getTimeOfDay()];
        
        const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${imageTag}&client_id=_emrN1zkUSAkfantk5_3ZDWD-aVeL_cCeg2m6fRmipk`;
        const res = await fetch(url);
        const data = await res.json();

        
        const img = new Image();
        img.src = data.urls.full;
    
        img.onload = () => {
            preloader.classList.add('preloader-hidden');
            body.style.backgroundImage = `url(${img.src})`;
            preloader.addEventListener('animationend', () => {
                preloader.classList.remove('preloader-hidden');
                preloader.classList.add('hidden');
            });
            bgTagsInput.classList.add('tags-error');
            bgTagsInput.setAttribute('title', `${translation[lang].backgroundErrorTooltip}`);
        }

    } else {

        const img = new Image();
        img.src = data.urls.full;
    
        img.onload = () => {
            preloader.classList.add('preloader-hidden');
            body.style.backgroundImage = `url(${img.src})`;
            preloader.addEventListener('animationend', () => {
                preloader.classList.remove('preloader-hidden');
                preloader.classList.add('hidden');
            });
            bgTagsInput.classList.remove('tags-error');
            bgTagsInput.removeAttribute('title');
        }

    }
};

function setBg() {
    for (let radio of radioBg) {

        if (radio.checked && radio.value === `collection`) {
            bgTagsInput.setAttribute('disabled', 'disabled');
            bgTagsInput.classList.add('input-disabled');
            getCollectionImg();
        } else if (radio.checked && radio.value === `flickr`) {
            bgTagsInput.removeAttribute('disabled', 'disabled');
            bgTagsInput.classList.remove('input-disabled');
            getFlickrImg();
        } else if (radio.checked && radio.value === `upsplash`) {
            bgTagsInput.removeAttribute('disabled', 'disabled');
            bgTagsInput.classList.remove('input-disabled');
            getUpsplashImg();
        }

    }
};

function getSlidePrev() {
    (randomNum !== 1) ? randomNum-- : randomNum = 20;

    setBg();
}


function getSlideNext() { 
    (randomNum !== 20) ? randomNum++ : randomNum = 1;

    setBg();
}


function changeBg() {
    for (let radio of radioBg) {

        if (radio.checked && radio.value === `collection`) {
            if (dayTime !== helloBox.textContent) {

                setBg();
                dayTime = helloBox.textContent;
    
            } 
        }
    
    }

    setTimeout(changeBg, 1000)
}

for (let radio of radioBg) {
    radio.addEventListener('click', () => {
        randomNum = getRandomNum(1, 20);

        for (let radio of radioBg) {
            radio.removeAttribute('checked');
        }
        
        radio.setAttribute('checked', '');
        
        setBg();
    });
}


bgTagsInput.addEventListener('change', setBg);
bgTagsInput.addEventListener('focus', () => {
    bgTagsInput.classList.remove('tags-error');
    bgTagsInput.removeAttribute('title');
});
bgTagsInput.addEventListener('input', () => {
    bgTagsInput.classList.remove('tags-error');
    bgTagsInput.removeAttribute('title');
});
prevSlideBtn.addEventListener('click', getSlidePrev); 
nextSlideBtn.addEventListener('click', getSlideNext);
