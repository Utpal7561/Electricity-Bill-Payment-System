<?php
error_reporting(E_ALL);
ini_set("display_errors",1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

include('DbConnect.php');
$objDb = new DbConnect;
$conn=$objDb->connect();
// var_dump($conn);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;


require './PHP_Mailer/PHPMailer-master/src/Exception.php';
require './PHP_Mailer/PHPMailer-master/src/PHPMailer.php';
require './PHP_Mailer/PHPMailer-master/src/SMTP.php';

// print_r(json_decode(file_get_contents('php://input')));

//checking the datas gas recived from frontend ->it ll display in newteok->preview
$method= $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case 'POST':
            $user=json_decode(file_get_contents('php://input'));
            // echo $user->email;
            // echo(gettype($user));
            $consumer_number=$user->data->consumer_number;
            $current_reading=$user->data->current_reading;
            $elect_charge=$user->data->elect_charge;
            $energy_charge=$user->data->energy_charge;
            $fix_charge=$user->data->fix_charge;
            $prev_reading=$user->data->prev_reading;
            $total_bill=$user->data->total_bill;
            $total_unit=$user->data->units;
            $user_status=0;
            $currentDateTime = date("Y-m-d H:i:s"); // Format: YYYY-MM-DD HH:MM:SS
            // echo "Current date and time is: " . $currentDateTime;

            if($consumer_number && $current_reading && $elect_charge && $energy_charge && $fix_charge){
            $sql= "INSERT INTO bill_data(bill_no, consumer_id, current_reading, previous_reading, units, energy_charge, fixed_price, electricity_duty, total_bill, date, status) 
            VALUES(null, :consumer_id, :current_reading, :prev_reading, :total_unit, :energy_charge, :fix_charge, :elect_charge, :total_bill, :date_time, :status)";

            $stmt = $conn->prepare($sql);
            $stmt->bindParam( ':consumer_id' , $consumer_number);
            $stmt->bindParam( ':current_reading', $current_reading);
            $stmt->bindParam( ':elect_charge', $elect_charge);
            // $stmt->bindParam( ':created_at', $user->$currentDateTime);
            $stmt->bindParam( ':energy_charge' , $energy_charge);
            $stmt->bindParam( ':fix_charge', $fix_charge);
            $stmt->bindParam( ':prev_reading' , $prev_reading);
            $stmt->bindParam( ':total_bill' , $total_bill);
            $stmt->bindParam( ':total_unit' , $total_unit);
            $stmt->bindParam( ':date_time' , $currentDateTime);
            $stmt->bindParam( ':status' , $user_status);
            
                if($stmt->execute()) {
                    $response=['status'=>200,'msg'=> 'Successfully Register'];
                }else{
                    $response=['status'=> 400,'msg'=> 'Check The Details'];
                }
            
            }
            else{
                $response=['status'=> 0,'msg'=> 'Somthing went wrong'];
            }
            echo json_encode($response);
            break;
        }

?>