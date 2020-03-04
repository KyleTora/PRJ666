<?php
    session_start();
    //get values from user login
    $user= htmlspecialchars($_POST['username']);
    $pass = htmlspecialchars($_POST['password']);

    $_SESSION['logged'] = false;

    //connection
    $conn = mysqli_connect("mymysql.senecacollege.ca", "prj666_201a06", "rfLG@8559", "prj666_201a06");

    if(!$conn)
        echo ("Failed to connect to database");
    
    $sql = "SELECT * FROM User WHERE username = '$user' and password = '$pass'";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        // output data of each row
        while($row = mysqli_fetch_assoc($result)) {
            $_SESSION["email"] = $row['email'];
            $_SESSION["user"]= $user;
            $_SESSION["pass"]= $pass;
            $_SESSION["id"]= $row['user_ID'];
            $_SESSION["logged"] = true;
            $_SESSION['message'] = 'Login was Successful!';
            header('Location: /profilePage.php');
        }
    } else {
        $_SESSION["logged"] = false;
        header('Location: /signIn.php');
    }
?> 