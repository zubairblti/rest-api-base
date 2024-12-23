<?php   
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Method: DELETE");
header("Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With");


include "connect.php";

$data_id = json_decode(file_get_contents("php://input"), true);

$student_id = $data_id['student_id'];

$sql = "DELETE FROM api_table where id= '$student_id'";

if (mysqli_query($conn, $sql)){
    echo json_encode(array("message" => "Record has been Deleted", "status" => true));
}else{
    echo json_encode(array("message" => "Record has been not Deleted", "status" => false));
}

?>