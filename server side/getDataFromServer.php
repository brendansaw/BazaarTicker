<?php
    $TBL_NAMES = array("bazaarsecond2", "bazaarminute", "bazaarhour");
    $tbl = $_REQUEST['time'];

    if ($tbl != null and $tbl < count($TBL_NAMES)){
        $mysqli = new mysqli('localhost:3306', 'root', 'root', 'test');
        if ($mysqli->connect_error){
            //echo "server died";
        }
        else{
            //echo 'connected successfully';
        }
        
        $q = "SELECT * FROM `" . $TBL_NAMES[$tbl] . "`";
        $res = $mysqli -> query($q);
        $d = $res -> fetch_all();
        
        $e =  json_encode($d);
        echo $e;
        //echo json_encode("Hello");

        $mysqli -> close();
    }

    else{
        echo "bro";
    }
?>
