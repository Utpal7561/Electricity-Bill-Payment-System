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
        $user_bill_no=$user->bill_no;
        $user_OTP=$user->otp;

        // CHECK EMAIL AND OTP
        if($user->otp !="" && $user->bill_no != "") {
            $bill_check="SELECT * FROM bill_data WHERE bill_no='$user_bill_no';";

            $stmt= $conn->prepare($bill_check);
            $stmt->execute();
            $users=$stmt->fetchAll(PDO::FETCH_ASSOC);
            $user_count=count($users);

                if($user_count!=0){
                    foreach ($users as $x) {
                        // echo $x['pasword'] . '<br>';
                        // echo $x['status'] . '<br>';
                        if($x['bill_no']==$user->bill_no && $x['otp']==$user->otp){

                            // UPDATE Customers
                            // SET ContactName = 'Alfred Schmidt', City= 'Frankfurt'
                            // WHERE CustomerID = 1;

                            $active = 0;
                            $sql = "UPDATE bill_data SET status = 1 WHERE bill_no = '$user_bill_no';";                                         
                            $update = $conn->prepare($sql);
                            $update->execute();

                            $response=['status'=>200,'msg'=> 'OTP has been verified successfully!'];
                        }else{
                            $response=['status'=>400,'msg'=> 'OTP Invalid']; 
                        }
                    }
                }else{
                    $response=['status'=>400,'msg'=> 'Invalid OTP!'];     
                } 
            }
        else{
            $response=['status'=> 400,'msg'=> 'OTP is empty'];
        }
        echo json_encode($response);
        break;
}  
?>