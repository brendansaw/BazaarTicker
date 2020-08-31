
time = 0;

function updateFun(){

    $.ajax({
        type: "GET",
        // url = server url/php file
        url: 'getDataFromServer.php?time=' + (time % 2),
        data: "",
        success: function(response)
        {
            d = response;
            jsonData = JSON.parse(response);
            //alert(jsonData);
            document.getElementById("mainItem").innerHTML = jsonData;
        }
    });

    time += 1;
}