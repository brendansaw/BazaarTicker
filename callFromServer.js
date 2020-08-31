$.ajax({
    type: "GET",
    url: 'getDataFromServer.php',
    data: $(this).serialize(),
    success: function(response)
    {
        jsonData = JSON.parse(response);
        //alert(jsonData);
        document.getElementById("mainItem").innerHTML = jsonData;
    }
});