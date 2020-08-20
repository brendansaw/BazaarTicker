// main.js

bazaarLink = 'https://api.hypixel.net/skyblock/bazaar';
$.getJSON(bazaarLink, function(data) {
    //outputText = "Success value: " + data.success + "<br>lastUpdated value: " + data.lastUpdated; 
    //inside = data.products.BROWN_MUSHROOM.quick_status.productId;
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
    for (i = 0; i < itemList.length; i++) {
        output += itemList[i] + "   Buy Price: " + itemBuyPrice[i] + "   Sell Price: " + itemSellPrice[i] + "<br>";
    }

    $(".interface").html(output);
});