<!-- Redirect user to log in page if not logged in  -->
<?php include("components/loginStuff/checkSession.php"); ?>



<!-- Page to view a grid/list of all businesses, possibly do something with
draggable in javascript by mapping where one of its icons was clicked
to where on the page a certain list item is, that would be cool. -->
</thead>
<!-- Hmm where did this thead nonsense come from... -->
</thead>

<html>
   <head>
      <meta charset="UTF-8">
      <title>All Businesses</title>
      <link rel="stylesheet" type="text/css" href="css/allBusinessesPage.css">
      <!-- To be device responsive: -->
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
   </head>
   <body>
      <?php include("components/naviDraggable.php"); ?>
      <div class="container" style="padding: 4em">
         <?php include("components/gridComponent.php"); ?>
      </div>
      <script src="js/allBusinessesPage.js" type="text/javascript"></script>
   </body>
</html>
