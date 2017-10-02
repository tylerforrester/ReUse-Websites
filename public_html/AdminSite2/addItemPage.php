<!-- Page you are currently taken to by clicking one of the businesses
in allBusinessesPage.php -->

<!-- Redirect user to log in page if not logged in  -->
<?php include("components/loginStuff/checkSession.php"); ?>

<html>
   <head>
      <link rel="stylesheet" type="text/css" href="css/addItemPage.css">
   </head>
   <body>
     <?php
         include("components/naviDraggable.php");
      ?>
        <div class="container" style="padding: 4em">
           <?php include("components/gridComponent.php"); ?>
        </div>
      <script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
      <script src="js/addItemPage.js"></script>
   </body>
</html>
