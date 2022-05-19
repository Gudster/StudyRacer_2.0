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

let totalMin
let totalSec

let calculatedTime = totalMin * 60 + + totalSec;

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
      /*if (incorrectCharacters > 2) {
        let inputBox = document.getElementById("quoteInput");

        let invalidChars = [
          "-",
          "+",
          "e",
          "q",
          "w",
          "r",
          "t",
          "y",
        ];
        
        inputBox.addEventListener("keydown", function(e) {
          if (invalidChars.includes(e.key)) {
            e.preventDefault();
          }
          else if (inputBox = null) {
            e.allowDefault() = true
          }
        });
      }*/
    }
  })
  if (correct) { 
  document.forms['myForm'].submit()
  localStorage.setItem('storeMin', JSON.stringify(storeTotalMin));
  localStorage.setItem('storeSec', JSON.stringify(storeTotalSec));
  localStorage.setItem('storeWords', JSON.stringify(storeTotalWords));
  }
})

function getRandomQuote() {
  return fetch(RANDOM_QUOTE_API_URL)
    .then(response => response.json())
    .then(data => data.content)
}

async function renderNewQuote() {
  const quote = await getRandomQuote();
  quoteWords = quote.split(" ");
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
    
  }

const inputValue = document.getElementById('quoteInput');
const raceText = document.getElementById('quoteDisplay');

inputValue.addEventListener('keypress', function (e) {
  if (e.code === "Space") {
    if (e.target.value.trim() === quoteWords[indexWord]) {
      completedWords += e.target.value;
      e.target.value = "";
      indexWord++;

      wordsPerMinute = Math.trunc((indexWord + 1) / (calculatedTime / 60));

      wpmElement.innerHTML = wordsPerMinute

      console.log(wordsPerMinute)
      console.log(calculatedTime)
      console.log(indexWord)
    }
  }
});


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

renderNewQuote();