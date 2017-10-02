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
  <link href="../Css/customStylesheet.css" type="text/css"  rel="stylesheet">
  <link href="../Css/media.css" type="text/css" rel="stylesheet">
  <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
  <link href='https://fonts.googleapis.com/css?family=Rubik:700' rel='stylesheet' type='text/css'>
  <script src="../js/jquery-1.11.1.min.js"></script>
  <script src="../js/searchCatFunct.js"></script>
<script>
  $(document).ready(function(){
    checkSession();
    allCategories();
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
        <h3>Search for a Category to Edit or Delete</h3>
        <hr></hr>
        <form class="form-horizontal" role="form" id="edCat">
        <div class="form-group">
           <label class="control-label col-sm-2" for="text">Category name: </label>
           <div class="col-sm-10">
            <input type ="text" class="form-control" Id="searchName" placeholder="Enter Category Name">
            </div>
        </div> <!-- end formground-->

        <p align="center">
          <button Id ="submit" type ="submit" class="btn btn-primary" onclick="searchCategoryByName(); return false" align="center">Search for Category</button>
        </p>
        </form>
        <p align="center">
          <button Id ="submit" type ="submit" class="btn btn-primary" onclick="allCategories(); return false" align="center">View all Categories</button>
        </p>


         <!-- Table is created when button is hit -->
 <div id="table-wrapper">
   <div id="table-scroll">
    <div id="tableHere">
      <table id="table"  class="table table-striped">
         <tbody id="table" ></tbody>
      </table>
    </div>
  </div>
 </div>

        <!-- edit info -->
        <div id= "EditData"></div>
    </div>
    <hr></hr>
    <!-- Hidden row for displaying login errors -->
    <div class="row">
      <div class="col-xs-12 cold-md-8" Id= "output"></div>
    </div class="row"><!-- end inner row -->
  </div> <!-- end row -->
  </div> <!-- end container-->

  <script src="../js/jquery-1.11.1.min.js"></script>
  <script src="../js/bootstrap.min.js"></script>
  </body>
</html>
