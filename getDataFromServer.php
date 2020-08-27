<?php
    $mysqli = new mysqli('localhost:3306', 'root', 'root', 'test');
    $q = "SELECT * FROM 'bazaarsecond' LIMIT 0,1";
	$res = $mysqli -> query($q);
    $d = $res -> fetch_row();
    
    echo json_encode($d[0]);

?>
