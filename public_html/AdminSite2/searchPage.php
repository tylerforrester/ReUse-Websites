<!-- Adding searchPage.php as part of the task from Reticulum Team, Winter 2017 -->
<!-- Author: Jeffrey Schachtsick -->
<!-- Source: Rumba Team, Fall 2016 -->
<!-- Redirect user to log in page if not logged in  -->
<?php include("components/loginStuff/checkSession.php"); ?>

<!-- Page to view a grid/list of all businesses, possibly do something with
draggable in javascript by mapping where one of its icons was clicked
to where on the page a certain list item is, that would be cool. -->

<html>
<head>
    <meta charset="UTF-8">
    <title>Search</title>
    <link rel="stylesheet" type="text/css" href="css/searchPage.css">
    <link type="text/css" rel="stylesheet" href="components/img-comp-img/foundation-icons/foundation-icons.css">
    <link href="https://fonts.googleapis.com/css?family=Arima+Madurai|Kumar+One" rel="stylesheet">
    <!-- To be device responsive: -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    <?php include("components/naviDraggable.php"); ?>
    <div class="container" style="padding: 4em">
        <?php include("components/gridComponent.php"); ?>
    </div>
    <script src="js/searchPage.js" type="text/javascript"></script>
</body>
</html>
