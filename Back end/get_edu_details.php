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
        // $job_id=$user->job_id;
        $sql="SELECT * FROM jbprtl_lk_edu_degree";
        $stmt= $conn->prepare($sql);
        // $stmt->bindParam(':job_id',$user->job_id);
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
                    $t["jbprtl_lk_edu_degree_id"]= $x["jbprtl_lk_edu_degree_id"];
                    $t["jbprtl_lk_edu_degree_nm"]= $x["jbprtl_lk_edu_degree_nm"];
                    $t["status"]=$x["status"];
                    $data[]=$t;
                }
            echo json_encode(['edu_setting'=>$data]);
             }else{
            $response=['status'=>200,'msg'=> 'Data not Fetch!']; 
            }
            // Check if the query was successful
            // echo json_encode($response);
            break;
    }
?>