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
  <script src="../js/ItemFunct.js"></script>
<script>

  /************************************************************************
  *         Check Session on body load
  ************************************************************************/
  var x;
  $(document).ready(function(){
    displayStates();
    checkSession();
  });
</script>
  </head>
  <body onload="checkSession()">

  <!-- Import Nav bar -->
  <?php include("nav.php"); ?>

  <!-- Main container -->
  <div class="container-fluid">
    <div class="row">
      <div class="col-xs-12 col-md-12">
        <br></br>
        <h3>Add a New Item</h3>
        <hr></hr>

       <form id="addItem">
        <div class="form-group">
           <label>Item Name: </label>
           <input type ="text" class="form-control" Id="name" placeholder="Enter Item Name">
        </div> <!-- end formground-->

        <p align="center">
        </br>
          <!-- Send information to loginCheck function for error handling and ajax call if wrong -->
          <button Id ="submit" type="submit" class="btn btn-primary" onclick="addNewItem(); return false" align="center">Add Item</button>
        </p>
        </form>
        <hr></hr>
        <div id="tableHere">
          <table class="table table-striped" id="table"></table>
        </div>
        <!-- Hidden row for displaying login errors -->
        <div class="row">
          <div class="col-xs-12 cold-md-8" id= "output2"></div>
        </div class="row"><!-- end inner row -->
  </div> <!-- end container-->

  <script src="../js/jquery-1.11.1.min.js"></script>
  <script src="../js/bootstrap.min.js"></script>
  </body>
</html>
