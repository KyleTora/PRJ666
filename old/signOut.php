<?php
session_start();
unset($_SESSION["email"]);
unset($_SESSION["id"]);
unset($_SESSION["user"]);
$_SESSION["logged"] = false;

header("Location: /index.html");
?>