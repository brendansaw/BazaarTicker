<html>

<?php

function updateDB($sqlHandler){
	
	$url = 'https://api.hypixel.net/skyblock/bazaar';
	$data = json_decode(file_get_contents($url), true);
	$products = $data['products'];

	$buystr = "{ \"buy\": [";
	$sellstr = "{ \"sell\": [";
	$timestr = gmdate("His", time());

	foreach ($products as $item){
		
		$buystr = $buystr . strval(round($item['quick_status']['buyPrice'], 1)) . ",";
		$sellstr = $sellstr . strval(round($item['quick_status']['sellPrice'], 1)) . ",";

	}

	$buystr = substr($buystr, 0, -1) . "]}";
	$sellstr = substr($sellstr, 0, -1) . "]}";
	
	$sql = "INSERT INTO `bazaarsecond` (`timestamp`, `buy`, `sell`) VALUES('". $timestr ."', '" . $buystr . "','" . $sellstr . "');";
	$result = $sqlHandler -> query($sql);
	mysqli_free_result($result);

}

function addData($sqlHandler, $tableName, $query){
	/*
	adds one row to the table with <tableName>, w/ timestamp, sell, buy.
	
	column names must be 
	*/
}


function getNumRows($sqlHandler, $tableName){
	/*
	get the length of table <tableName> in db assoc. with <sqlHandler>,
	returns length of table, if query successful, -1 if not.
	
	don't need to add ` symbols to tableName.
	*/
	
	$q = "SELECT COUNT(*) FROM `" . $tableName . "`";
	
	if ($result = $sqlHandler -> query($q)){
		$arr = $result -> fetch_row();
		return $arr[0];
	}
		
	return -1;
}

function checkInterval($old, $new, $pos){
	/*
	check if 2 timestamps are > 1 minute and returns true.
	*/
	$strol = strval($old);
	$strnew = strval($new);
	
	if ($strol[$pos] != $strnew[$pos]){
		//minute changed
		return true;
	}
	
	return false;
}

function getRow($sqlHandler, $tableName, $index){
	/*
	gets row at <index> from <tableName> at the <sqlHandler> db.
	
	returns one row from the table. each element = data assoc. with column.
	
	*/
	$q = "SELECT * FROM `" . $tableName . "` LIMIT " . $index . ",1";
	$res = $sqlHandler -> query($q);
	return $res -> fetch_row();
}


// connecting to mysql server
$mysqli = new mysqli('localhost:3306', 'root', 'root', 'test');

if ($mysqli->connect_error){
	echo "server died";
}
else{
	echo 'connected succ';
}

/*
while(true){
	updateDB($mysqli);
	sleep(1);
}
*/

echo getRow($mysqli, "bazaarsecond", 16)[0];
$mysqli -> close();

?>

</html>