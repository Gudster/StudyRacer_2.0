// Använd strict mode
'USE STRICT'

// Hämtar vilka IDs som ska påverkas i HTML
const quoteDisplayElement = document.getElementById('quoteDisplay');
const quoteInputElement = document.getElementById('quoteInput');
let wpmElement = document.getElementById('wpmUpdater');

// Sparar tid i olika variabler
let miliSec = 00;
let sec = 00;
let min = 00;

// Variabler för ord, index, antal korrekt skrivna ord och knapptryck
let quoteWords = [];
let indexWord = 0;
let completedWords = "";
let strokeCount = 1;

// Lägger till och tar bort klasser på spansen (som skapas senare) och 
// ändrar färg beroende på om input är rätt eller fel
quoteInputElement.addEventListener('keyup', () => {
  const arrayQuote = quoteDisplayElement.querySelectorAll('span');
  let arrayValue = completedWords + quoteInputElement.value;
  arrayValue.split('');
  
  let incorrect = false;
  let correct = true;
  let inccorectCharacters = 0;
  
  arrayQuote.forEach((characterSpan, index) => {
    const character = arrayValue[index];
    
    // Tar bort markering om tecknet tas bort
    if (character == null) {
      characterSpan.classList.remove('correct');
      characterSpan.classList.remove('incorrect');
      correct = false;
      
      // Markerar korrekta tecken gröna
    } else if (character === characterSpan.innerText) {
      characterSpan.classList.add('correct');
      characterSpan.classList.remove('incorrect');
      quoteInputElement.classList.remove('inputIncorrect');
      
      // Om ett tecken är fel markeras alla följande tecken röda
      // detsamma gäller för inputrutan
      while (inccorectCharacters === 1){
        characterSpan.classList.add('incorrect');
        quoteInputElement.classList.add('inputIncorrect');
        break;
      }
      
      // Markerar felaktiga input röda, inputruta och tecken
    } else {
      characterSpan.classList.remove('correct');
      characterSpan.classList.add('incorrect');
      quoteInputElement.classList.add('inputIncorrect');
      incorrect = true;
      correct = false;
      inccorectCharacters = 1;
    }
  })

  // Submittar om alla tecken är korrekt inmatade, sparar variabler till
  // local storage för senare användning på resultatsidan
  if (correct) { 
    localStorage.setItem('storeMin', JSON.stringify(min));
    localStorage.setItem('storeSec', JSON.stringify(sec));
    localStorage.setItem('storeWPM', document.getElementById('wpmUpdater').innerHTML);
    localStorage.setItem('storeStroke', JSON.stringify(strokeCount));
    clearInterval(int);
    document.forms['myForm'].submit();
  }
})

// Hämtar text från en hidden span i HTML
const RANDOM_QUOTE_API_URL = document.getElementById('quoteGet').innerHTML

// Använder konstanten ovan för att splitta text
function renderNewQuote() {
  const quote = RANDOM_QUOTE_API_URL
  quoteWords = quote.split(' ');
  totalCharacterLenght = quote.split('').length;
  console.log(totalCharacterLenght)
  quoteDisplayElement.innerHTML = ''

  // Skapar spans i HTML
  quote.split('').forEach(character => {
    const characterSpan = document.createElement('span')
    characterSpan.innerText = character
    quoteDisplayElement.appendChild(characterSpan)
  })

  // Splittar texten vid mellanslag så att var ord skiljs och kollar var ords index
  quote.split(' ').forEach((word, index) => {
    const wordSpan = [word, index]
    
  })
  
  quoteInputElement.value = null;
  localStorage.setItem('charLength', JSON.stringify(totalCharacterLenght));
}

// Hämtar inputfältet från HTML-sidan
const inputValue = document.getElementById('quoteInput');
// Hämtar outputfältet från HTML-sidan
const raceText = document.getElementById('quoteDisplay');

// Kollar om användaren angett rätt ord, rensar isåfall inputfältet
inputValue.addEventListener('keypress', function (e) {
  if (e.code !== null) {
    if (e.target.value.trim() === quoteWords[indexWord]) {
      completedWords += e.target.value;
      e.target.value = "";
      indexWord++;
      
    }
  }
});

// Hämtar element från HTML
let pressToStart = document.getElementById('quoteInput');

// Timer int, bestämmer intervallet timern ska uppdateras i
let int = null;

//Om användaren trycker på någon tangent startar timern
function timer_main() {
	document.getElementById('quoteInput').addEventListener('keydown', event=>{
    if(event.int !== null){
			clearInterval(int);
		}
		int = setInterval(start_timer, 10);
	})};

// Hämtar element från HTML
let appendMin = document.getElementById('min');
let appendSec = document.getElementById('sec');
let appendMiliSec = document.getElementById('miliSec');
let appendTotalmin = document.getElementById('setMin');

// Funktion som räknar tid och ökar värden vid angivna gränser samt uppdaterar words per minute
// varje sekund
function start_timer(){

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

// jQuery - funktion för att räkna knapptryck, räknar inte Backspace
$(function() {
    $("#quoteInput").keydown(function (e) {
      if (e.code !== "Backspace")
        $("#count").text(++strokeCount);
    });
});

// Funktion för att inte räkna Shift-tryck
$(function() {
  $("#quoteInput").keydown(function (e) {
    if (e.shiftKey)
      $("#count").text(--strokeCount);
  });
});

// Kör funktionen renderNewQuote()
renderNewQuote();
