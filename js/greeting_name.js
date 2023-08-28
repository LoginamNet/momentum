const nameInput = document.querySelector('.name');
const nameLength = document.querySelector('.name-length');


function setInputWidth() {
  nameLength.textContent = nameInput.value;

  if (nameInput.value.length === 0) {
    nameInput.style.width = `6em`
  } else if (nameInput.value.length !==  0) {
    nameInput.style.width = nameLength.offsetWidth + 'px';
  }
}

nameInput.addEventListener('input', setInputWidth);

function setGreetingInputPlaceholderLang() {
  nameInput.setAttribute('placeholder', `${translation[lang].greetingPlaceholder}`)
}