<!-- Page you are currently taken to by clicking one of the businesses
in allBusinessesPage.php -->

<!-- Redirect user to log in page if not logged in  -->
<?php include("components/loginStuff/checkSession.php"); ?>

<html>
   <head>
      <link rel="stylesheet" type="text/css" href="css/addBusinessPage.css">
      <link type="text/css" rel="stylesheet" href="components/img-comp-img/foundation-icons/foundation-icons.css">
      <link href="https://fonts.googleapis.com/css?family=Arima+Madurai|Kumar+One" rel="stylesheet">

   </head>
   <body>
     
      <span id="backBtn">
      <div class="center menu">
        <div class="item ui-draggable ui-draggable-handle" style="background-color: rgb(162, 222, 208);">
          <i class="fi-arrow-left"> </i>
        </div>
      </div>
    </span>

        <div class="container" style="padding: 4em">
           <?php include("components/gridComponent.php");?>
        </div>

      <script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
      <script src="https://code.jquery.com/ui/1.12.0/jquery-ui.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/1.0.0/anime.js"></script>
      <script src="js/addBusinessPage.js"></script>
   </body>
</html>
