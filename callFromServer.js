
time = 0;

timestamps = [];
buydat = [];
selldat = [];

function updateFun(){
    $.ajax({
        type: "GET",
        // url = server url/php file
        url: 'server%20side/getDataFromServer.php?time=' + (time % 2),
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
    time += 1;
}