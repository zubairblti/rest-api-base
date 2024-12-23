<?php   
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Method: PUT");
header("Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With");

include "connect.php";

$data_id = json_decode(file_get_contents("php://input"), true);

$id = $data_id['id'];
$name = $data_id['name'];
$email = $data_id['email'];
$company = $data_id['company'];
$designation = $data_id['designation'];


$sql = "Update api_table SET name='$name', email='$email', company='$company', designation='$designation' WHERE id='$id'";

if (mysqli_query($conn, $sql)){
    echo json_encode(array("message" => "Data Updated", "status" => true));
}else{
    echo json_encode(array("message" => "Data Not Updated", "status" => false));
}

?>