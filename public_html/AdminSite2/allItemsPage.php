<!-- Redirect user to log in page if not logged in  -->
<?php include("components/loginStuff/checkSession.php"); ?>


<!-- Page to view a grid/list of all categories. -->
</thead>
</thead>

<html>
   <head>
      <meta charset="UTF-8">
      <title>All Items</title>
      <link rel="stylesheet" type="text/css" href="css/allItemsPage.css">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
   </head>
   <body>
      <?php include("components/naviDraggable.php"); ?>
      <div class="container" style="padding: 4em">
        <?php include("components/gridComponent.php"); ?>
      </div>
      <script src="js/allItemsPage.js" type="text/javascript"></script>
   </body>
</html>
