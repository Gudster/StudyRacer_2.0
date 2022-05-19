// hämtar från local storage
let totalSec = localStorage.getItem('appendSec');
let totalMin = localStorage.getItem('appendMin');
let wpmElement = localStorage.getItem('storeWPM');

console.log(wpmElement)

// Presenterar det hämtade resultatet
document.getElementById('resultwpm').innerHTML = wpmElement;
document.getElementById('totalMin').innerHTML = totalMin + " m "
document.getElementById('totalSec').innerHTML = totalSec + " s"