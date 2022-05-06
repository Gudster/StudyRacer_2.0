// Author: WebDevSimplified
// https://github.com/WebDevSimplified/JS-Speed-Typing-Game/blob/master/script.js

const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random'
const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
const timerElement = document.getElementById('timer2')

quoteInputElement.addEventListener('input', () => {
  const arrayQuote = quoteDisplayElement.querySelectorAll('span')
  const arrayValue = quoteInputElement.value.split('')

  let correct = true
  
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
      correct = false
    }
  })
  if (correct) document.forms['myForm'].submit()
})

function getRandomQuote() {
  return fetch(RANDOM_QUOTE_API_URL)
    .then(response => response.json())
    .then(data => data.content)
}

async function renderNewQuote() {
  const quote = await getRandomQuote()
  localStorage.setItem("myQuote", quote) //egen
  quoteDisplayElement.innerHTML = ''
  quote.split('').forEach(character => {
    const characterSpan = document.createElement('span')
    characterSpan.innerText = character
    quoteDisplayElement.appendChild(characterSpan)
  })
    quote.split(' ').forEach((word, index) => {
      const wordSpan = [word, index]
      
      console.log(wordSpan)
      
    })
    
    quoteInputElement.value = null;
    
  }
  
const inputValue = document.getElementById('quoteInput');
const raceText = document.getElementById('quoteDisplay');
console.log(raceText)

inputValue.addEventListener('input', function (e) {
  inputArray = inputValue.value.split(" ")
  
  inputValue.addEventListener('keydown', event=>{
    if(event.code === 'Space'){
      inputArray = inputValue.value.split(" ")
    }
  })
  console.log(inputArray)
})

const myQuoteSplit = localStorage.getItem("myQuote").split(' ')
//arrayWords.forEach((wordsValue))
  //const words = wordsValue[index]
  const inputWords = quoteInputElement.value.split(' ')
  console.log(inputWords)

  /*arrayQuote.forEach((characterSpan, index) => {
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
      correct = false
    }
  })*/

  
  renderNewQuote()