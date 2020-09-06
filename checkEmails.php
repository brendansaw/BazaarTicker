<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require 'PHPMailer-master/src/Exception.php';
require 'PHPMailer-master/src/PHPMailer.php';
require 'PHPMailer-master/src/SMTP.php';

$mail = new PHPMailer();
$mail->IsSMTP();
$mail->Mailer = "smtp";

$mail->SMTPDebug  = 1;  
$mail->SMTPAuth   = TRUE;
$mail->SMTPSecure = "tls";
$mail->Port       = 587;
$mail->Host       = "smtp.gmail.com";
$mail->Username   = "bazaarticker@gmail.com";
$mail->Password   = "";



function sendEmail($emailAddress, $item, $buyorsell, $price, $mail) {
    $mail->IsHTML(true);
    $mail->AddAddress($emailAddress, "User");
    $mail->SetFrom("bazaarticker@gmail.com", "Bazaar Ticker");
    $mail->Subject = "Bazaar Ticker Request";
    $buyorsell = strtolower($buyorsell);
    $content = "<p>Hello Bazaar Ticker user, <br> <br> You are receiving this email because the item that you are tracking: <b>$item </b>has obtained a <b>$buyorsell </b>price of<b> $price</b> coins per item in Hypixel’s Skyblock Bazaar market. <br> <br>Thank you for using Bazaar Ticker’s services.<br>bazaarticker.tk</p>";
    
    $mail->MsgHTML($content); 
    if(!$mail->Send()) {
    echo "Error while sending Email.";
    var_dump($mail);
    } else {
    echo "Email sent successfully";
    }
}


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
            sendEmail($email, $item, $buyorsell, $price, $mail);
        }
    } else if ($buyorsell == "Sell") {
        if ($price <= $products[$item].sell_summary[0].pricePerUnit) {
            sendEmail($email, $item, $buyorsell, $price, $mail);
        }
    } else {
        echo "Something is wrong";
    }
}




$mysqli -> close();

?>