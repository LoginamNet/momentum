const quote = document.querySelector('.quote');
const quoteResetBtn = document.querySelector('.quote-reset');
const quoteText = document.querySelector('.quote-text');
const quoteAuthor = document.querySelector('.quote-author');
let quoteNum;

async function getQuotes() {  
    const quotes = `data_${lang}.json`;
    const res = await fetch(quotes);
    const data = await res.json();

    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    } 
  
    let randomQuote = getRandomInt(0, data.length);

    if (randomQuote !== quoteNum) {
      quoteNum = randomQuote;
    } else {
      randomQuote = getRandomInt(0, data.length);
      getQuotes();
    }

    quoteText.textContent = `«${data[quoteNum].text}»`;
    quoteAuthor.textContent = `— ${data[quoteNum].author}`;
}

async function translateQuote() {
  const quotes = `data_${lang}.json`;
    const res = await fetch(quotes);
    const data = await res.json();

    quoteText.textContent = `«${data[quoteNum].text}»`;
    quoteAuthor.textContent = `— ${data[quoteNum].author}`;
}

function newQuote() {
    quoteResetBtn.removeEventListener('click', newQuote);
    quoteResetBtn.classList.add('rotate');
    quote.classList.add('text-change');

    setTimeout(getQuotes, 500);

    quoteResetBtn.addEventListener('animationend', () => quoteResetBtn.addEventListener('click', newQuote));
    quote.addEventListener('animationend', () => quote.classList.remove('text-change'));
    quoteResetBtn.addEventListener('animationend', () => quoteResetBtn.classList.remove('rotate'));
}

getQuotes();

quoteResetBtn.addEventListener('click', newQuote);
