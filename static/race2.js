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
    } else {
      characterSpan.classList.remove('correct')
      characterSpan.classList.add('incorrect')
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
  quoteDisplayElement.innerHTML = ''
  quote.split('').forEach(character => {
    const characterSpan = document.createElement('span')
    characterSpan.innerText = character
    quoteDisplayElement.appendChild(characterSpan)
  })
  quoteInputElement.value = null
  
}

const userInput = document.getElementById('quoteInput');

// Check if last word is equal to the last word of the text and the amount of words are the same, 
// if it is, submit the text. 
userInput.addEventListener('input', function (e){
//	if(event.code === 'Space'){
    console.log("din text: " + userInput.value)
    // Split the written text into an array, space makes new arrayitem
    let writtenTextArray = userInput.value.split(" ")
    // Check the last word of the array
    let writtenTextLastWord = writtenTextArray.pop();
    // count the amount of arrayitems
    const writtenTextLength = writtenTextArray.length;

    console.log(writtenTextArray)
    console.log(writtenTextLastWord)
    console.log("length quoteInput: " + writtenTextLength)

    // get the text the user is supposed to race
    const raceText = quoteInputElement.value.split()
    // Split the text into an array
    //const raceTextArray = raceText.split(" ");
    // Check the last word of the array
    //const raceTextLastWord = raceTextArray.pop();
    // Count the amount of arrayitems
    //const raceTextLength = raceTextArray.length;
    console.log("Racetext: " + raceText)


    //if (raceTextArray[index] === writtenTextArray[index]){
    //  quoteInput.value=""
    //}
})

renderNewQuote()
