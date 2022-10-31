<?php
    $name = $_REQUEST["name"];
    $email = $_REQUEST["email"];
    $msg = $_REQUEST["msg"];


    $from = "info@scribblex.net";
    $to = "contact@scribblex.net";
    $subject = "Contact Form Incoming!";
    $message = "Name: ".$name."\nEmail: ".$email."\nMessage: ".$msg;
    $headers = "From:" . $email;
    mail($to,$subject,$message, $headers);
?>