// main.js

var inputBox = document.getElementById('searchInput');

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
        if (inputBox.value.length > 0) {
            for (item in itemList) {
                if (itemList[item].includes(inputBox.value.toUpperCase())) {
                    if (enchantStatus == "all") {
                        searchArray.push(itemList[item]);
                    }
                    else if (enchantStatus == "enchanted") {
                        if (itemList[item].includes("ENCHANTED")) {
                            searchArray.push(itemList[item]);
                        }
                    }
                    else if (enchantStatus == "unenchanted") {
                        if (!itemList[item].includes("ENCHANTED")) {
                            searchArray.push(itemList[item]);
                        }
                    }

                }
            }
        }
        printButtonsToSite(searchArray);
    }
});

buttonOTxt = "";
cell1 = document.getElementById("itemBuyPrice");
cell2 = document.getElementById("itemSellPrice");

searchButton.addEventListener ("click", function(){
    if (searchArray.length > 1) {
        alert("Too many items, limit your search to 1 item");
    }
    else if (searchArray.length < 1) {
        alert("No item found, please enter a valid name");
    }
    else {
/*             buttonOTxt = "Buy Price: " + products[searchArray[0]].quick_status.buyPrice.toFixed(2) + "             " + "Sell Price: " + products[searchArray[0]].quick_status.sellPrice.toFixed(2);
            alert(buttonOTxt); */
            cell1.textContent = products[searchArray[0]].quick_status.buyPrice.toFixed(2);
            cell2.textContent = products[searchArray[0]].quick_status.sellPrice.toFixed(2);

    }

})

function printButtonsToSite(arr) {
    const container = document.getElementById('sortedInterface');
    container.innerHTML = "";
    for (i = 0; i < arr.length; i++) {
        const button = document.createElement('button');
        button.innerText = arr[i];
        container.appendChild(button);
        button.addEventListener("click", function() {
            cell1.textContent = products[button.innerText].quick_status.buyPrice.toFixed(2);
            cell2.textContent = products[button.innerText].quick_status.sellPrice.toFixed(2);
        })

        var br = document.createElement("br");
        container.appendChild(br);
    }
}

