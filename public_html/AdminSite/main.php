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
  <link href="../Css/bootstrap.css" type="text/css" rel="stylesheet">
  <link href="../Css/customStylesheet.css" type="text/css" rel="stylesheet">
  <link href="../Css/media.css" type="text/css" rel="stylesheet">
  <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
  <link href='https://fonts.googleapis.com/css?family=Rubik:700' rel='stylesheet' type='text/css'>
  <script src="../js/jquery-1.11.1.min.js"></script>
  <script src="../js/mainFunct.js"></script>
  <script>
  //ONLOAD -- GET requests and checking of session with jQuery
  $(document).ready(function(){
    checkSession();
  });
  </script>
  </head>
  <body>

  <!-- Import Nav bar -->
  <?php include("nav.php"); ?>

  <!-- Main container -->
  <div class="container-fluid" id="smallCont">
    <div class="row">
      <div class="col-xs-12 col-md-12">
        <br></br>
        <h3>Database Management Options</h3>
        <hr></hr>
        <form id="decide">
        <div class="form-group">
          <label>Choose Type: </label>
          <select class="form-control" id="choose">
            <option value="Business">Business</option>
            <option value="Category">Category</option>
            <option value="Item">Items</option>
          </select>
        </div>
          <div class="col-xs-12 col-md-6">
            <!-- Button links to appropriate sites-->
             <button Id ="submit" type ="submit" class="btn btn-default btn-lg" onclick="addRoute(); return false" align="center">Add to Selected</button>
          </div>
          <div class="col-xs-12 col-md-6">
             <button Id ="submit" type ="submit" class="btn btn-default btn-lg" onclick="EditRoute(); return false" align="center">Modify or Delete From Selected</button>
          </div>
        </div> <!-- end form group -->
      </div> <!-- end form -->
      <div class="col-xs-12 col-md-12">
        <hr></hr>
          <div class="filler"></div>
      </div>
    </div> <!-- end row -->
  </div> <!-- end container-->

  <script src="../js/jquery-1.11.1.min.js"></script>
  <script src="../js/bootstrap.min.js"></script>
  </body>
</html>
