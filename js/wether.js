//https://api.openweathermap.org/data/2.5/weather?q=Москва&lang=en&appid=b7a7bccca2d12d368426e7bb8c9ec799&units=metric - api link

const city = document.querySelector('.city');
const cityError = document.querySelector('.city-error');
const wetherItems = document.querySelector('.wether-items');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const windSpeed = document.querySelector('.wind-speed');
const humidity = document.querySelector('.humidity'); 

async function getWeather() {  
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${lang}&appid=b7a7bccca2d12d368426e7bb8c9ec799&units=metric`;
    const res = await fetch(url);

    if (res.status === 404) {
      cityError.textContent = translation[lang].cityError;
      cityError.classList.remove('disabled');
      wetherItems.classList.add('disabled');
    } else {
      cityError.classList.add('disabled');
      wetherItems.classList.remove('disabled');
    }

    const data = await res.json(); 

    weatherIcon.style.backgroundImage = `url(http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png)`;
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description.slice(0, 1).toUpperCase() + data.weather[0].description.slice(1);
    windSpeed.textContent = `${translation[lang].windSpeed} ${data.wind.speed} ${translation[lang].mPerSec}`;
    humidity.textContent = `${translation[lang].humidity} ${data.main.humidity}%`;
 
    setTimeout(getWeather, 3600000);
  }

function checkCityInput() {
    if (!city.value) {
      city.value = translation[lang].cityDefault;
      getWeather();
    } else if (city.value === '+') {
      cityError.textContent = translation[lang].cityError2;
      cityError.classList.remove('disabled');
      wetherItems.classList.add('disabled');
    } else {
      getWeather();
    }
}

function checkEmptyCityInput() {
  if (!city.value) {

    city.value = '+';
    cityError.textContent = translation[lang].cityError2;
    cityError.classList.remove('disabled');
    wetherItems.classList.add('disabled');

  } else {
    getWeather();
  }
}

function translateCityDefault() {
  if ((city.value === translation['ru'].cityDefault) || (city.value === translation['en'].cityDefault)) {
    city.value = translation[lang].cityDefault;
  }
}

city.addEventListener('click', () => city.value = '');
city.addEventListener('change', checkEmptyCityInput);
city.addEventListener('blur', checkEmptyCityInput);