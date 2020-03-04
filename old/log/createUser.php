<?php
    session_start();

    //get values from user login
    $user = htmlspecialchars($_POST['username']);
    $pass = htmlspecialchars($_POST['password']);
    $passConfirm = htmlspecialchars($_POST['password2']);
    $email = htmlspecialchars($_POST['email']);

    //connection
    $conn = mysqli_connect("mymysql.senecacollege.ca", "prj666_201a06", "rfLG@8559", "prj666_201a06");

    if(!$conn)
        die("Failed to connect to database");

    $sql = "INSERT INTO User (username, password, email) VALUES('$user', '$pass', '$email')";
    if($pass == $passConfirm){
        if ($conn->query($sql) === TRUE) {

            $email = $_POST['email'];
            $email_id=$row['email'];
            if($email==$email_id) {
                        $to = $email;
                        $subject = "New Account";
                        $txt = " Click the link to login: http://myvmlab.senecacollege.ca:6897/signIn.html";
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
        
        

            header('Location: /signIn.html');
        } else {
            header('Location: /signUp.html');
            //username or password is incorrect
        }
    }else{
        header('Location: /signUp.html');
        //password dont match
    }

    $conn->close();
?>