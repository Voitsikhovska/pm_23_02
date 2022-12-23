$(function () {
    $('.header').fadeOut(1000).fadeIn(2000);

});
$(function () {

    $('.card').slideUp(2000).slideDown(1000);
});
$(function () {
    $('.hello').submit(function (e) {
        console.log('Відправка форми…');
        e.preventDefault(); // або return false;
    });
});

var request = new XMLHttpRequest();
const labels = [
    'Mon',

    'Tue',

    'Wed',

    'Thu',

    'Fri',

    'Sat',

    'Sun'
];
request.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        data_JSON = JSON.parse(this.responseText).data_charts.map((item) => parseInt(item, 10));
        const data = {
            labels: labels,
            datasets: [{

                //label: 'Balance summary ',
                backgroundColor: 'transparent',
                borderColor: 'rgb(0,143, 248)',
                pointBorderColor: 'transparent',
                data: data_JSON,

            }]
        };
        const config = {
            type: 'line',
            data: data,
            options: {
                legend: {

                    display: false
                },

                scales: {
                    y: {
                        // beginAtZero: true,
                        // suggestedMax: 500,
                        grid: {
                            lineWidth: 0,
                        }
                    },
                    x: {
                        grid: {
                            lineWidth: 0,
                        }
                    }
                }


            }

        };
        const myChart = new Chart(
            document.getElementById('myChart'),
            config
        )

    }

}
request.open("GET", "data.json", true);
request.send();




