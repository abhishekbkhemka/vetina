<!DOCTYPE HTML>
<html lang="en-US">
<head>
	<meta charset="UTF-8">
	<title>Thank You!</title>
</head>
<body style="text-align: center;padding:20px 0;">
	<?php
        require_once 'Mail.php';

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
		$host = "rikoouucom.ipage.com";
        $username = "info@rikoouu.com";
        $password = "Medicokare@84";
		
		$recipient = "abhishekbkhemka@gmail.com";
		$subject = "Enquiry from Vetina Contact.";
		$mailheader = "From: $email \r\n";
		$from ="abhishekbkhemka@gmail.com";

		$headers = array ('From' => $from,'MIME-Version'=>'1.0\r\n','Content-Type'=> 'text/html; charset=ISO-8859-1\r\n',
           'To' => $recipient,
           'Subject' => $subject);
         $smtp = Mail::factory('smtp',
           array ('host' => $host,
             'auth' => true,
             'username' => $username,
             'password' => $password));

         $mail = $smtp->send($recipient, $headers, $formcontent);

	?>
	
	
</body>
</html>