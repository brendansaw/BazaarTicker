x = [];
y = [];

// main.js

bazaarLink = 'https://api.hypixel.net/skyblock/bazaar';

function getStats(){
    $.getJSON(bazaarLink, function(data) {
        //outputText = "Success value: " + data.success + "<br>lastUpdated value: " + data.lastUpdated; 
        //inside = data.products.BROWN_MUSHROOM.quick_status.productId;
        products = data.products;
    
        itemList = [];
        itemBuyPrice = [];
        itemSellPrice = [];
        for (item in products) {
            itemList.push(products[item].quick_status.productId);
            itemBuyPrice.push(products[item].quick_status.buyPrice);
            itemSellPrice.push(products[item].quick_status.sellPrice);
        }
    
        output = "";
        $(".interface").html(output);
    });

    return [itemBuyPrice, itemSellPrice];
}

var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                label: 'Buy Price',
                backgroundColor: 'rgb(255, 0, 0)',
                fill: false,
                borderColor: 'rgb(255, 0, 0)',
                data: x
            },

            {
                label: 'Sell Price',
                backgroundColor: 'rgb(0, 255, 0)',
                fill: false,
                borderColor: 'rgb(0, 255, 0)',
                data: y
            }]
        },

    options: {}
});

d = 0;

function update(){
    stats = getStats();
    itemBuyPrice = stats[0];
    itemSellPrice = stats[1];

    i = itemBuyPrice[itemBuyPrice.length-1];
    i2 = itemSellPrice[itemSellPrice.length-1];

    y.push(i2);
    x.push(i);
    myChart.data.labels.push('boi');     
    myChart.update();    
}


window.setInterval(update, 5000);
