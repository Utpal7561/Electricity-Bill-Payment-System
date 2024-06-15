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
            // echo json_encode(['bill_info'=>$data]);
            $sql_bill="SELECT * FROM bill_data WHERE consumer_id=:consumer_id;";
            $stmt_bill= $conn->prepare($sql_bill);
            $stmt_bill->bindParam(':consumer_id',$user->consumer_id);
            $stmt_bill->execute();
            $users_bill=$stmt_bill->fetchAll(PDO::FETCH_ASSOC);
            $user_count_bill=count($users_bill);
            if($user_count_bill!==0){
                foreach ($users_bill as $x) {
                    $t=[];
                    $t["bill_no"]= $x["bill_no"];
                    $t["consumer_id"]= $x["consumer_id"];
                    $t["current_reading"]= $x["current_reading"];
                    $t["previous_reading"]= $x["previous_reading"];
                    $t["units"]= $x["units"];
                    $t["energy_charge"]= $x["energy_charge"];
                    $t["fixed_price"]= $x["fixed_price"];
                    $t["electricity_duty"]= $x["electricity_duty"];
                    $t["total_bill"]= $x["total_bill"];
                    $t["date"]= $x["date"];
                    $t["status"]= $x["status"];
                    $data[]=$t;
                }
              echo json_encode(["status"=>200,'bill_data'=>$data,'msg'=>"Data  succesfully",]);
            }else{
                $response=['status'=>200,'msg'=> 'Data not fetch of bill data!']; 
            }
            // Check if the query was successful
            // echo json_encode($response);
            break;
        }
            
    
?>