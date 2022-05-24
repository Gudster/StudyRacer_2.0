// Author: WebDevSimplified
// https://github.com/WebDevSimplified/JS-Speed-Typing-Game/blob/master/script.js
'USE STRICT'

const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random'
const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
const timerElement = document.getElementById('timer2')
const wpmElement = document.getElementById('wpmUpdater')

let quoteWords = [];
let indexWord = 0;
let completedWords = "";
let strokeCount = 1;


quoteInputElement.addEventListener('keyup', () => {
  const arrayQuote = quoteDisplayElement.querySelectorAll('span')
  let arrayValue = completedWords + quoteInputElement.value;
  arrayValue.split('');

  let incorrect = false;
  let correct = true;
  let incorrectCharacters = 0;
  
  arrayQuote.forEach((characterSpan, index) => {
    const character = arrayValue[index]

    if (character == null) {
      characterSpan.classList.remove('correct')
      characterSpan.classList.remove('incorrect')
      correct = false

    } else if (character === characterSpan.innerText) {
      characterSpan.classList.add('correct')
      characterSpan.classList.remove('incorrect')
      quoteInputElement.classList.remove('inputIncorrect')

    } else {
      characterSpan.classList.remove('correct')
      characterSpan.classList.add('incorrect')
      quoteInputElement.classList.add('inputIncorrect')
      incorrect = true
      correct = false
      incorrectCharacters ++;
      console.log(incorrectCharacters)
    }
  })
  if (correct) { 
  document.forms['myForm'].submit()
  localStorage.setItem('storeMin', JSON.stringify(storeTotalMin));
  localStorage.setItem('storeSec', JSON.stringify(storeTotalSec));
  localStorage.setItem('storeWpm', JSON.stringify(storeTotalWpm));
  localStorage.setItem('storeStroke', JSON.stringify(strokeCount));
  }
})

function getRandomQuote() {
  return fetch(RANDOM_QUOTE_API_URL)
    .then(response => response.json())
    .then(data => data.content)
}

async function renderNewQuote() {
  const quote = await getRandomQuote();
  quoteWords = quote.split(' ');
  totalCharacterLenght = quote.split('').length;
  console.log(totalCharacterLenght)
  quoteDisplayElement.innerHTML = ''
  quote.split('').forEach(character => {
    const characterSpan = document.createElement('span')
    characterSpan.innerText = character
    quoteDisplayElement.appendChild(characterSpan)
  })
    quote.split(' ').forEach((word, index) => {
      const wordSpan = [word, index]
      
      console.log(wordSpan)
      return wordSpan
    })
    
    quoteInputElement.value = null;
    localStorage.setItem('charLength', JSON.stringify(totalCharacterLenght));
  }

const inputValue = document.getElementById('quoteInput');
const raceText = document.getElementById('quoteDisplay');

inputValue.addEventListener('keypress', function (e) {
  if (e.code !== null) {
    if (e.target.value.trim() === quoteWords[indexWord]) {
      completedWords += e.target.value;
      e.target.value = "";
      indexWord ++;
    }
  }
});

inputValue.addEventListener('keypress', function (e) {
  if (e.code !== null) {
    wordsPerMinute = Math.trunc((indexWord - 1) / (sec / 60));
  
    wpmElement.innerHTML = wordsPerMinute
    storeTotalWpm = wordsPerMinute
    
    localStorage.setItem('storeWpm', JSON.stringify(storeTotalWpm));

  }
})

let startTime
function startTimer() {
  timerElement.innerText = 0
  startTime = new Date()
  setInterval(() => {
    timer.innerText = getTimerTime();
    seconds ++;
    return seconds
  }, 1000)
}

function getTimerTime() {
  return Math.floor((new Date() - startTime) / 1000)
}

let seconds = getTimerTime();
console.log(seconds)



$(function() {
    $("#quoteInput").keydown(function (e) {
      if (e.code !== "Backspace")
        $("#count").text(++strokeCount);
    });
});

$(function() {
  $("#quoteInput").keydown(function (e) {
    if (e.shiftKey)
      $("#count").text(--strokeCount);
  });
});




renderNewQuote();