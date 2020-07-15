<?php
//require 'vendor/autoload.php'; // If you're using Composer (recommended)
// Comment out the above line if not using Composer
require("sendgrid-php/sendgrid-php.php");
// If not using Composer, uncomment the above line and
// download sendgrid-php.zip from the latest release here,
// replacing <PATH TO> with the path to the sendgrid-php.php file,
// which is included in the download:
// https://github.com/sendgrid/sendgrid-php/releases
$fname = '';
if(isset($_POST['fname'])){
 	$fname = $_POST['fname'];
}

$lname = '';
if(isset($_POST['lname'])){
 	$lname = $_POST['lname'];
}

$name = '';
if(isset($_POST['name'])){
 	$name = $_POST['name'];
}

$mobileNo = '';
if(isset($_POST['mobileNo'])){
 	$mobileNo = $_POST['mobileNo'];
}

$email = '';
if(isset($_POST['email'])){
 	$email = $_POST['email'];
}

$city = '';
if(isset($_POST['city'])){
 	$city = $_POST['city'];
}

$address = '';
if(isset($_POST['address'])){
 	$address = $_POST['address'];
}

$sample_req = '';
if(isset($_POST['sample_req'])){
 	$sample_req = $_POST['sample_req'];
}



$postal = '';
if(isset($_POST['postal'])){
 	$postal = $_POST['postal'];
}

$message = '';
if(isset($_POST['message'])){
 	$message = $_POST['message'];
}

$source = '';
if(isset($_POST['source'])){
 	$source = $_POST['source'];
}

if($source == 'contact'){
$formcontent=" <p>From: Website Contact Form</p> <br>
        <p> Email: $email </p>
		<p> Name: $fname  $lname  </p>
        <p> Mobile Number: $mobileNo </p>
        <p> City: $city </p>
        <p> Email Address: $email </p>
        <p> Postal Code: $postal </p>
		<p> Message: $message </p>";
}else{
$formcontent=" <p>From: Sample Requested </p> <br>
        <p> Email: $email </p>
		<p> Name: $name  </p>
        <p> Mobile Number: $mobileNo </p>
        <p> Address: $address </p>
        <p> Email Address: $email </p>
        <p> Postal Code: $postal </p>
		<p> Sample Requested: $sample_req </p>";
}

$email = new \SendGrid\Mail\Mail();
$email->setFrom("abhi@rikoouu.com", "Vetina");
$email->setSubject("Someone contacted from vetina.com");
$email->addTo("customerservice@vetina.com", "Vetina");
$email->addContent("text/plain", $formcontent);
$email->addContent(
    "text/html", $formcontent
);
//echo getenv('SENDGRID_API_KEY');
//exit(0);
$sendgrid = new \SendGrid(getenv('SENDGRID_API_KEY'));
try {
    $response = $sendgrid->send($email);
     echo json_encode($response->body());
    // echo('{"status":json_encode(response)}');
} catch (Exception $e) {
    echo 'Caught exception: '. $e->getMessage() ."\n";
}
?>
