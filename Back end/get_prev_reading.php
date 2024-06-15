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
        $user_consumer_id=$user->consumer_number;
        // echo $user_consumer_id;
        // email check 
        if($user->consumer_number !="") {
            //checking user
            $data_check_users="SELECT * FROM users WHERE consumer_id='$user_consumer_id';";
            $stmt_users= $conn->prepare($data_check_users);
                $stmt_users->execute();
                $user=$stmt_users->fetchAll(PDO::FETCH_ASSOC);
                $user_count=count($user);
            if($user_count!=0){
                //checking users of bill_data
                $data_check="SELECT * FROM bill_data WHERE consumer_id='$user_consumer_id' ORDER BY bill_no DESC LIMIT 1 ;";
                $stmt= $conn->prepare($data_check);
                $stmt->execute();
                $users=$stmt->fetchAll(PDO::FETCH_ASSOC);
                $users_count=count($users);
                if($users_count!=0){
                    $user_prev_reading="";
                    $user_consumer_id="";
                    $current_reading="";
                    foreach ($users as $x) {
                        $user_consumer_id=$x['consumer_id'];
                        $user_prev_reading=$x['previous_reading'];
                        $current_reading=$x['current_reading'];

                        if($user_prev_reading==0){
                            $response=['status'=>200,'msg'=> 'Successful generated!','consumer_id'=>$user_consumer_id,'current_reading'=>$current_reading,'prev_reading'=>$user_prev_reading];
                        }
                        else{
                            $response=['status'=>200,'msg'=> 'Successful generated!','consumer_id'=>$user_consumer_id,'current_reading'=>$current_reading,'prev_reading'=>$user_prev_reading];
                        }
                    }
                    // OUTSIDE THE LOOP
                    // $response=['status'=>200,'msg'=> 'Successful generated!','consumer_id'=>$user_consumer_id,'current_reading'=>$current_reading,'prev_reading'=>$user_prev_reading];
                }//IF NEW USER PREV READING IS 0
                else{
                    $response=['status'=>200,'msg'=> 'New bill generated succesfully','consumer_id'=>$user_consumer_id,'current_reading'=>0,'prev_reading'=>0];     
                }
            }
        }else{
            $response=['status'=> 400,'msg'=> 'Consumer number is invalid'];
        }
        echo json_encode($response);
        break;
}  

?>