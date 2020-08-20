// main.js

bazaarLink = 'https://api.hypixel.net/skyblock/bazaar';
$.getJSON(bazaarLink, function(data) {
    outputText = "Success value: " + data.success + "<br>lastUpdated value: " + data.lastUpdated; 
    $(".interface").html(outputText);
});