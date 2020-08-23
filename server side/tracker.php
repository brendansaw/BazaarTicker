<html>

<?php

$url = 'https://api.hypixel.net/skyblock/bazaar';
$obj = json_decode(file_get_contents($url), true);
echo $obj['success'];


?>

</html>