<?php


    $jsonString = file_get_contents('emailList.json');
    $data = json_decode($jsonString);
    echo("poop");

    $data['Mailer1']['buy']['EMERALD'] = 10000;

    $newJson = json_encode($data); 
    file_put_contents('emailList.json', $newJson);

?>