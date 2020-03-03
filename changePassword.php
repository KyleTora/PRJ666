<!DOCTYPE html>
<html>
<head>
<title>Password Change</title>

</head>
<body>
<h2>*NOT DONE*</h2>
<h3 align="center">CHANGE PASSWORD</h3>
<div><?php if(isset($message)) { echo $message; } ?></div>
<form method="post" action="/log/reset.php" align="center">
Enter your email:<br>
<input type="text" name="username"><span id="username" class="required"></span>
<br>
New Password:<br>
<input type="password" name="newPassword"><span id="newPassword" class="required"></span>
<br>
Confirm Password:<br>
<input type="password" name="confirmPassword"><span id="confirmPassword" class="required"></span>
<br><br>
<input type="submit">
</form>
<br>=
<br>
</body>
</html>