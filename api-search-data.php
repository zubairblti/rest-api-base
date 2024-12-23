<?php   
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Method: GET");
header("Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With");


include "connect.php";

$data = json_decode(file_get_contents("php://input"), true);

$searchquery = $data['search'];

$sql = "SELECT * FROM api_table where name like '%$searchquery%' OR email like '%$searchquery%' OR company like '%$searchquery%' OR designation like '%$searchquery%'";

$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0){
    $response = mysqli_fetch_all($result, MYSQLI_ASSOC);
  echo json_encode($response);
}else{
    echo json_encode(array("message" => "Search not found", "status" => false));
}

?>