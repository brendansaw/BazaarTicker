$.ajaxSetup({ cache:false});


// main.js
checkSize();
$(window).resize(function() {
    // calls the adjustment of the divs based on window size
    checkSize();
})

function checkSize() {
    // adjusting the size of the divs
    mainDiv = document.getElementsByClassName("mainDiv");

    if (window.innerWidth <= 1350) {
        for (i = 0; i < mainDiv.length; i++) {
            mainDiv[i].style.float = "none";
            mainDiv[i].style.width = "100%";
            mainDiv[i].style.textAlign = "left";
            mainDiv[i].style.padding = "10px 10px 10px 10px"
        }
    }
    else {
        for (i = 0; i < mainDiv.length; i++) {
            mainDiv[i].style.float = "left";
            mainDiv[i].style.textAlign = "left";
            mainDiv[i].style.padding = "10px 10px 10px 10px"
        }
        mainDiv[0].style.width = "25%";
        mainDiv[1].style.width = "55%";
        mainDiv[2].style.width = "20%";
        mainDiv[2].style.textAlign = "right";
    }
}

// this is the search bar
var inputBox = document.getElementById('searchInput');

selectedItem = "";
// these are the radio buttons that select for the enchanted status
enchantStatus = "all";
function changedEnchanted() {
    if (document.getElementById("allEnchants").checked == true) {
        enchantStatus = "all";
    } 
    else if (document.getElementById("enchanted").checked == true) {
        enchantStatus = "enchanted";
    }        
    else if (document.getElementById("unenchanted").checked == true) {
        enchantStatus = "unenchanted";
    }
    $(inputBox).keyup();
}

// API link
bazaarLink = 'https://api.hypixel.net/skyblock/bazaar';

$.getJSON(bazaarLink, function(data) {

    document.getElementById("allEnchants").checked = true;
    products = data.products;

    itemList = [];
    itemBuyPrice = [];
    itemSellPrice = [];
    for (item in products) {
        itemList.push(products[item].quick_status.productId);
        itemBuyPrice.push(products[item].quick_status.buyPrice);
        itemSellPrice.push(products[item].quick_status.sellPrice);  
    }

  
    // on key up of inputbox, perform search
    output = "";
    inputBox.onkeyup = function() {
        
        searchArray = [];
        searchArrayIndex = [];
        // using itemDictionary.json to transform the item names from the API into more readable names
        $.getJSON('./itemDictionary.json', function(dictDataTemp) {
            if (inputBox.value.length > 0) { 
                for (item in itemList) {
                    // checking if the item exists in the item dictionary
                    if (dictDataTemp.hasOwnProperty(itemList[item])) {
                        if ((dictDataTemp[itemList[item]].toUpperCase()).includes(inputBox.value.toUpperCase())) {
                            if (enchantStatus == "all") {
                                searchArray.push(itemList[item]);
                                searchArrayIndex.push(item);
                            }
                            else if (enchantStatus == "enchanted") {
                                if (itemList[item].includes("ENCHANTED")) {
                                    searchArray.push(itemList[item]);
                                    searchArrayIndex.push(item);
                                }
                            }
                            else if (enchantStatus == "unenchanted") {
                                if (!itemList[item].includes("ENCHANTED")) {
                                    searchArray.push(itemList[item]);
                                    searchArrayIndex.push(item);
                                }
                            }
                        }
                    } else {
                        if (itemList[item].includes(inputBox.value.toUpperCase())) {
                            if (enchantStatus == "all") {
                                searchArray.push(itemList[item]);
                                searchArrayIndex.push(item);
                            }
                            else if (enchantStatus == "enchanted") {
                                if (itemList[item].includes("ENCHANTED")) {
                                    searchArray.push(itemList[item]);
                                    searchArrayIndex.push(item);
                                }
                            }
                            else if (enchantStatus == "unenchanted") {
                                if (!itemList[item].includes("ENCHANTED")) {
                                    searchArray.push(itemList[item]);
                                    searchArrayIndex.push(item);
                                }
                            }
                        }
                    }
                }
            }
            // print the buttons to the site based on the what values we pushed to the arrays
            printButtonsToSite(searchArray, searchArrayIndex);
        })
    }
});



