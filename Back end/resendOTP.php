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

$method= $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case 'POST':
        $user=json_decode(file_get_contents('php://input'));
        $user_email=$user->email;
        $user_OTP=$user->otp;

        // email check   
        // $user->otp !="" &&   
        if( $user->email != "") {
            $email_check="SELECT * FROM jbprtl_candidates WHERE email1='$user_email';";
            // echo($user_email);

            $stmt= $conn->prepare($email_check);
            $stmt->execute();
            $users=$stmt->fetchAll(PDO::FETCH_ASSOC);
            $user_count=count($users);

                $data=[];
                if($user_count!=0){
                    // fetching the email_code from that praticular email.
                    foreach ($users as $x) {
                        $t=[];
                        $t["email_code"]= $x["email_code"];
                        $data[]=$t;
                    }
                    $emailCode = $data[0]['email_code'];
                    // print_r($emailCode);
                    // .............................................................................
                    $mail = new PHPMailer();
                    try {
                        //Server settings
                        //$mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
                        $mail->isSMTP();                                            //Send using SMTP
                        $mail->Host       = 'smtp.gmail.com';                     //Set the SMTP server to send through
                        $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
                        $mail->Username   = 'ud78764@gmail.com';                     //SMTP username
                        $mail->Password   = 'wrnc ekjx kkvb bazm';
                        $mail->SMTPSecure = 'ssl';                            //SMTP password
                        //$mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
                        $mail->Port       = 465;
                        $mail->SMTPDebug  = 2;                              //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
        
                        //Recipients
                        $mail->setFrom('ud78764@gmail.com', 'ADBU');
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
                        $mail->Subject = "Email Verification";
                        $mail->Body    = "Hi, $user->email.<b>Click here to activate your account<b>
                            <h1> Verification code is : $emailCode<h1/>
                             http://localhost/adbuAPI/user/activation.php?token=$emailCode";
                        $mail->AltBody = 'This is a email verification from assam don bosco university';
        
                        $mail->send();
                        // echo 'Message has been sent';  their can be only one echo while returning. very very import 
                        // $d = [];
                        //      $d['status'] = true;
                        //      $d['msg'] = "check you mail to activate your account $user->email";
                        //      echo json_encode($d);
                        $response=['status'=>400,'msg'=> 'Send successfully check your email !'];
                        // echo json_encode($response);
                    }
                    catch (Exception $e) {
                        // echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
                        // $d = [];
                        // $d['status'] = false;
                        // $d['msg'] = "Email Sending Failed!";
                        // echo json_encode($d);
                        $response=['status'=>400,'msg'=> 'Something went work!'];
                    }

                    // $response=['status'=>400,'msg'=> 'Username is already taken!'];
                    // echo (json_encode($response));
                }else{
                    $response=['status'=>200,'msg'=> 'Invalid OTP!'];     
                } 
                
            }
        else{
            $response=['status'=> 0,'msg'=> 'OTP is empty'];
        }
        echo json_encode($response);
        // print_r($response);
        break;
}  
?>