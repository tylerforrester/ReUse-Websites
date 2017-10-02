<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">

		<meta name="description" content="">
		<meta name="author" content="">
		<link rel="icon" href="../img/CSCLogo.png">
		<title>Item - The Corvallis Reuse and Repair Directory</title>

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
			<div class="item-container">
				<div id="item-list-container">
					<p class="side-container-title"></p>
				</div>
				
				<div class="item-map-container">
					<div id="map"></div>
				</div>
			</div>
			
			<?php 
				include 'footer.php';
			?>
		</div> <!-- /container -->
		<!-- Map JS -->
		<script src="../js/mapFunct.js" type="text/javascript"></script>
		<<script>
			function initItemMapWrapper() {
				var cat = encodeURI("<?php if(isset($_REQUEST['cat'])) {echo $_REQUEST['cat'];}?>");
				var item = encodeURI("<?php if(isset($_REQUEST['item'])) {echo $_REQUEST['item'];}?>");
                                var type = encodeURI("<?php if(isset($_REQUEST['type'])) {echo $_REQUEST['type'];}?>");
					
				initItemMap(cat, item, type);
		
			}
		</script>
		<script async defer
		src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDiF8JALjnfAymACLHqPAhlrLlUj3y9DTo&callback=initItemMapWrapper">
		</script>
		<!-- List JS -->
		<script src="../js/listFunct.js" type="text/javascript"></script>
		<script>
			var cat = encodeURI("<?php if(isset($_REQUEST['cat'])) {echo $_REQUEST['cat'];}?>");
			var item = encodeURI("<?php if(isset($_REQUEST['item'])) {echo $_REQUEST['item'];}?>");
			var type = encodeURI("<?php if(isset($_REQUEST['type'])) {echo $_REQUEST['type'];}?>");
            console.log("My category: " + cat);
            console.log("My item: " + item);
            console.log("My type: " + type);

                        
			addBusinessList(cat, item, type);
		</script>
    </body>
</html>
