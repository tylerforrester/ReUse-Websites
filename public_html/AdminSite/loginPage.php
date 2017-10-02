

<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Corvallis Reuse and Repair Directory: Web Portal</title>
  <link href="/Css/bootstrap.css" type="text/css" rel="stylesheet">
  <link href="/Css/customStylesheet.css" type="text/css" rel="stylesheet">
  <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
  <link href='https://fonts.googleapis.com/css?family=Rubik:700' rel='stylesheet' type='text/css'>
  <script src="/js/loginFunct.js"></script>
</head>


<body>

  <!-- Main container -->
  <div class="container-fluid" id="smallCont">

    <!-- logo, left corner -->
    <img src="/img/CSCLogo.png" class="img-thumbnail">
    <div class="row">
      <div class="col-xs-12 col-md-12">

        <hr></hr>


        <!-- Get the user's login information -->
        <form id="loginForm">

          <h3> DATABASE MANAGEMENT PORTAL </h3>
       <div class="form-group">
           <label>Enter your username: </label>
           <input type ="text" class="form-control" Id="username" placeholder="Enter Username">
        </div>
        <div class="form-group">
            <label>Enter your password: </label>
            <input type ="password" class="form-control" Id ="password" placeholder="Password">
        </div>

        <p align="center">
          <!-- Send information to loginCheck function for error handling and ajax call if wrong -->
          <button Id ="submit" type ="submit" class="btn btn-primary" onclick="login(); return false" align="center">Login</button>
        </p>

        </form>



        <!-- Hidden row for displaying login errors -->
        <div class="row">
          <div class="col-xs-12 cold-md-8" Id= "output"></div>
        </div class="row"><!-- end inner row -->
     </div> <!-- end column -->
    </div> <!-- end row -->

    <hr></hr>

  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
  <script src="/js/bootstrap.min.js"></script>

</body>
</html>
