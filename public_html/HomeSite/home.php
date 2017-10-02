<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">

		<!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
		<meta name="description" content="">
		<meta name="author" content="">
		<link rel="icon" href="../img/CSCLogo.png">
		<title>The Corvallis Reuse and Repair Directory</title>

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
			
			<div class="home-map-container">
				<div id="map"></div>
			</div>


			<div class="row marketing description">

				<div class="col-md-3 home-text">
					<h4>Key</h4>
					<p class="pin-label"><img src="http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|47A6B2" class="pin-icon">Repair Services</p>
					<p class="pin-label"><img src="http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|F89420" class="pin-icon">Organizations Accepting Items for Reuse</p>
					<p class="pin-label"><img src="http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|7C903A" class="pin-icon">Recycling Centers</p>
				</div>

				<div class="col-md-6 home-text">
					<h4>About</h4>
					<p>The purpose of the Corvallis-Area ReUse and Repair Directory is to provide the Corvallis and outlying community a way to easily locate organizations that will
						1) take reusable items that can be sold to the public as used items, donated to low-income citizens, or used for the organization's programs;
						2) take and repair items;
						3) and take recyclable items.</p>
					<p>Donated items should be clean and in good, working condition.</p>
				</div>

				<div class="col-md-3 home-text" id="donor-thanks">
					<h4>Sponsors</h4>
					<p>If you would like to sponsor the Corvallis-Area ReUse and Repair Directory, please <a href="contact.php">let us know</a>. We appreciate your support.</p>
				</div>
			</div>
			
			<?php 
				include 'footer.php';
			?>
		</div> <!-- /container -->
		<!-- Map JS -->
		<script src="../js/mapFunct.js" type="text/javascript" />
		<script></script>
		<script async defer
		src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDiF8JALjnfAymACLHqPAhlrLlUj3y9DTo&callback=initGeneralMap">
		</script>
		<!-- Donor JS -->
		<script src="../js/sponsorsFunct.js" type="text/javascript"></script>
		<script>
			addShortSponsorsThanks();
		</script>
    </body>
</html>
