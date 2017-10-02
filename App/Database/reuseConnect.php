<?php
/* Connect to Database */
function connectReuseDB() {

	/* This file should be kept outside project directory for maximum security */
	/* load configuration file? include (../configure.php) */
	$LOCATION_CREDENTIALS = 'database_cred.php';

	/* Database Login Information
	* ===========================
	* Contains the following:
	* 	$DBUrl = Database Default Host URL
	* 	$DBUser = Username
	* 	$DBPw = Password
	* 	$DBName = Database name to connect to. */
	include($LOCATION_CREDENTIALS);


	$mysqli = new mysqli($DBUrl, $DBUser, $DBPw, $DBName);
	if ($mysqli->connect_errno) {
		echo "Failed to connect to database (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
		exit();
	}

	return $mysqli;
}


?>
