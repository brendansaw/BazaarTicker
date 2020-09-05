<?php

    echo $_POST['formItem'];
    echo $_POST['uemail'];
    echo $_POST['buyorsell'];
    echo $_POST['priceReq'];


    $jsonString = file_get_contents('emailList.json');
    $data = json_decode($jsonString, true);
    

    $bruh = count($data);
    echo($bruh);

    




    $newJson = json_encode($data); 
    file_put_contents('emailList.json', $newJson);

?>