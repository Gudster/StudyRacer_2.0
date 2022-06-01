
const ctxAcc = document.getElementById('myChartAcc');
const myChartAcc = new Chart(ctxAcc, {
    type: 'bar',
    data: {
        labels: ['This race', 'World avg.'],
        datasets: [{
            label: "Accuracy",
            data: [totalAccuracy, 93],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
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
        labels: ['This race', 'World avg.'],
        datasets: [{
            label: 'Words Per Minute',
            data: [wpmElement, 55],
            backgroundColor: [
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                
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