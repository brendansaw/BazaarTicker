buyData = [];
sellData = [];
bazaarLink = 'https://api.hypixel.net/skyblock/bazaar';
var ctx = document.getElementById('itemStatGraph').getContext('2d');

// creating charts
var itemStatGraph = new Chart(ctx, {
    type: 'line',
    data: {
            labels: [],
            datasets: [{
                label: 'Buy Price',
                backgroundColor: 'rgb(255, 0, 0)',
                fill: false,
                borderColor: 'rgb(255, 0, 0)',
                data: buyData
            },

            {
                label: 'Sell Price',
                backgroundColor: 'rgb(0, 255, 0)',
                fill: false,
                borderColor: 'rgb(0, 255, 0)',
                data: sellData
            }]
        },

    options: {}
});

// colllecting stat data
function getStats(){
    $.getJSON(bazaarLink, function(data) {
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

// update graph on screen
function updateGraph(){
    stats = getStats();
    itemBuyPrice = stats[0];
    itemSellPrice = stats[1];
    
    var nowTime = new Date();
    minute = nowTime.getMinutes();
    if (minute >= 0 && minute <= 9) minute = "0" + minute;
    second = nowTime.getSeconds();
    if (second >= 0 && second <= 9) second = "0" + second;

    var currTime = nowTime.getHours() + ":" + minute + ":" + second;

    // TODO give input to update graph function
    index = itemBuyPrice.length-1
    currBuy = itemBuyPrice[index];
    currSell = itemSellPrice[index];

    sellData.push(currSell);
    buyData.push(currBuy);   
    itemStatGraph.data.labels.push(currTime);  
    itemStatGraph.update();    
}


//call update function every 5s
window.setInterval(updateGraph, 5000);