function getBuySellSummary(itemIndex) {
    // printing out the buy and sell summaries under the graph
    itemSellSum = [];
    itemBuySum = [];
    
    $.getJSON(bazaarLink, function(data){
        products = data.products;
        for (i in products[itemIndex].sell_summary) {
            itemSellSum.push(products[itemIndex].sell_summary[i]);
        }
        for (i in products[itemIndex].buy_summary) {
            itemBuySum.push(products[itemIndex].buy_summary[i]);
        }
        
        buyTableRef = document.getElementById("buyBody_id");
        sellTableRef = document.getElementById("sellBody_id")

        for (j in products[itemIndex].buy_summary) {
            newRow = buyTableRef.insertRow(-1);

            for (i = 0; i < 3; ++i) {
                newCell = newRow.insertCell(0);
                newCell.className = "danger";
                newCell.id = "buy"+i+j;
                if (i == 2)
                newCell.innerHTML = itemBuySum[j].orders;
                else if (i == 1) 
                newCell.innerHTML = itemBuySum[j].amount;
                else
                newCell.innerHTML = itemBuySum[j].pricePerUnit;
            }
        }   
        for (j in products[itemIndex].sell_summary) {
            newRow = sellTableRef.insertRow(-1);

            for (i = 0; i < 3; ++i) {
                newCell = newRow.insertCell(0);
                newCell.className = "success";
                newCell.id = "sell"+i+j;
                if (i == 0)
                newCell.innerHTML = itemSellSum[j].orders;
                else if (i == 1) 
                newCell.innerHTML = itemSellSum[j].amount;
                else
                newCell.innerHTML = itemSellSum[j].pricePerUnit;
            }
        }  



    });
}

function getItemImage(imgIndex) {
    // get the corresponding image to the item
    itemImgStr = imgIndex.replace(":",".");
    document.getElementById("itemImgId").innerHTML +=
       "<img class=\"itemimg\" src='itemImages/" + itemImgStr + ".png'>";
}
function updateFormItem(itemName) {
    document.getElementById("formItem").value = itemName;
}

function printButtonsToSite(arr, arrIndex) {
    const itemform = document.getElementById("formItem");
    const container = document.getElementById('sortedInterface');
    container.innerHTML = "";
    for (i = 0; i < arr.length; i++) {
        const button = document.createElement('button');
        button.className = "searchButton";
        button.id = arr[i];
        $.getJSON('./itemDictionary.json', function(dictData) {
            // check if the item dictionary has the item
            if (dictData.hasOwnProperty(button.id)) {
                button.innerText = dictData[button.id];
            }
            else {
                button.innerText = button.id;
            }
        })
        button.value = arrIndex[i];
        container.appendChild(button);
        button.addEventListener("click", function() {
            // update graph parameters
            selectedItem = button.id;

            document.getElementById("buyBody_id").innerHTML = "";
            document.getElementById("sellBody_id").innerHTML = "";
            document.getElementById("itemImgId").innerHTML = "";
            
            getBuySellSummary(button.id);
            getItemImage(button.id);
            updateFormItem(button.id);

            //update header
            document.getElementById("histHeader").innerHTML = "History for " + "<span class=\"itemHeader\">" + button.innerText + ":</span>";

            // update graph
            setGraphData(getSelTimeInterval());
        })

        var br = document.createElement("br");
        container.appendChild(br);
    }
}


function getSelTimeInterval(){
    /**
     * gets the selected time interval radio button, return value as int.
     */

    var radios = document.getElementsByName('timeIntervalSelect');

    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            return radios[i].value;
        }
    }
}

function updateSlideLbl(value){
    // add listener for the popup box, purely for UI
    var slidertitle = document.getElementById("slidertitle");
    slidertitle.innerHTML = Math.floor(value / 1000).toString() + "h Prediction";
}

function changeGraphInterval(value){
    /**
     * onclick for when a timeinterval radio button is clicked. Reloads graph
     */
    setGraphData(value);

    // adding or removing prediction slider
    if (value==2){
        document.getElementById("predSliderContainer").innerHTML = "<span id=\"slidertitle\">0h Prediction</span><input type=\"range\" min=\"1\" max=\"24000\" value=\"1\" class=\"slider\" id=\"1hpredictSlider\" onchange=\"graphPredict(this.value)\" oninput=\"updateSlideLbl(this.value)\">";
    }

    else{
        document.getElementById("predSliderContainer").innerHTML = "";
    }
}


