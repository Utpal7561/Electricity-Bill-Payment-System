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

        $sql="SELECT * FROM info WHERE  consumer_id=:consumer_id;";
        $stmt= $conn->prepare($sql);
        $stmt->bindParam(':consumer_id',$user->consumer_id);
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
                    $t["consumer_id"]= $x["consumer_id"];
                    $t["category"]= $x["category"];
                    $t["address"]=$x["address"];
                    $t['house_no']=$x['house_no'];
                    $t['meter_no']=$x['meter_no'];   
                    $t['loadKW']=$x['loadKW'];
                    $t['units']=$x['units'];
                    $data[]=$t;
                }
            echo json_encode(['profile_user'=>$data]);
             }else{
            $response=['status'=>200,'msg'=> 'Data not Fetch!']; 
            }
            // Check if the query was successful
            // echo json_encode($response);
            break;
    }
?>