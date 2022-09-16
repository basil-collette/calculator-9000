<?php
header("Access-Control-Allow-Origin: *");

$host_name = 'localhost';
$database = 'react';
$user_name = 'root';
$password = '';
$options[PDO::ATTR_ERRMODE] = PDO::ERRMODE_EXCEPTION;
//$link = new mysqli($host_name, $user_name, $password, $database);
$link = new PDO($host_name . ';dbname=' .  $database, $user_name, $password, $options);

$calcul_author = $_POST['author'];
$calcul = $_POST['calcul'];
date_default_timezone_set('Europe/Paris');
$today = date("Y/m/d");

$sql="INSERT INTO calculs(author, calcul, date) VALUES (:author, :calcul, :Date";
$stmt = $link->prepare($sql);
$stmt->bind_param(':author', $calcul_author);
$stmt->bind_param(':calcul', $calcul);
$stmt->bind_param(':Date', $today);

if ($stmt->execute()) === TRUE) {
  	echo 'success';
} else {
  	echo 'error';
}
?>
