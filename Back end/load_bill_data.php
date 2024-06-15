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
        $user=json_decode(file_get_contents('php://input'));

        $sql="SELECT * FROM bill_data";
        $stmt= $conn->prepare($sql);
        $stmt->execute();
        $users=$stmt->fetchAll(PDO::FETCH_ASSOC);
        $user_count=count($users);
        // echo json_encode($user_count);
            $data=[];
            if($user_count!==0){
                 foreach ($users as $x) {
                    $t=[];
                    $t["bill_no"]= $x["bill_no"];
                    $t["status"]= $x["status"];
                    $t["consumer_id"]= $x["consumer_id"];
                    $t["date"]= $x["date"];
                    $t["status"]= $x["status"];
                    $t["previous_reading"]= $x["previous_reading"];
                    $t["current_reading"]= $x["current_reading"];
                    $t["total_bill"]=$x["total_bill"];
                    $t['units']=$x['units'];  
                    $data[]=$t;
                }
            echo json_encode(['bill_data'=>$data,'status'=>200,'count'=>$user_count]);
             }else{
            $response=['status'=>200,'msg'=> 'Data not Fetch!']; 
            }
            // Check if the query was successful
            // echo json_encode($response);
            break;
    }
?>