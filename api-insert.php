<?php   
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Method: POST");
header("Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With");

include "connect.php";

$data_id = json_decode(file_get_contents("php://input"), true);

$name = $data_id['name'];
$email = $data_id['email'];
$company = $data_id['company'];
$designation = $data_id['designation'];


$sql = "INSERT INTO api_table(name, email, company, designation) VALUES ('$name', '$email', '$company', '$designation')";

if (mysqli_query($conn, $sql)){
    echo json_encode(array("message" => "Data Inserted", "status" => true));
}else{
    echo json_encode(array("message" => "Data Not Inserted", "status" => false));
}

?>