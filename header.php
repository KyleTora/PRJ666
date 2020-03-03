<?php session_start() ?>
<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    </head>
<body>
	<nav class="navbar navbar-expand-md navbar-dark bg-dark mb-3">
        <div class="container-fluid">
            <a href="/index.html" class="navbar-brand mr-3">Recipe 6ix</a>
            <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarCollapse">
                <div class="navbar-nav">
                    <a href="/browseRecipes.html" class="nav-item nav-link">Browse</a>
                    <a href="/myRecipes.html" class="nav-item nav-link">Recipe</a>
                    <a href="#" class="nav-item nav-link">Search</a>
                </div>
                <div class="navbar-nav ml-auto">
                    <?php   if(isset($_SESSION['id'])){ ?>
                        <a href="/profilePage.php" class="nav-item nav-link">Profile</a>
                        <a href="/signOut.php" class="nav-item nav-link">Sign Out</a>
                           <?php }else{ ?>
                        <a href="/signUp.html" class="nav-item nav-link">Register</a>
                        <a href="/signIn.html" class="nav-item nav-link">Login</a>
                    <?php } ?>

                </div>
            </div>
        </div>    
    </nav>
	


    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
</body>	

</html>	
