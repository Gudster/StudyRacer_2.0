
const ctxAcc = document.getElementById('myChartAcc');
const myChartAcc = new Chart(ctxAcc, {
    type: 'bar',
    data: {
        labels: ['This race', 'Your avg.', 'World avg.'],
        datasets: [{
            label: "Accuracy",
            data: [89, 93, 84],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                min: 60,
                max: 100,
            }
        },
        plugins: {
            title: {
                display: true,
                text: 'Custom Chart Title',
                padding: {
                    top: 10,
                    bottom: 30
                }
            },
            legend: {
                labels: {
                  display: false
                }
            }
        },
        layout: {
            padding: 10
        }
    }
});

const ctxWpm = document.getElementById('myChartWpm');
const myChartWpm = new Chart(ctxWpm, {
    type: 'bar',
    data: {
        labels: ['This race', 'Your avg.', 'World avg.'],
        datasets: [{
            label: 'Words Per Minute',
            data: [wordsPerMinute, 81, 76],
            backgroundColor: [
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                min: 40,
            }
        },
        plugins: {
            title: {
                display: true,
                text: 'Custom Chart Title',
                padding: {
                    top: 10,
                    bottom: 30
                }
            }
        },
        layout: {
            padding: 10
        }
    }
});