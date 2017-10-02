<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">

		<meta name="description" content="">
		<meta name="author" content="">
		<link rel="icon" href="../img/CSCLogo.png">
		<title>Recycling Services - The Corvallis Reuse and Repair Directory</title>

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
			<div class="recycle-container">
				<div id="recycle-list-container">
					<p class="side-container-title"></p>
				</div>
				
				<div class="recycle-map-container">
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

			function initItemMapWrapper() {
				var specialValue = "Recycle"; // initItemMap called with "Recycle" is treated as a special case
				initItemMap(specialValue, specialValue);
				
			}
		</script>
		<script async defer
		src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDiF8JALjnfAymACLHqPAhlrLlUj3y9DTo&callback=initItemMapWrapper">
		</script>
		<script src="../js/listFunct.js" type="text/javascript"></script>
		<script>
			var specialValue = "Recycle"; // addBusinessList called with "Recycle" is treated as a special case
			addBusinessList(specialValue, specialValue);
		</script>
    </body>
</html>
