<?php
/*FORMAT
Object.keys(Mailer1.buy).length + ... > 3 then dont allow it

whenever the price is greter or les then depend on buy or sell
sendMail()
*/

    $jsonString = file_get_contents('emailList.json');
    $data = json_decode($jsonString, true);

    $data[0][''];

    $newJson = json_encode($data);
    file_put_contents('emailList.json', $newJson);

?>