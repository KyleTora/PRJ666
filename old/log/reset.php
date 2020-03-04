<?php
session_start();
$conn = mysqli_connect("mymysql.senecacollege.ca", "prj666_201a06", "rfLG@8559", "prj666_201a06");


    $email = $_POST['email'];
    $result = mysqli_query($conn,"SELECT * FROM User where email='" . $email . "'");
    $row = mysqli_fetch_assoc($result);
	$fetch_user_id=$row['user_id'];
	$email_id=$row['email'];
	if($email==$email_id) {
                $to = $email;
                $subject = "Reset Password";
                $txt = " Click the link to reset your password: http://myvmlab.senecacollege.ca:6897/changePassword.php ";
                $headers = "From: Recipe 6";
                
                if(mail($to,$subject,$txt,$headers)){
                    echo "email sent to $email ";
                    $_SESSION['error'] = 'Login was Successful!';
                    header('Location: /signIn.html');
                }else{
                    echo 'something went wrong';
                }
            }
				else{
                    echo 'invalid userid';
                    header('Location: /resetPassword.html?error=1');
				} 

