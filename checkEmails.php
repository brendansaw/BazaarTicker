<?php

$mysqli = new mysqli('localhost:3307', 'root', 'root', 'test');
if ($mysqli->connect_error){
    //echo "server died";
}
else{
    //echo 'connected successfully';
}

function getHypixData() {
    $url = 'https://api.hypixel.net/skyblock/bazaar';
	$data = json_decode(file_get_contents($url), true);
    $products = $data['products'];
    return $products;
}

function countNumberofEmails($sqlHandler) {
    $q = "SELECT * FROM `emails`";
    if ($result = $sqlHandler -> query($q)) {
        $rowcount = mysqli_num_rows($result);
        return $rowcount;
    }
    return -1;
}

function sendEmail($emailAddress, $item, $buyorsell, $price) {
    echo "For " . $emailAddress . " with item " . $item . $price . $buyorsell . ", sent email. ";
}


for ($i = 0; $i < countNumberofEmails($mysqli); $i++) {
    $products = getHypixData();
    $q = "SELECT * FROM `emails` LIMIT " . $i . ",1";
	$res = $mysqli -> query($q);
    $d = $res -> fetch_row();
    $email = $d[0];
    $item = $d[1];
    $buyorsell = $d[2];
    $price = $d[3];
    if ($buyorsell == "Buy") {
        if ($price >= $products[$item].buy_summary[0].pricePerUnit) {
            sendEmail($email, $item, $buyorsell, $price);
        }
    } else if ($buyorsell == "Sell") {
        if ($price <= $products[$item].sell_summary[0].pricePerUnit) {
            sendEmail($email, $item, $buyorsell, $price);
        }
    } else {
        echo "Something is wrong";
    }
}




$mysqli -> close();

?>