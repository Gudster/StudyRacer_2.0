// sparar tid i olika variabler
let miliSec = 00;
let sec = 00;
let min = 00;

// hämtar vilka ID som ska påverkas i HTML
let appendMiliSec = document.getElementById('miliSec');
let appendSec = document.getElementById('sec');
let appendMin = document.getElementById('min');
let pressToStart = document.getElementById('input');
let appendTotalMin = document.getElementById('setMin');

// sparar till local storage
let totalSec = localStorage.getItem('sotreSec');
let totalMin = localStorage.getItem('storeMin');
let totalWords = localStorage.getItem('storeWords');

// uträkningar för tid och WPM
let calculatedTime = totalMin * 60 + + totalSec;
let wordsPerMinute = Math.trunc(totalWords / (calculatedTime / 60));
// ??????????????????
let wordsPerMinuteUpdater = Math.trunc(writtenTextArray / (sec / 60));


// timer_main 
let int = null;
// ?????
let strokeCount = 0;


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
			localStorage.setItem('storeMin', JSON.stringify(storeTotalMin));
			localStorage.setItem('storeSec', JSON.stringify(storeTotalSec));
			localStorage.setItem('storeWords', JSON.stringify(storeTotalWords));

		}
	});
}

function countWords() {
    // funktion för att räkna antal ord skrivna

	// Get the input text value
	let inputText = document.getElementById("input").value;

	// Initialize the word counter
	var numWords = 0;

	// Loop through the text
	// and count spaces in it
	for (var i = 0; i < text.length; i++) {
		var currentCharacter = inputText[i];

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

// Check if last word is equal to the last word of the text and the amount of words are the same, 
// if it is, submit the text. 
messageEle.addEventListener('input', function (e) {
	console.log("din text: " + messageEle.value)
	// Split the written text into an array, space makes new arrayitem
	let writtenTextArray = messageEle.value.split(" ")
	// Check the last word of the array
	let writtenTextLastWord = writtenTextArray.pop();
	// count the amount of arrayitems
	const writtenTextLength = writtenTextArray.length;

	console.log(writtenTextArray)
	console.log(writtenTextLastWord)
	console.log("length input: " + writtenTextLength)

	// get the text the user is supposed to race
	const raceText = document.getElementById("text").value
	// Split the text into an array
	const raceTextArray = raceText.split(" ");
	// Check the last word of the array
	const raceTextLastWord = raceTextArray.pop();
	// Count the amount of arrayitems
	const raceTextLength = raceTextArray.length;
	console.log(raceTextArray);
	console.log (raceTextLastWord);
	console.log("length text: " + raceTextLength)

	// Checks if the last written word is equal to the last word of the race, and if the number of arrayitems are
	// the same, if this is the case, finish the race.
	if (writtenTextLastWord === raceTextLastWord && writtenTextLength === raceTextLength) {
		document.forms["myForm"].submit();
	}
});

function wordsPerMinuteUpdater() {
    document.getElementById("wpmUpdater").innerHTML = wordsPerMinuteUpdater;
};