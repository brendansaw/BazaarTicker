<?php
    $mysqli = new mysqli('localhost:3307', 'root', 'root', 'test');
    if ($mysqli->connect_error){
        //echo "server died";
    }
    else{
        //echo 'connected successfully';
    }
    
    $q = "SELECT * FROM `bazaarsecond` LIMIT 0,1";
	$res = $mysqli -> query($q);
    $d = $res -> fetch_row();
    
    echo json_encode($d[2] . "HELLO");
    //echo json_encode("Hello");

    $mysqli -> close();
?>
