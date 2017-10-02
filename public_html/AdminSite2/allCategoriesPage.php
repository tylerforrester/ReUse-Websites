<!-- Redirect user to log in page if not logged in  -->
<?php include("components/loginStuff/checkSession.php"); ?>


<!-- Page to view a grid/list of all categories. -->
</thead>
</thead>

<html>
   <head>
      <meta charset="UTF-8">
      <title>All Categories</title>
      <link rel="stylesheet" type="text/css" href="css/allCategoriesPage.css">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
   </head>
   <body>
      <?php include("components/naviDraggable.php"); ?>
      <div class="container" style="padding: 4em">
         <?php include("components/gridComponent.php"); ?>
      </div>
   </body>
   <script src="js/allCategoriesPage.js" type="text/javascript"></script>
</html>
