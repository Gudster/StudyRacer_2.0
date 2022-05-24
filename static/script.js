// Sparar tid i olika variabler
var miliSec = 00;
var sec = 00;
var min = 00;
// Hämtar vilka IDs som ska påverkas i HTML
var appendMin = document.getElementById("min");
var appendSec = document.getElementById("sec");
var appendMiliSec = document.getElementById("miliSec");
var pressToStart = document.getElementById("input");
let appendTotalmin = document.getElementById("setMin");

let int = null;

let totalMin = localStorage.getItem('storeMin');
let totalSec = localStorage.getItem('storeSec');
let totalWords = localStorage.getItem('storeWords');
let calculatedTime = totalMin * 60 + + totalSec;
let wordsPerMinute = Math.trunc(totalWords / (calculatedTime / 60));

// Retrieve the object from storage


var strokeCount = 0;

document.getElementById('resultwpm').innerHTML = wordsPerMinute;
document.getElementById('totalMin').innerHTML = totalMin + "m "
document.getElementById('totalSec').innerHTML = totalSec + "s"



console.log('Minuter: ', JSON.parse(totalMin));
console.log('Sekunder: ', JSON.parse(totalSec));

console.log('Tid: ', calculatedTime);

console.log('Antal ord: ', JSON.parse(totalWords));
console.log('Ord per minut: ',  wordsPerMinute);
console.log('Knapptryck: ');


function timer_main() {
	//Om användaren trycker på någon tangent startar timern
	document.getElementById('input').addEventListener('keydown', event=>{
		if(event.int !== null){
			clearInterval(int);
		}
		int = setInterval(start_timer, 10);
	});

	// Om användaren trycker på "Escape" så pausas timern
	document.getElementById('input').addEventListener('keydown', event=>{
		if(event.key === "Escape"){
			clearInterval(int);
			countWords();

			// Put the object into storage


		}
	});
}

function submit_button_save() {
	clearInterval(int);
	countWords();

	// Put the object into storage
	localStorage.setItem('storeMin', JSON.stringify(storeTotalMin));
	localStorage.setItem('storeSec', JSON.stringify(storeTotalSec));
	localStorage.setItem('storeWords', JSON.stringify(storeTotalWords));
}

function total_time(){
// Denna funktionen ska presentera tiden spenderad i racet på resultatsidan
	totalMin.innerHTML = localStorage.getItem('appendMin');

};


function countWords() {

	// Get the input text value
	let inputText = document.getElementById("input").value;

	// Initialize the word counter
	var numWords = 0;

	// Loop through the text
	// and count spaces in it
	for (var i = 0; i < text.length; i++) {
		var currentCharacter = text[i];

		// Check if the character is a space
		if (currentCharacter == " ") {
			numWords += 1;
		}
	}

	// Add 1 to make the count equal to
	// the number of words
	// (count of words = count of spaces + 1)
	numWords += 1;

	//Spara numWords till storeTotalWords
	storeTotalWords = numWords;

	// Display it as output
	document.getElementById("show")
		.innerHTML = numWords;
}

function start_timer(){
// Funktion som räknar tid och ökar värden vid angivna gränser

	miliSec ++;
	storeTotalMin = min;
	storeTotalSec = sec;

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

//function clear_wpm() {
//	document.getElementById("resultwpm").innerHTML = undefined;
//}
