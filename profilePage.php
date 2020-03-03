<?php session_start() ?>
<!DOCTYPE html>
<html>
<head>

    <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
    <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script>
      $(function () {
        $("#header").load("header.php");
      });

      $(document).ready(function(){
        var email, user;
        user = $("#user").val();
      });
    </script>
    <!------ Include the above in your HEAD tag ---------->
    <style>
    body{
      background: -webkit-linear-gradient(left, #f2f2f2, #f5f5f5);
  }
  .emp-profile{
      padding: 3%;
      margin-top: 3%;
      margin-bottom: 3%;
      border-radius: 0.5rem;
      background: #fff;
  }
  .profile-img{
      text-align: center;
  }
  .profile-img img{
      width: 70%;
      height: 100%;
  }
  .profile-img .file {
      position: relative;
      overflow: hidden;
      margin-top: -20%;
      width: 70%;
      border: none;
      border-radius: 0;
      font-size: 15px;
      background: #212529b8;
  }
  .profile-img .file input {
      position: absolute;
      opacity: 0;
      right: 0;
      top: 0;
  }
  .profile-head h5{
      color: #333;
  }
  .profile-head h6{
      color: #0062cc;
  }
  .profile-edit-btn{
      border: none;
      border-radius: 1.5rem;
      width: 70%;
      padding: 2%;
      font-weight: 600;
      color: #6c757d;
      cursor: pointer;
  }

  .proile-bio{
      font-size: 14px;
      color: #818182;
      margin-top: 5%;
  }
  .proile-bio span{
      color: #495057;
      font-size: 12px;
      font-weight: 600;
  }
  .profile-head .nav-tabs{
      margin-bottom:5%;
  }
  .profile-head .nav-tabs .nav-link{
      font-weight:600;
      border: none;
  }
  .profile-head .nav-tabs .nav-link.active{
      border: none;
      border-bottom:2px solid #0062cc;
  }
  .profile-work{
      padding: 14%;
      margin-top: -15%;
  }
  .profile-work p{
      font-size: 12px;
      color: #818182;
      font-weight: 600;
      margin-top: 10%;
  }
  .profile-work a{
      text-decoration: none;
      color: #495057;
      font-weight: 600;
      font-size: 14px;
  }
  .profile-work ul{
      list-style: none;
  }
  .profile-tab label{
      font-weight: 600;
  }
  .profile-tab p{
      font-weight: 600;
      color: #0062cc;
  }
  </style>
</head>

<body>
  <div id="header"></div>

  <div class="container emp-profile">
              <form method="post">
                  <div class="row">
                      <div class="col-md-4">
                          <div class="profile-img">
                              <img src="/image/userPhoto.jfif" alt=""/>
                          
                          </div>
                      </div>
                      <div class="col-md-6">
                          <div class="profile-head">
                                    <h5> <?php echo ($_SESSION['user']) ?> </h5>
                                      </br>
                                      <p class="proile-bio">Bio:  <span>Bio not set yet</span></p>
                              <ul class="nav nav-tabs" id="myTab" role="tablist">
                                  <li class="nav-item">
                                      <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                                  </li>
                                  <li class="nav-item">
                                      <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Skill</a>
                                  </li>
                              </ul>
                          </div>
                      </div>
                      <div class="col-md-2">
                          <input type="submit" class="profile-edit-btn" name="btnAddMore" value="Edit Profile"/>
                      </div>
                  </div>
                  <div class="row">
                      <div class="col-md-4">
                          <div class="profile-work">
                            <p><?php echo ($_SESSION['name']) ?></p>
                              <a href="/myRecipes.html">Recipes</a><br/>
                              <a href="/createPlaylist.html">Playlists</a><br/>
                              <a href="/browseRecipes.html">Favourites</a>
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
                                                <p><?php echo ($_SESSION['user']) ?></p>
                                              </div>
                                          </div>
                                          <div class="row">
                                              <div class="col-md-6">
                                                  <label>Name</label>
                                              </div>
                                              <div class="col-md-6">
                                                <p><?php echo ($_SESSION['user']) ?></p>

                                              </div>
                                          </div>
                                          <div class="row">
                                              <div class="col-md-6">
                                                  <label>Email</label>
                                              </div>
                                              <div class="col-md-6">
                                                <p><?php echo ($_SESSION['email']) ?></p>
                                              </div>
                                          </div>                 
                              </div>
                              <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                          <div class="row">
                                              <div class="col-md-6">
                                                  <label>Experience</label>
                                              </div>
                                              <div class="col-md-6">
                                                  <p>Home Chef</p>
                                              </div>
                                          </div>
                                          <div class="row">
                                              <div class="col-md-6">
                                                  <label>Rating</label>
                                              </div>
                                              <div class="col-md-6">
                                                  <p>#/10</p>
                                              </div>
                                          </div>
                                          <div class="row">
                                              <div class="col-md-6">
                                                  <label>Total Recipes</label>
                                              </div>
                                              <div class="col-md-6">
                                                  <p>21</p>
                                              </div>
                                          </div>
                                          <div class="row">
                                              <div class="col-md-6">
                                                  <label>Badges</label>
                                              </div>
                                              <div class="col-md-6">
                                                  <p>5</p>
                                              </div>
                                          </div>
                                 
                              </div>
                          </div>
                      </div>
                  </div>
              </form>           
          </div>
</body>
</html>