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
		<!-- Map JS -->
		<script src="../js/mapFunct.js" type="text/javascript"></script>
		<script type="text/javascript">

			function initCategoryMapWrapper() {
				var catName = encodeURI("<?php if(isset($_REQUEST['name'])) {echo $_REQUEST['name'];}?>");
                                var type = encodeURI("<?php if(isset($_REQUEST['type'])) {echo $_REQUEST['type'];}?>");
				
				if(catName == "" && type == "") {
					initCategoryMap();
				}
				else {
					initCategoryMap(catName, type);
				}
			}
			
		</script>
		<script async defer
		src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDiF8JALjnfAymACLHqPAhlrLlUj3y9DTo&callback=initCategoryMapWrapper">
		</script>
		<!-- List JS -->
		<script src="../js/listFunct.js" type="text/javascript"></script>
		<script>
			var catName = encodeURI("<?php if(isset($_REQUEST['name'])) {echo $_REQUEST['name'];}?>");
                        var type = encodeURI("<?php if(isset($_REQUEST['type'])) {echo $_REQUEST['type'];}?>");
			
			addItemList(catName, type);
		</script>
    </body>
</html>
