<?php

$old_dict = json_decode(file_get_contents("../itemDictionary.json"), true);

function getHypixDict(){
	/*
	gets buy, sell data from hypixel bazaar, returns them in an array containing string of buy and sell data in JSON format.
	*/
	
	$url = 'https://api.hypixel.net/skyblock/bazaar';
	$data = json_decode(file_get_contents($url), true);
    $products = $data['products'];
    $new_item_dict = [];

	foreach ($products as $item){
		$new_item_dict[$item["product_id"]] = $item["product_id"];
	}
	return $new_item_dict;
}
file_put_contents("../itemDictionary.json", json_encode(getHypixDict()));
?>