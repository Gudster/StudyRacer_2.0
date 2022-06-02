// hämtar från local storage
let totalSec = localStorage.getItem('storeSec');
let totalMin = localStorage.getItem('storeMin');
let wpmElement = localStorage.getItem('storeWPM');
let charLengthAcc = localStorage.getItem('charLength');
let strokeAcc = localStorage.getItem('storeStroke');
let totalAccuracy = Math.trunc((charLengthAcc / strokeAcc) * 100);

// Presenterar det hämtade resultatet
document.getElementById('resultwpm').innerHTML = wpmElement;
document.getElementById('totalMin').innerHTML = totalMin + "m "
document.getElementById('totalSec').innerHTML = totalSec + "s"
document.getElementById('totalAcc').innerHTML = totalAccuracy + "%";