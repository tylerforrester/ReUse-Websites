<?php
	ini_set('display_errors', 'On');
?>
<!DOCTYPE html>
<head>
  <meta charset="utf-8">
  <title>Manage Events</title>
</head>
<body>
<?php //Handle Submissions -- no error handling on POST
	if ($_SERVER['REQUEST_METHOD'] === 'POST') {
		//run the geocoder
		include ('geocoder.php');
		$latlong = bingGeocode($_POST['street'], $_POST['city'], $_POST['state'], $_POST['zip'] );
		
		//report results
		echo "<section>\r\n";
		echo "<h1>Results</h1>\r\n";

		echo "<p>" . $_POST['street'] . "<br>";
		echo $_POST['city'] . ", " . $_POST['state'] . " " . $_POST['zip'] . "</p>";
		
		
		if (isset($latlong['error']) == true) {
			echo "<p>Geodata could not be found!  Check the address.</p>";
			
		} else {
			$lat = $latlong['lat'];
			$long = $latlong['long'];
			echo "<ul><li>Latitude: " . $lat . "</li>\r\n";
			echo "<li>Longitude: " . $long . "</li>\r\n";
			echo "</ul>\r\n";
			echo "<p>Link: <a href='http://maps.google.com/?q=" . $lat . "," . $long . "'>Google Map</a>\r\n";
		}
		
		echo "</section>\r\n";
	}
?>
<section>
<h1>Form</h1>
<form method='POST'>
	<div><label>Street</label><input type='text' name='street'></div>
	<div><label>City</label><input type='text' name='city'></div>
	<div><label>State</label><input type='text' name='state'></div>
	<div><label>ZIP Code</label><input type='text' name='zip'></div>
	<div><input type='submit' value='submit'></div>
</form>
</section>
</body>
</html>
	