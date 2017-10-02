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
    displayTable();
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
