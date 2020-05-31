<?php
//require 'vendor/autoload.php'; // If you're using Composer (recommended)
// Comment out the above line if not using Composer
require("sendgrid-php/sendgrid-php.php");
// If not using Composer, uncomment the above line and
// download sendgrid-php.zip from the latest release here,
// replacing <PATH TO> with the path to the sendgrid-php.php file,
// which is included in the download:
// https://github.com/sendgrid/sendgrid-php/releases
$name = $_GET['name'];
if(isset($_GET["name"])){
	$name = $_GET["name"];
} 
$email = new \SendGrid\Mail\Mail(); 
$email->setFrom("abhi@rikoouu.com", "Example User");
$email->setSubject("Sample reques from ".$name);
$email->addTo("abhishekbkhemka@gmail.com", "Example User");
$email->addContent("text/plain", "and easy to do anywhere, even with PHP");
$email->addContent(
    "text/html", "<strong>and easy to do anywhere, even with PHP</strong>"
);
$sendgrid = new \SendGrid(getenv('SENDGRID_API_KEY'));
try {
    $response = $sendgrid->send($email);
     echo('{"status":"success"}');
} catch (Exception $e) {
    echo 'Caught exception: '. $e->getMessage() ."\n";
}
