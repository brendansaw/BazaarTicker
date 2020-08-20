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

    

   /*  output = "";
    for (i = 0; i < itemList.length; i++) {
        output += itemList[i] + "   Buy Price: " + itemBuyPrice[i] + "   Sell Price: " + itemSellPrice[i] + "<br>";
    } */

    //$(".interface").html(output);
});