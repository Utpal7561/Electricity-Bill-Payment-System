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
        $user_password=$user->password;

        // email check 
        if($user->email !="" && $user->password != "") {
            $email_check="SELECT * FROM users WHERE email='$user_email';";
            // echo($user_email);

            $stmt= $conn->prepare($email_check);
            $stmt->execute();
            $users=$stmt->fetchAll(PDO::FETCH_ASSOC);
            $user_count=count($users);

                if($user_count!=0){
                    $user_name="";
                    $user_email="";
                    $user_consumer_id="";
                    foreach ($users as $x) {
                        $user_name=$x['name'];
                        $user_email=$x['email'];
                        $user_consumer_id=$x['consumer_id'];
                        // $user_id=$x['jbprtl_candidates_id'];
                        if($x['password']==$user->password && $x['status']==1){
                            $response=['status'=>400,'msg'=> 'Login Successful!','name'=>$user_name,'email'=>$user_email,'consumer_id'=> $user_consumer_id];
                        }else{
                            $response=['status'=>200,'msg'=> 'Invalid Login Details']; 
                        }
                    }
                }else{
                    $response=['status'=>200,'msg'=> 'Invalid Login Details!'];     
                } 
                
            }
        else{
            $response=['status'=> 0,'msg'=> 'Email is empty'];
        }
        echo json_encode($response);
        break;
}  

?>