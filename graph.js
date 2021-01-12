// global variables
buyData = [];
sellData = [];
bforecastDat = [];
sforecastDat = [];
selectedTimeInt = 0;
let model;
(async function initBzrModel(){
    console.log("loading model");

    // updating global variable
    model = await tf.loadLayersModel('http://localhost:8080/bzr_model/model.json', false);
    model.summary();

    // first dimension is batch size i.e number of times input is inserted
    model.predict(tf.ones([1, 2, 29])).print();
  })();


bazaarLink = 'https://api.hypixel.net/skyblock/bazaar';
graph = document.createElement('canvas');
var ctx = graph.getContext('2d');
container = document.getElementById('graphDiv');

Chart.defaults.global.defaultFontColor = 'rgb(194, 194, 194)';
// creating chart object
var itemStatGraph = new Chart(ctx, {
    type: 'line',
    data: {
            labels: [],
            datasets: [{
                label: 'Buy Price',
                backgroundColor: 'rgb(3, 252, 152)',
                fill: false,
                borderColor: 'rgb(3, 252, 152)',
                data: buyData
            },

            {
                label: 'Sell Price',
                backgroundColor: 'rgb(255, 0, 89)',
                fill: false,
                borderColor: 'rgb(255, 0, 89)',
                data: sellData
            },
            {
                label: 'Buy Forecast',
                borderWidth: 1.5,
                fill: false,
                borderDash: [5, 5],
                borderColor: 'rgb(3, 252, 152)',
                data: bforecastDat
            },
            {
                label: 'Sell Forecast',
                borderWidth: 1.5,
                fill: false,
                borderDash: [5, 5],
                borderColor: 'rgb(255, 0, 89)',
                data: sforecastDat
            }]
        },

    options: {
         legend: {
            display: false
            }
        }
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
                
                buyselldat = JSON.parse(jsonData[i][1]);
                buyrow = buyselldat[0];
                sellrow = buyselldat[1];
                
                // don't add data from db that doesn't include new items
                if (buyrow.hasOwnProperty(selectedItem) && sellrow.hasOwnProperty(selectedItem)){
                    buyData.push(buyrow[selectedItem]);
                    sellData.push(sellrow[selectedItem]);

                    // changing timestamp to match local time
                    rawTimestamp = jsonData[i][0];
                    newHrs = ((Number(rawTimestamp.substring(0,2)) - offset + 24) % 24).toString();
                    if (newHrs.length < 2){newHrs = "0" + newHrs;}
                    adjustedTimestamp = newHrs + ":" + rawTimestamp.substring(2,4) + ":" + rawTimestamp.substring(4,6);

                    itemStatGraph.data.labels.push(adjustedTimestamp);
                    itemStatGraph.update();
                }
            }
            
        }
    });
    return [timestamps, buydat, selldat];
}

function getStats(name){
    /**
     * collect stat data for an item with <name>
     */
    buysell = [];

    $.ajax({
        url: bazaarLink,
        async: false,
        success: function(data){
            products = data.products;
            buysell.push(products[name]["quick_status"]["buyPrice"].toFixed(2));
            buysell.push(products[name]["quick_status"]["sellPrice"].toFixed(2))
        }
    })

    return buysell;
}

