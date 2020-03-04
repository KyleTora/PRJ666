<?php

session_start();
if($count ==1){
    $_SESSION['logged'] = true;
    $_SESSION['username'] = $user;
    header("Location: /index.html");
    exit();
}else{
    $_SESSION['logged'] = false;
    header("Location: /signIn.html");
    exit();
}
?>

