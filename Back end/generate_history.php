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
        // $user_consumer_id=$user->consumer_id;
        //AND status=:status;
        // WHERE consumer_id=:consumer_id;
        $sql="SELECT * FROM bill_data;";
        $stmt= $conn->prepare($sql);
        // $stmt->bindParam(':consumer_id',$user->consumer_id);
        // $stmt->bindParam(':status',$user_status);
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
                    $t["bill_no"]= $x["bill_no"];
                    $t["consumer_id"]= $x["consumer_id"];
                    $t["current_reading"]=$x["current_reading"];
                    $t["previous_reading"]= $x["previous_reading"];
                    $t['units']=$x['units'];   
                    $t['energy_charge']=$x['energy_charge'];   
                    $t['fixed_price']=$x['fixed_price']; 
                    $t['electricity_duty']=$x['electricity_duty']; 
                    $t['total_bill']=$x['total_bill'];
                    $t["date"]= $x["date"];
                    $t["status"]= $x["status"];
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