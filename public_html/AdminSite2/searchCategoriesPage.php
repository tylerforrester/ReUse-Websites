<!-- Redirect user to log in page if not logged in  -->
<?php include("components/loginStuff/checkSession.php"); ?>

<?php
    $search_term = $_GET['term'];
?>

<!-- Get the search_term and store it to run the search -->
<script type="text/javascript">
    var search_term = "<?php echo $search_term; ?>";
</script>

<!-- Page to view a grid/list of all businesses, possibly do something with
draggable in javascript by mapping where one of its icons was clicked
to where on the page a certain list item is, that would be cool. -->

<html>
<head>
    <meta charset="UTF-8">
    <title>Search Categories</title>
    <link rel="stylesheet" type="text/css" href="css/searchCategoriesPage.css">
    <!-- To be device responsive: -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
<?php include("components/naviDraggable.php"); ?>
<div class="container" style="padding: 4em">
    <?php include("components/gridComponent.php"); ?>
</div>
<script src="js/searchCategoriesPage.js" type="text/javascript"></script>
</body>
</html>