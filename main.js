// global variables

// main.js
checkSize();
$(window).resize(function() {
    checkSize();
    
})

function checkSize() {
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

var inputBox = document.getElementById('searchInput');

selectedIndex = -1;
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

  
    output = "";
    inputBox.onkeyup = function() {
        
        searchArray = [];
        searchArrayIndex = [];
        $.getJSON('./itemDictionary.json', function(dictDataTemp) {
            if (inputBox.value.length > 0) { 
                for (item in itemList) {
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
                }
            
            }
            printButtonsToSite(searchArray, searchArrayIndex);
        })
    }
});



function getBuySellSummary(itemIndex) {
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
    itemImgStr = imgIndex.replace(":",".");
    document.getElementById("itemImgId").innerHTML +=
       "<img src='itemImages/" + itemImgStr + ".png'>";
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
            button.innerText = dictData[button.id];
        })
        button.value = arrIndex[i];
        container.appendChild(button);
        button.addEventListener("click", function() {
            // update graph parameters
            selectedIndex = button.value;

            document.getElementById("buyBody_id").innerHTML = "";
            document.getElementById("sellBody_id").innerHTML = "";
            document.getElementById("itemImgId").innerHTML = "";
            
            getBuySellSummary(button.id);
            getItemImage(button.id);
            updateFormItem(button.id);

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

function changeGraphInterval(value){
    /**
     * onclick for when a timeinterval radio button is clicked. Reloads graph
     */
    setGraphData(value);
}