function setGraphData(timeFrame){
    /**
     * clears current graph data then sets it to be data from selected index on correct time frame.
     * timeFrame must be an int in range of 0 --> number of time interval tables-1
     */

    if (selectedItem == ""){
        return;
    }

    clearArr(bforecastDat);
    clearArr(sforecastDat);

    while (itemStatGraph.data.labels.length != buyData.length){
        itemStatGraph.data.labels.pop();
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

    if (selectedItem == "" || selectedTimeInt != 0) {
        return;
    }
    stats = getStats(selectedItem);
    currBuy = stats[0];
    currSell = stats[1];
    
    var nowTime = new Date();
    minute = nowTime.getMinutes();
    if (minute >= 0 && minute <= 9) minute = "0" + minute;
    second = nowTime.getSeconds();
    if (second >= 0 && second <= 9) second = "0" + second;

    var currTime = nowTime.getHours() + ":" + minute + ":" + second;

    sellData.push(currSell);
    buyData.push(currBuy);   
    itemStatGraph.data.labels.push(currTime);

    // removing frontmost datapoints, keep graph fixed length
    sellData.shift();
    buyData.shift();
    itemStatGraph.data.labels.shift(); 

    itemStatGraph.update();
}

function normalizeArr(arr){
    res = [];
    
    maxVal = Math.max.apply(null, arr);
    minVal = Math.min.apply(null, arr);

    for (x in arr){
        res.push((arr[x]-minVal) / (maxVal - minVal));
    }

    return res;
}

function denormalize(arr, maxVal, minVal){
    res = [];

    for (x in arr){
        res.push(arr[x]*(maxVal - minVal) + minVal);
    }

    return res;
}

function labelsToInt(label){
    /**
     * convert timestamp into equivalent integer array of length 29
     */

    res = [];
    i = 0;
    time = Number(label.substring(0,2));

    while (i < 29){
        res.push((Math.abs(time) % 24) / 23);
        time--;
        i++;
    }

    return res;
}

function intHrsToLabel(time){
    strTime = (time).toString() + ":00:00";
    if (strTime.length < 8){strTime = "0" + strTime;}
    return strTime;
}

function removeOffset(arr){
    /**
     * removes offset from graph array, i.e trailing elements that are null
     */
    while (true){
        if (arr[arr.length - 1] == null){
            arr.pop();
        }
        else{
            break;
        }
    }
}

function clearArr(arr){
    while (arr.length > 0){
        arr.pop();
    }
}

function graphPredict(sliderVal){
    /**
     * predicts some hours (multiples of 3) into the future depending on how far the slider is.
     * updates graph
     */


    if (model == undefined){
        alert("model not loaded yet");
        return;
    }

    if (buyData.length < 29){
        return;
    }
    // setting graph to original state
    removeOffset(buyData);
    removeOffset(sellData);
    clearArr(bforecastDat);
    clearArr(sforecastDat);

    while (itemStatGraph.data.labels.length != buyData.length){
        itemStatGraph.data.labels.pop();
    }

    // get 29 latest points of buy sell data
    sell_in = sellData.slice(sellData.length - 29, sellData.length);
    buy_in = buyData.slice(buyData.length - 29, buyData.length);

    // get number of hours to predict
    hours = Math.floor(sliderVal/1000);
    predicted = 0;

    // creating offset for dotted line graph
    for (i=0; i<buyData.length - 1; i++){
        bforecastDat.push(null);
        sforecastDat.push(null);
    }

    // add last point of buy data to forecast to connect graphs
    bforecastDat.push(buyData[buyData.length - 1]);
    sforecastDat.push(sellData[sellData.length - 1]);

    // add prediction values
    while (predicted < hours){

        // normalize data
        norm_sell_in = normalizeArr(sell_in);
        norm_buy_in = normalizeArr(buy_in);
        time_in = labelsToInt(itemStatGraph.data.labels[itemStatGraph.data.labels.length - 1]);

        buyMax = Math.max.apply(null, buy_in);
        sellMax = Math.max.apply(null, sell_in);
        buyMin = Math.min.apply(null, buy_in);
        sellMin = Math.min.apply(null, sell_in);

        // predict buy sell
        buy_pred = model.predict(tf.tensor([[norm_buy_in, time_in]])).dataSync();
        buy_pred = Array.from(buy_pred)[0];
        sell_pred = model.predict(tf.tensor([[norm_sell_in, time_in]])).dataSync();
        sell_pred = Array.from(sell_pred)[0];

        // update input for next iteration
        new_time = Number((itemStatGraph.data.labels[itemStatGraph.data.labels.length - 1].substring(0, 2)) + 1) % 24

        norm_buy_in.push(buy_pred);
        norm_sell_in.push(sell_pred);
        time_in.push(new_time);

        // denormalize results, shift the input "window" one over to the right
        buy_in = denormalize(norm_buy_in, buyMax, buyMin);
        sell_in = denormalize(norm_sell_in, sellMax, sellMin);

        buy_in.shift();
        sell_in.shift();
        time_in.shift();

        // add result to graphs
        bforecastDat.push(buy_in[buy_in.length - 1]);
        sforecastDat.push(sell_in[sell_in.length -1]);
        itemStatGraph.data.labels.push(intHrsToLabel(new_time));

        // offset buy sell curves leftwards
        buyData.push(null);
        sellData.push(null);
        predicted++;
        itemStatGraph.update();
    }

    itemStatGraph.update();


    
}

//call update function every 5s
container.innerHTML = "";
container.appendChild(graph);
window.setInterval(updateGraph, 5000);
