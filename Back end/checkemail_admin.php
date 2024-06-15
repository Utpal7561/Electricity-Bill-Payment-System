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

//checking the datas gas recived from frontend ->it ll display in newteok->preview
$method= $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case 'POST':
        $user=json_decode(file_get_contents('php://input'));
        $user_email=$user->email;
        // echo($user_email);

        // email check 
        if($user->email !=""){
            $email_check="SELECT * FROM admin WHERE email='$user_email';";

            $stmt= $conn->prepare($email_check);
            $stmt->execute();
            $users=$stmt->fetchAll(PDO::FETCH_ASSOC);
            $user_count=count($users);

                if($user_count!=0){
                    $response=['status'=>400,'msg'=> 'Username is already taken!'];
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