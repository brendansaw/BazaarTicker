<?php
$uemail = $_POST['uemail'];
$item = $_POST['item'];
$buyorsell = $_POST['buyorsell'];
$priceReq =  round($_POST['priceReq'], 1);

$mysqli = new mysqli('localhost:3306', 'root', 'root', 'test');
if ($mysqli->connect_error){
    //echo "server died";
}
else{
    //echo 'connected successfully';
}

$timestr = gmdate("YmdHis", time());

if (countNumberofEmails($mysqli, $uemail)) {
    $q = "INSERT INTO `emails` (`email`, `item`, `buyorsell`, `price`, `timestamp`) VALUES ('$uemail', '$item', '$buyorsell', '$priceReq', '$timestr')";
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