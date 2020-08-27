$.ajax({
    url : 'getDataFromServer.php', // your php file
    type : 'GET', // type of the HTTP request
    success : function(data){
       var obj = JSON.parse(data);
       console.log(obj);
    }
 });