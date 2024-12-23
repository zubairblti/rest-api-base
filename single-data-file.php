<?php   
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

include "connect.php";

$data_id = json_decode(file_get_contents("php://input"), true);

$student_id = $data_id['student_id'];

$sql = "SELECT * FROM api_table where id= '$student_id'";

$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0){
  $data = mysqli_fetch_all($result, MYSQLI_ASSOC);
  echo json_encode($data);
}else{
    echo json_encode(array("message" => "No data found", "status" => false));
}

?>