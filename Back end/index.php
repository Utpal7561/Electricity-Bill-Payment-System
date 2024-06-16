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

            $user_name=$user->name;
            $user_email=$user->email;
            $user_consumer_id=$user->consumer_no;
            $user_phone=$user->phone;
            $user_password=$user->password;
            $user_uuid=$user->uuid;
            $user_status=0;
            // $currentDateTime = date("Y-m-d H:i:s"); // Format: YYYY-MM-DD HH:MM:SS
            // echo "Current date and time is: " . $currentDateTime;

            if($user_name && $user_email && $user_phone && $user_password && $user_uuid && $user_consumer_id){
            $sql= "INSERT INTO users(id, consumer_id, mobile_number, password, status, uuid, email, name) 
            VALUES(null, :consumer_no, :phone, :password, :status, :uuid, :email, :name)"; 

            $stmt = $conn->prepare($sql);
            $stmt->bindParam( ':consumer_no' , $user->consumer_no);
            $stmt->bindParam( ':phone', $user->phone);
            $stmt->bindParam( ':password', $user->password);
            // $stmt->bindParam( ':created_at', $user->$currentDateTime);
            $stmt->bindParam( ':name' , $user->name);
            $stmt->bindParam( ':status', $user_status);
            $stmt->bindParam( ':uuid' , $user->uuid);
            $stmt->bindParam( ':email' , $user->email);
            $stmt->bindParam( ':name' , $user->name);
            
            
           
           
    
                if($stmt->execute()) {
                    $response=['status'=>200,'msg'=> 'Successfully Register'];
                    $mail = new PHPMailer();
                    try {
                        //Server settings
                        //$mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
                        $mail->isSMTP();                                            //Send using SMTP
                        $mail->Host       = 'smtp.gmail.com';                     //Set the SMTP server to send through
                        $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
                        $mail->Username   = '';                     //SMTP username
                        $mail->Password   = '';
                        $mail->SMTPSecure = 'ssl';                            //SMTP password
                        //$mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
                        $mail->Port       = 465;
                        $mail->SMTPDebug  = 2;                              //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
        
                        //Recipients
                        $mail->setFrom('mimrangsa@gmail.com', 'MECL');
                        $mail->addAddress($user->email, 'Student');     //Add a recipient
                        //$mail->addAddress('ellen@example.com');               //Name is optional
                        $mail->addReplyTo('no-replay@gmail.com', 'No-Replay');
                        //$mail->addCC('cc@example.com');
                        //$mail->addBCC('bcc@example.com');
        
                        //Attachments
                        // $mail->addAttachment('/var/tmp/file.tar.gz');         //Add attachments
                        // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name
        
                        //Content
                        $mail->isHTML(true);                                  //Set email format to HTML
                        $mail->Subject = "Email verification ";
                        $mail->Body    = "Hi, $user->name.<b>Click here to activate your account<b>
                            <h1> Verification code is : $user->uuid<h1/>
                             http://localhost/mecl/user/activation.php?token=$user->uuid";
                        $mail->AltBody = 'This is a email verification from MECL';
        
                        $mail->send();
                        // echo 'Message has been sent';  their can be only one echo while returning. very very import 
                        // $d = [];
                        //      $d['status'] = true;
                        //      $d['msg'] = "check you mail to activate your account $user->email";
                        //      echo json_encode($d);
                    }
                    catch (Exception $e) {
                        // echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
                        $d = [];
                        $d['status'] = false;
                        $d['msg'] = "Email Sending Failed!";
                        echo json_encode($d);
                    }
                
                }else{
                    $response=['status'=> 0,'msg'=> 'Check The Details'];
                }
            
            }else{
                $response=['status'=> 0,'msg'=> 'Somthing went wrong'];
            }
            echo json_encode($response);
            break;
        }

?>
