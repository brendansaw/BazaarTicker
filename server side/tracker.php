<html>

<?php

//connect to db


function updateDB(){
	
	$mysqli = new mysqli('localhost:3306', 'root', 'root', 'test');
	if ($mysqli->connect_error){
		echo "server died";
	}
	else{
		echo 'connected succ';
	}

	$url = 'https://api.hypixel.net/skyblock/bazaar';
	$data = json_decode(file_get_contents($url), true);

	$products = $data['products'];

	$buystr = "{ \"buy\": [";
	$sellstr = "{ \"sell\": [";

	foreach ($products as $item){
		
		$buystr = $buystr . strval(round($item['quick_status']['buyPrice'], 1)) . ",";
		$sellstr = $sellstr . strval(round($item['quick_status']['sellPrice'], 1)) . ",";

	}

	$buystr = substr($buystr, 0, -1) . "]}";
	$sellstr = substr($sellstr, 0, -1) . "]}";
	
	$sql = "INSERT INTO `bazaarstoretest1` (`timestamp`, `buy`, `sell`) VALUES('1', '" . $buystr . "','" . $sellstr . "');";
	$mysqli -> query($sql);
	
	$mysqli -> close();
}

while(true){
	updateDB();
	sleep(2);
}



?>

</html>