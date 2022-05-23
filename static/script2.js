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
let totalWpm = localStorage.getItem('storeWpm')
let totalWords = localStorage.getItem('storeWords');


// uträkningar för tid och WPM
let calculatedTime = totalMin * 60 + + totalSec;
let wordsPerMinute = Math.trunc(totalWords / (calculatedTime / 60));
// ??????????????????
let wordsPerMinuteUpdater = Math.trunc(totalWords / (sec / 60));

//

// timer_main 
let int = null;


function timer_main() {
	//Om användaren trycker på någon tangent startar timern
	document.getElementById('quoteInput').addEventListener('keydown', event=>{
		if(event.int !== null){
			clearInterval(int);
		}
		int = setInterval(start_timer, 10);
	});
}

function total_time(){
	// Denna funktionen ska presentera tiden spenderad i racet på resultatsidan
	totalMin.innerHTML = localStorage.getItem('appendMin');

};

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

function submit_button_save() {
	clearInterval(int);

	// Put the object into storage
	localStorage.setItem('storeMin', JSON.stringify(storeTotalMin));
	localStorage.setItem('storeSec', JSON.stringify(storeTotalSec));
	localStorage.setItem('storeWpm', JSON.stringify(storeTotalWpm));
}
