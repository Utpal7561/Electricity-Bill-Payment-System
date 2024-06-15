<?php
error_reporting(E_ALL);
ini_set("display_errors",1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

include('DbConnect.php');
$objDb = new DbConnect;
$conn=$objDb->connect();
// var_dump($conn);

// print_r(json_decode(file_get_contents('php://input')));
$method= $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case 'POST': 
        $user=json_decode(file_get_contents('php://input'));
        $user_email=$user->email;


        // email check 
        if($user->email !=""){
            $email_check="SELECT * FROM jbprtl_candidates WHERE email1='$user_email';";

            $stmt= $conn->prepare($email_check);
            $stmt->execute();
            $users=$stmt->fetchAll(PDO::FETCH_ASSOC);
            $user_count=count($users);

                if($user_count!=0){
                    $user_email="";
                    $user_phone="";
                    foreach ($users as $x) {
                        $user_email=$x["email1"];
                        $user_phone=$x["phone1"];
                        }
                    $response=['status'=>400,'msg'=> 'Username is already taken!', 'data'=>[$user_email,$user_phone]];

                }else{
                    $response=['status'=>200,'msg'=> 'Succesfully Register!'];     
                } 
                
            }
        else{
            $response=['status'=> 0,'msg'=> 'Email is empty'];
        }
        echo json_encode($response);
        break;
}  
?>