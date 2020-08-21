// main.js

bazaarLink = 'https://api.hypixel.net/skyblock/bazaar';
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

    var inputBox = document.getElementById('searchInput');
    output = "";
    inputBox.onkeyup = function() {
        
        searchArray = [];
        if (inputBox.value.length > 0) {
            for (item in itemList) {
                if (itemList[item].includes(inputBox.value.toUpperCase())) {
                    searchArray.push(itemList[item]);
                }
            }
        }
        output = "";
        for (i = 0; i < searchArray.length; i++) {
            output += searchArray[i] + "<br>";
        }
        $(".interface").html(output);
    }
    buttonOTxt = "";
    searchButton.addEventListener ("click", function(){
        if (searchArray.length > 1) {
            alert("Too many items, limit your search to 1 item");
        }
        else if (searchArray.length < 1) {
            alert("No item found, please enter a valid name");
        }
        else {
            buttonOTxt = "Buy Price: " + products[searchArray[0]].quick_status.buyPrice + "             " + "Sell Price: " + products[searchArray[0]].quick_status.sellPrice;
            alert(buttonOTxt);
        }

    })

    

   /*  output = "";
    for (i = 0; i < itemList.length; i++) {
        output += itemList[i] + "   Buy Price: " + itemBuyPrice[i] + "   Sell Price: " + itemSellPrice[i] + "<br>";
    } */

    //$(".interface").html(output);
});