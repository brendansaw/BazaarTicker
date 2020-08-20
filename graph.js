x = [0, 10, 5, 2, 20, 30, 45];

var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                label: 'My First dataset',
                backgroundColor: 'rgb(255, 99, 132)',
                fill: false,
                borderColor: 'rgb(255, 99, 132)',
                data: x
            }]
        },

    options: {}
});

d = 0;
while(d < 1200){
    myChart.data.labels.push('boi');
    x.push(12);
    myChart.update();
    d++;
    print('boi')
}

