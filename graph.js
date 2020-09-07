// global variables
buyData = [];
sellData = [];
selectedTimeInt = 0;

bazaarLink = 'https://api.hypixel.net/skyblock/bazaar';
graph = document.createElement('canvas');
var ctx = graph.getContext('2d');
container = document.getElementById('graphDiv');

// creating chart object
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
 
function getDBDat(time){
    /*
    gets item buy, sell, and timestamp data from table corresponding to time interval from database.
    
    time represents the time interval to choose from. must be an int between 0 and number of time interval tables - 1
    e.x 0 = seconds, 1 = minutes, 2 = hours
    */

    timestamps = [];
    buydat = [];
    selldat = [];

    var d = '';

    $.ajax({
        type: "GET",
        // url = server url/php file
        url: 'serverside/getDataFromServer.php?time=' + (time),
        data: "",
        success: function(response)
        {
            jsonData = JSON.parse(response);

            // get utc offset
            today = new Date();
            offset = today.getTimezoneOffset() / 60;
            
            // update buy and sell data graphs, refresh graph
            for (i=0; i<jsonData.length; i++){

                // changing timestamp to match local time
                rawTimestamp = jsonData[i][0];
                newHrs = (Math.abs(Number(rawTimestamp.substring(0,2)) - offset) % 24).toString();
                if (newHrs.length < 2){newHrs = "0" + newHrs;}
                adjustedTimestamp = newHrs + ":" + rawTimestamp.substring(2,4) + ":" + rawTimestamp.substring(4,6);

                itemStatGraph.data.labels.push(adjustedTimestamp);
                buyData.push(JSON.parse(jsonData[i][1])["buy"][selectedIndex]);
                sellData.push(JSON.parse(jsonData[i][2])["sell"][selectedIndex]);

                itemStatGraph.update();
            }
        }
    });
    return [timestamps, buydat, selldat];
}

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

function setGraphData(timeFrame){
    /**
     * clears current graph data then sets it to be data from selected index on correct time frame.
     * timeFrame must be an int in range of 0 --> number of time interval tables-1
     */

    if (selectedIndex == -1){
        return;
    }

    selectedTimeInt = timeFrame;

    // remove all buy sell, timestamp data. assume arrays are all same length
    while (buyData.length > 0){
        buyData.pop();
        sellData.pop();
    }
    itemStatGraph.data.labels = [];

    // set graph data with db data
    getDBDat(timeFrame);
}

function updateGraph(){
    /**
     * updates graph on screen given a selected item only when the user selects the 'seconds' time interval"
     */

    if (selectedIndex == -1 || selectedTimeInt != 0) {
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

    // adding new data to graph already filled with data
    if (true){
        sellData.push(currSell);
        buyData.push(currBuy);   
        itemStatGraph.data.labels.push(currTime);

        // removing frontmost datapoints
        sellData.shift();
        buyData.shift();
        itemStatGraph.data.labels.shift(); 

    }
    itemStatGraph.update();

    container.appendChild(graph);
}
//call update function every 5s
window.setInterval(updateGraph, 5000);
