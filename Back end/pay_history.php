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
    case 'POST':
        $user=json_decode(file_get_contents('php://input'));
        // $user_email=$user->email;
        $user_consumer_id=$user->consumer_id;
        $user_status=1;
        //AND status=:status;
        $sql="SELECT * FROM bill_data WHERE consumer_id=:consumer_id AND status=:status; ";
        $stmt= $conn->prepare($sql);
        $stmt->bindParam(':consumer_id',$user->consumer_id);
        $stmt->bindParam(':status',$user_status);
        $stmt->execute();
        $users=$stmt->fetchAll(PDO::FETCH_ASSOC);
        $user_count=count($users);
        // echo json_encode($user_count);
            // echo $users;
            // echo $user_count;
            // $data=array();
            $data=[];
            if($user_count!==0){
                 foreach ($users as $x) {
                    $t=[];
                    // $t["category"]= $x["category"];
                    // $t["address"]= $x["address"];
                    // $t["house_no"]= $x["house_no"];
                    // $t["meter_no"]= $x["meter_no"];
                    // $t["loadKW"]= $x["loadKW"];
                    // $t['due_date']=$x['due_date'];

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
            echo json_encode(['bill_info'=>$data]);
             }else{
            $response=['status'=>200,'msg'=> 'Data not Fetch!']; 
            }
            // Check if the query was successful
            // echo json_encode($response);
            break;
    }
?>