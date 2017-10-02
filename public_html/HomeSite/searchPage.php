<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="../img/CSCLogo.png">
    <title>Category - The Corvallis Reuse and Repair Directory</title>



    <!-- Bootstrap core CSS -->
    <link href="../Css/bootstrap.css" rel="stylesheet">
    <!-- Custom styles for this template -->
    <link href="../Css/jumbotron-narrow.css" rel="stylesheet">
    <!-- Generic Reuse public site styling css -->
    <link href="../Css/publicSite.css" rel="stylesheet">
    <!-- Generic map styling css -->
    <link href="../Css/map.css" rel="stylesheet">
    <!-- Material Design Iconic Font -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/material-design-iconic-font/2.2.0/css/material-design-iconic-font.min.css">
</head>

<body>
<div class="container">
    <?php
				include 'header.php';
			?>
    <div class="category-container">

        <div id="category-list-container">
            <p class="side-container-title"></p>
        </div>

        <div class="category-map-container">
            <div id="map"></div>
        </div>
    </div>

    <?php
				include 'footer.php';
			?>
</div> <!-- /container -->
<!-- Map JS,  Needs effort on map, so if a business shows up on the search with an address, a pin displays location on the map
<script src="../js/mapFunct.js" type="text/javascript"></script>
<script>

    function initCategoryMapWrapper() {
        var search_term = encodeURI("<?php if(isset($_REQUEST['term'])) {echo $_REQUEST['term'];}?>");

        if(search_term == "") {
            initCategoryMap();
        }
        else {
            initCategoryMap(search_term);
        }
    }


</script>
<script async defer
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDiF8JALjnfAymACLHqPAhlrLlUj3y9DTo&callback=initCategoryMapWrapper">
</script> -->
<!-- List JS -->
<script src="../js/searchPage.js" type="text/javascript"></script>
<script>
    var search_term = encodeURI("<?php if(isset($_REQUEST['term'])) {echo $_REQUEST['term'];}?>");
    //console.log(search_term);
    searchTerm(search_term);
    //addItemList(catName);
</script>
</body>
</html>