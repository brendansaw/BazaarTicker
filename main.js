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
                //document.getElementById('searchbox').innerHTML = "InputBox value: " + inputBox.value + "<br>Thing to check: " + itemList[item] + "<br> True or false? " + itemList[item].includes(inputBox.value.toUpperCase());
                if (itemList[item].includes(inputBox.value.toUpperCase())) {
                    searchArray.push(itemList[item]);
                }
            }
        }
        output = "";
        for (i = 0; i < searchArray.length; i++) {
            output += searchArray[i] + "<br>";
        }
        //document.getElementById('searchbox').innerHTML = inputBox.value;
        $(".interface").html(output);
    }

    

   /*  output = "";
    for (i = 0; i < itemList.length; i++) {
        output += itemList[i] + "   Buy Price: " + itemBuyPrice[i] + "   Sell Price: " + itemSellPrice[i] + "<br>";
    } */

    
});