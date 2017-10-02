<?php
  /**********************************************************************
  *          Session set up
  **********************************************************************/

  /* error check */
  error_reporting(E_ALL);
  ini_set('display_errors', 1);

  /* start session */
  session_start();

?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Corvallis Reuse and Repair Directory: Web Portal</title>
  <link href="../Css/bootstrap.css" rel="stylesheet">
  <link href="../Css/customStylesheet.css" rel="stylesheet">
  <link href="../Css/media.css" rel="stylesheet">
  <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
  <link href='https://fonts.googleapis.com/css?family=Rubik:700' rel='stylesheet' type='text/css'>
  <script src="../js/jquery-1.11.1.min.js"></script>
  <script src="../js/BusFunct.js"></script>
  <script>
  //ONLOAD -- GET requests and checking of session with jQuery
  $(document).ready(function(){
    checkSession();
    displayStates();
  });

</script>
  </head>
  <body>

  <!-- Import Nav bar -->
  <?php include("nav.php"); ?>

  <!-- Main container -->
  <div class="container-fluid">
    <div class="row">
      <div class="col-xs-12 col-md-12">
        <br></br>
        <h3>Add a New Business</h3>
        <hr></hr>
       <form id="addBusiness">
        <div class="form-group">
           <label>Business Name: </label>
           <input type ="text" class="form-control" Id="name" placeholder="Enter Business Name">
        </div> <!-- end formground-->
        <div class="form-group">
            <label>Address: </label>
            <input type ="text" class="form-control" Id ="address" placeholder="Enter Business Address">
        </div><!-- end formgroup -->
        <div class="form-group">
            <label>Address: </label>
            <input type ="text" class="form-control" Id ="address2" placeholder="Enter Business Address">
        </div><!-- end formgroup -->
        <div class="form-group">
            <label>City: </label>
            <input type ="text" class="form-control" Id ="city" placeholder="Enter City">
        </div><!-- end formgroup -->
        <div class="form-group">
          <label>State: </label>
          <div id="state"></div>
        </div><!-- end formgroup -->
        <div class="form-group">
            <label>Zipcode: </label>
            <input type ="text" class="form-control" Id ="zipcode" placeholder="Enter numeric zipcode">
        </div><!-- end formgroup -->
        <div class="form-group">
            <label>Phone Number: </label>
            <input type ="text" class="form-control" Id ="phone" placeholder="Enter Phone Number">
        </div><!-- end formgroup -->
        <div class="form-group">
            <label>Website: </label>
            <input type ="url" class="form-control" Id ="website" placeholder="Enter Website Address">
        </div><!-- end formgroup -->
        <p align="center">
        </br>
          <!-- Send information to loginCheck function for error handling and ajax call if wrong -->
          <button Id ="submit" type ="submit" class="btn btn-primary" onclick="addNewBusiness(); return false" align="center">Add Business</button>
        </p>
        </form>
        <div id="doneHere"></div>
        <ul id="categoriesList">

        </ul>
        <hr></hr>
        <div class="form-group">
        <div>
        </div>
        </div><!-- end formgroup -->
        <!-- Hidden row for displaying login errors -->
        <div class="row">
          <div class="col-xs-12 cold-md-8" Id= "output2"></div>
        </div class="row"><!-- end inner row -->
  </div> <!-- end container-->

  <script src="../js/jquery-1.11.1.min.js"></script>
  <script src="../js/bootstrap.min.js"></script>
  </body>
  <span id="test"></span>
</html>
