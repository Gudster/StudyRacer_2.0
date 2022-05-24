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

let int = null;

// Retrieve the object from storage

//let totalMin = localStorage.getItem('storeMin');
//let totalSec = localStorage.getItem('storeSec');



var strokeCount = 0;



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
			countWords();

			// Put the object into storage
			localStorage.setItem('storeMin', JSON.stringify(storeTotalMin));
			localStorage.setItem('storeSec', JSON.stringify(storeTotalSec));
			localStorage.setItem('storeWords', JSON.stringify(storeTotalWords));

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

document.getElementById('quoteInput').addEventListener('keydown', event=>{
	if(event.code === 'Space'){
		//countWords();
	}
});


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

//function clear_wpm() {
//	document.getElementById("resultwpm").innerHTML = undefined;
//}

//function wordsPerMinuteUpdater() {
    //document.getElementById("wpmUpdater").innerHTML = wordsPerMinuteUpdater;
//};