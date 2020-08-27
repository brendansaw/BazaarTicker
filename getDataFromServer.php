<?php
    $mysqli = new mysqli('localhost:3306', 'root', 'root', 'test');
    $q = "SELECT * FROM `bazaarsecond` LIMIT 0,1";
	$res = $sqlHandler -> query($q);
    echo $res -> fetch_row();
    


?>
