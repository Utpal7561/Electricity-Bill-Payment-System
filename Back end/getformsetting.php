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
        $job_id=$user->job_id;
        $sql="SELECT * FROM jbprtl_frm_edu_dtls WHERE  jbprtl_job_id=:job_id;";
        $stmt= $conn->prepare($sql);
        $stmt->bindParam(':job_id',$user->job_id);
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
                    $t["edu_setting_name"]= $x["edu_setting_name"];
                    $t["jbprtl_lk_edu_degree_id"]= $x["jbprtl_lk_edu_degree_id"];
                    $t["jbprtl_lk_edu_degree_mand"]=$x["jbprtl_lk_edu_degree_mand"];
                    $t['institute']=$x['institute'];
                    $t['specialization']=$x['specialization'];   
                    $t['board_university']=$x['board_university'];
                    $t['year_of_passing']=$x['year_of_passing'];
                    $t['course_duration_yrs']=$x['course_duration_yrs'];   
                    $t['full_marks']=$x['full_marks'];
                    $t['obtained_marks']=$x['obtained_marks'];
                    $t['marks_percentage']=$x['marks_percentage'];
                    $t['min_marks_percentage']=$x['min_marks_percentage'];
                    $t['subjects']=$x['subjects'];
                    $data[]=$t;
                }
            echo json_encode(['form_setting'=>$data]);
             }else{
            $response=['status'=>200,'msg'=> 'Data not Fetch!']; 
            }
            // Check if the query was successful
            // echo json_encode($response);
            break;
    }
?>