<?php
if (isset($_SERVER['HTTP_ORIGIN'])) { // Decide if the origin in $_SERVER['HTTP_ORIGIN'] is one // you want to allow, and if so:
  header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
  header('Access-Control-Allow-Credentials: true');
  header('Access-Control-Max-Age: 86400'); // cache for 1 day
}

// Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

  if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])) {
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
  }

  if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) {
      header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
  }
}

$params = (array) json_decode(file_get_contents('php://input'));

$host_name = 'localhost';
$database = 'react';
$user_name = 'root';
$password = '';
$options[PDO::ATTR_ERRMODE] = PDO::ERRMODE_EXCEPTION;
$link = new PDO("mysql:host=" . $host_name . ';dbname=' .  $database, $user_name, $password, $options);

if(isset($params['calcul']) && isset($params['author'])) {
  $calcul_author = $params['author'];
  $calcul = $params['calcul'];
  date_default_timezone_set('Europe/Paris');
  $today = date("Y/m/d");

  $sql = "INSERT INTO calculs(author, calcul, date) VALUES (:author, :calcul, :Date);";
  $stmt = $link->prepare($sql);
  $stmt->bindParam(':author', $calcul_author);
  $stmt->bindParam(':calcul', $calcul);
  $stmt->bindParam(':Date', $today);
  $stmt->execute();
  //$response = $stmt->fetch();

  echo 'success';
} else {
  echo 'missing variables ';
  print_r($params);
}

function test() {

}

?>
