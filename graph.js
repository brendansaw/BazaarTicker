buyData = [];
sellData = [];
bazaarLink = 'https://api.hypixel.net/skyblock/bazaar';
graph = document.createElement('canvas');
var ctx = graph.getContext('2d');
container = document.getElementById('graphDiv');

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
    
    });

    return [itemBuyPrice, itemSellPrice];
}


// update graph on screen
function updateGraph(){
    if (selectedIndex == -1) {
        return;
    } 
    container.innerHTML = "";
    stats = getStats();
    itemBuyPrice = stats[0];
    itemSellPrice = stats[1];
    
    var nowTime = new Date();
    minute = nowTime.getMinutes();
    if (minute >= 0 && minute <= 9) minute = "0" + minute;
    second = nowTime.getSeconds();
    if (second >= 0 && second <= 9) second = "0" + second;

    var currTime = nowTime.getHours() + ":" + minute + ":" + second;

    //temporarily set to 0
    currBuy = itemBuyPrice[selectedIndex];
    currSell = itemSellPrice[selectedIndex];

    sellData.push(currSell);
    buyData.push(currBuy);   
    itemStatGraph.data.labels.push(currTime);  
    itemStatGraph.update();    
    console.log(currBuy);
    console.log(currSell);
    console.log(selectedIndex);

    container.appendChild(graph);
}

setTimeout(updateGraph, 1);
//call update function every 5s
window.setInterval(updateGraph, 5000);
