<?php session_start();?>
<!DOCTYPE html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="https://code.jquery.com/jquery-3.3.1.js"
        integrity="sha256-2Kok7MbOyxpgUVvAk/HJ2jigOSYS2auK4Pfzbm7uH60=" crossorigin="anonymous">
        </script>


    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <link href="public/css/userEditProfile.css" rel="stylesheet" type="text/css" media="all" />
    <title>Recipe 01 - Group 06</title>
    
    <script>
    $(function(){
        $("#header").load("header.php");
    });
</script>
</head>

<body>
<div id="header"></div>

<div class="container emp-profile">

    <form method="post">
        <div class="row">
            <div class="col-md-6">
                <div class="profile-head">
                    <h5>
                        <?php echo $_SESSION['user'];?>
                    </h5>
                    <h6>
                        Users Bio
                    </h6>
                    <p class="proile-rating">User Badges : <span>12</span></p>
                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                        <li class="nav-item">
                            <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab"
                                aria-controls="home" aria-selected="true">About</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab"
                                aria-controls="profile" aria-selected="false">Details</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="col-md-2">
                <input type="submit" class="profile-edit-btn" name="btnAddMore" value="Edit Profile" />
            </div>
        </div>
        <div class="row">
            <div class="col-md-4">
                <div class="profile-work">
                    <p>Favorite Recipes</p>
                    <a href="">Recipe 1</a><br />
                    <a href="">Recipe 2</a><br />
                    <a href="">Recipe 3</a>
                    <p>Playlists</p>
                    <a href="">playList1</a><br />
                    <a href="">playList2</a><br />
                    <a href="">playList3</a><br />
                    <a href="">playList4</a><br />
                    <a href="">playList5</a><br />
                </div>
            </div>
            <div class="col-md-8">
                <div class="tab-content profile-tab" id="myTabContent">
                    <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                        <div class="row">
                            <div class="col-md-6">
                                <label>User Id</label>
                            </div>
                            <div class="col-md-6">
                                <p><?php echo $_SESSION['user'];?></p>
                            </div>
                        </div>
       
                        <div class="row">
                            <div class="col-md-6">
                                <label>Email</label>
                            </div>
                            <div class="col-md-6">
                                <p><?php echo $_SESSION['email'];?></p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <label>Phone</label>
                            </div>
                            <div class="col-md-6">
                                <p></p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <label>Badges</label>
                            </div>
                            <div class="col-md-6">
                                <p></p>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                        <div class="row">
                            <div class="col-md-6">
                                <label>raw1</label>
                            </div>
                            <div class="col-md-6">
                                <p>raw1-2</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <label>raw2</label>
                            </div>
                            <div class="col-md-6">
                                <p>raw2-1</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <label>raw3</label>
                            </div>
                            <div class="col-md-6">
                                <p>raw3-1</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <label>raw4</label>
                            </div>
                            <div class="col-md-6">
                                <p>raw4-1</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <label>raw5</label>
                            </div>
                            <div class="col-md-6">
                                <p>raw5-1</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <label>User Bio</label><br />
                                <p>User Bio description</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>
</div>
    </body>