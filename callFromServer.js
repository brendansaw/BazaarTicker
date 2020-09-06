
function getServerDat(time){
    /*
    gets item buy, sell, and timestamp data from table corresponding to time interval from database.
    
    time represents the time interval to choose from. 
    time must be an int between 0 and number of time interval tables - 1
    e.x 0 = seconds, 1 = minutes, 2 = hours etc...
    */

    timestamps = [];
    buydat = [];
    selldat = [];
    time = 0;

    $.ajax({
        type: "GET",
        // url = server url/php file
        url: 'server%20side/getDataFromServer.php?time=' + (time),
        data: "",
        success: function(response)
        {
            d = response;
            jsonData = JSON.parse(response);
            document.getElementById("mainItem").innerHTML = jsonData;

            for (i=0; i<jsonData.length; i++){
                timestamps.push(jsonData[i][0]);
                buydat.push(JSON.parse(jsonData[i][1])["buy"]);
                selldat.push(JSON.parse(jsonData[i][2])["sell"]);
            }
        }
    });

    return [timestamps, buydat, selldat];
}