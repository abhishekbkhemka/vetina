<?php
//require 'vendor/autoload.php'; // If you're using Composer (recommended)
// Comment out the above line if not using Composer
require("sendgrid-php/sendgrid-php.php");
// If not using Composer, uncomment the above line and
// download sendgrid-php.zip from the latest release here,
// replacing <PATH TO> with the path to the sendgrid-php.php file,
// which is included in the download:
// https://github.com/sendgrid/sendgrid-php/releases
//$name = '';
// if(isset($_POST['name'])){
// 	$name = $_POST['name'];
// } 
$email = new \SendGrid\Mail\Mail(); 
$email->setFrom("abhi@rikoouu.com", "Example User");
$email->setSubject("Sample reques from nn ");
$email->addTo("abhishekbkhemka@gmail.com", "Example User");
$email->addContent("text/plain", "and easy to do anywhere, even with PHP");
$fname = $_POST['fname'];
$lname = $_POST['lname'];
$mobileNo = $_POST['mobileNo'];
$city = $_POST['city'];
$email = $_POST['email'];
$postal: $_POST['#postal'];
$message = $_POST['message'];
$formcontent=" From: Website Contact Form $email \n
		Name: $fname\n
        Mobile Number: $mobileNo \n
        City: $city \n
        Email Address: $email \n
        Postal Code: $postal \n
		Message: $message";
$email->addContent(
    "text/html", $formcontent
);
//$sendgrid = new \SendGrid(getenv('SENDGRID_API_KEY'));
$sendgrid = new \SendGrid('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');
try {
    $response = $sendgrid->send($email);
     echo json_encode($response->body());
     // echo('{"status":json_encode(response)}');
} catch (Exception $e) {
    echo 'Caught exception: '. $e->getMessage() ."\n";
}
