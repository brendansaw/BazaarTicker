<?php
$uemail = $_POST['uemail'];
$item = $_POST['item'];
$buyorsell = $_POST['buyorsell'];
$priceReq =  $_POST['priceReq'];

$mysqli = new mysqli('localhost:3306', 'root', 'root', 'test');
if ($mysqli->connect_error){
    //echo "server died";
}
else{
    //echo 'connected successfully';
}


if (countNumberofEmails($mysqli, $uemail)) {
    $q = "INSERT INTO `emails` (`email`, `item`, `buyorsell`, `price`) VALUES ('" . $uemail . "', '" . $item . "', '" . $buyorsell . "', '" . $priceReq . "')";
    if ($result = $mysqli -> query($q)) {
    }
} 


function countNumberofEmails($sqlHandler, $email) {
    $q = "SELECT * FROM `emails` WHERE `email` = '" . $email . "'";
    if ($result = $sqlHandler -> query($q)) {
        $rowcount = mysqli_num_rows($result);
        echo json_encode($rowcount);
        return $rowcount < 3;
    }
    return false;
}
$mysqli -> close();
?>