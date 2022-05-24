// sparar tid i olika variabler
let miliSec = 00;
let sec = 00;
let min = 00;

// hämtar vilka ID som ska påverkas i HTML
let appendMiliSec = document.getElementById('miliSec');
let appendSec = document.getElementById('sec');
let appendMin = document.getElementById('min');
let pressToStart = document.getElementById('quoteInput');
let appendTotalMin = document.getElementById('setMin');

// hämtar från local storage
let totalSec = localStorage.getItem('storeSec');
let totalMin = localStorage.getItem('storeMin');
let totalWords = localStorage.getItem('storeWords');
let wordsPerMinute = localStorage.getItem('storeWpm');
let charLengthAcc = localStorage.getItem('charLength');
let strokeAcc = localStorage.getItem('storeStroke');
let totalAccuracy = Math.trunc((charLengthAcc / strokeAcc) * 100);

//

document.getElementById('resultwpm').innerHTML = wordsPerMinute;
document.getElementById('totalMin').innerHTML = totalMin + "m ";
document.getElementById('totalSec').innerHTML = totalSec + "s";
document.getElementById('totalAcc').innerHTML = totalAccuracy + "%";

// timer_main 
let int = null;
// ?????
let strokeCount = 0;


function submit_button_save() {
	clearInterval(int);

	// Put the object into storage
	localStorage.setItem('storeMin', JSON.stringify(storeTotalMin));
	localStorage.setItem('storeSec', JSON.stringify(storeTotalSec));
	localStorage.setItem('storeWpm', JSON.stringify(storeTotalWpm));
}
