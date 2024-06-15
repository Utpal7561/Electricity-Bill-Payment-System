<?php
error_reporting(E_ALL);
ini_set("display_errors",1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

include('DbConnect.php');
$objDb = new DbConnect;
$conn=$objDb->connect();

// print_r(json_decode(file_get_contents('php://input')));
$method= $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case 'GET':
        $sql="SELECT * FROM jbprtl_position";
        $stmt= $conn->prepare($sql);
        $stmt->execute();
        $positions=$stmt->fetchAll(PDO::FETCH_ASSOC);
        $positions_count=count($positions);
            // echo json_encode($positions_count);
            // echo $users;
            // echo $user_count;
            // $data=array();
            $data=[];
            if($positions_count!==0){
                 foreach ($positions as $x) {
                    $t=[];
                    if($x["status"]==1){
                        $t["id"]= $x["id"];
                        $t["position"]= $x["position"];
                    }
                    $data[]=$t;
                }
            echo json_encode(['position_apply'=>$data]);
             }else{
            $response=['status'=>200,'msg'=> 'Data not Fetch!']; 
            }
            // Check if the query was successful
            // echo json_encode($response);
            break;
    }
?>