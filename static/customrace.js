// Author: WebDevSimplified
// https://github.com/WebDevSimplified/JS-Speed-Typing-Game/blob/master/script.js
'USE STRICT'

const RANDOM_QUOTE_API_URL = document.getElementById('quoteGet').innerHTML
const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
const timerElement = document.getElementById('timer2')

console.log(RANDOM_QUOTE_API_URL)


// Sparar tid i olika variabler
let miliSec = 00;
let sec = 00;
let min = 00;

// Hämtar vilka IDs som ska påverkas i HTML
let appendMin = document.getElementById("min");
let appendSec = document.getElementById("sec");
let appendMiliSec = document.getElementById("miliSec");
let pressToStart = document.getElementById("quoteInput");
let appendTotalmin = document.getElementById("setMin");
let wpmElement = document.getElementById('wpmUpdater');

let int = null;

let quoteWords = [];
let indexWord = 0;
let completedWords = "";
let strokeCount = 1;

let totalMin
let totalSec


quoteInputElement.addEventListener('keyup', () => {
  const arrayQuote = quoteDisplayElement.querySelectorAll('span')
  let arrayValue = completedWords + quoteInputElement.value;
  arrayValue.split('');

  let incorrect = false;
  let correct = true;
  let inccorectCharacters = 0;
  
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
      
      while (inccorectCharacters === 1){
        characterSpan.classList.add('incorrect')
        quoteInputElement.classList.add('inputIncorrect')
        break;
      }
      
    } else {
      characterSpan.classList.remove('correct')
      characterSpan.classList.add('incorrect')
      quoteInputElement.classList.add('inputIncorrect')
      incorrect = true
      correct = false
      inccorectCharacters = 1;
    }
  
  })

  if (correct) { 
    localStorage.setItem('storeMin', JSON.stringify(storeTotalMin));
    localStorage.setItem('storeSec', JSON.stringify(storeTotalSec));
    localStorage.setItem('storeWpm', JSON.stringify(storeTotalWpm));
    localStorage.setItem('storeStroke', JSON.stringify(strokeCount));
    document.forms['myForm'].submit();

  }
})

function renderNewQuote() {
  const quote = RANDOM_QUOTE_API_URL
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
      indexWord++;

    }
  }
});

function submit_button_save() {

  localStorage.setItem('appendMin', document.getElementById('min').innerHTML);
  localStorage.setItem('appendSec', document.getElementById('sec').innerHTML);
  localStorage.setItem('storeWPM', document.getElementById('wpmUpdater').innerHTML);

	clearInterval(int);
}

document.getElementById('quoteInput').addEventListener('keydown', event=>{
	if(event.code === 'Space'){
		//countWords();
	}
});

const messageEle = document.getElementById('quoteInput');
const counterEle = document.getElementById('count');

messageEle.addEventListener('quoteInput', function (e) {
    const target = e.target;

    // Get the `maxlength` attribute
    const maxLength = target.getAttribute('maxlength');

    // Count the current number of characters
    const currentLength = target.value.length;

    counterEle.innerHTML = `${currentLength}`;
});

function timer_main() {
	//Om användaren trycker på någon tangent startar timern
	document.getElementById('quoteInput').addEventListener('keydown', event=>{
		if(event.int !== null){
			clearInterval(int);
		}
		int = setInterval(start_timer, 10);
	});

	// Om användaren trycker på "Escape" så pausas timern
	document.getElementById('quoteInput').addEventListener('keydown', event=>{
		if(event.key === "Escape"){
			clearInterval(int);

      localStorage.setItem('appendMin', document.getElementById('min').innerHTML);
      localStorage.setItem('appendSec', document.getElementById('sec').innerHTML);
      localStorage.setItem('storeWPM', document.getElementById('wpmUpdater').innerHTML)
  }
  })}

function start_timer(){
// Funktion som räknar tid och ökar värden vid angivna gränser samt uppdaterar words per minute
// varje sekund

	miliSec ++;
	storeTotalMin = min;


	if (miliSec < 9){
		appendMiliSec.innerHTML = "0" + miliSec;
	}

	if (miliSec > 9){
		appendMiliSec.innerHTML = miliSec;
	}

	if (miliSec > 99){
		sec ++;
		appendSec.innerHTML = "0" + sec;
		miliSec = 0;
		appendMiliSec.innerHTML = "0" + 0;
    let totalTime = (min * 60 + + sec)/ 60;
    wpmElement.innerHTML = Math.trunc(indexWord / totalTime)
	}

	if (sec < 9){
		appendSec.innerHTML = "0" + sec;
	}

	if (sec > 9){
		appendSec.innerHTML = sec;
	}

	if (sec > 59){
		min ++;
		appendMin.innerHTML = "0" + min;
		sec = 0;
		appendSec.innerHTML ="0" + + 0;
	}
}

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