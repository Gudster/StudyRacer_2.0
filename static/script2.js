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


// hämtar från local storage
let totalSec = localStorage.getItem('storeSec');
let totalMin = localStorage.getItem('storeMin');
let totalWords = localStorage.getItem('storeWords');


// uträkningar för tid och WPM
let calculatedTime = totalMin * 60 + + totalSec;
let wordsPerMinute = Math.trunc(totalWords / (calculatedTime / 60));
// ??????????????????
let wordsPerMinuteUpdater = Math.trunc(totalWords / (sec / 60));

//

document.getElementById('resultwpm').innerHTML = wordsPerMinute;
document.getElementById('totalMin').innerHTML = totalMin + "m "
document.getElementById('totalSec').innerHTML = totalSec + "s"


// timer_main 
let int = null;
// ?????
let strokeCount = 0;


/*
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
});*/

//function wordsPerMinuteUpdater() {
//    document.getElementById("wpmUpdater").innerHTML = wordsPerMinuteUpdater;
//};

function submit_button_save() {
	clearInterval(int);

	// Put the object into storage
	localStorage.setItem('storeMin', JSON.stringify(storeTotalMin));
	localStorage.setItem('storeSec', JSON.stringify(storeTotalSec));
	localStorage.setItem('storeWords', JSON.stringify(storeTotalWords));
}
