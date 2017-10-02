<?php
	
	//For DEBUGGING	
	ini_set('display_errors', 'On');	

		
	/**************************************************************************
	*				Requirements
	**************************************************************************/
	
	//Framework
	require 'Slim/Slim.php';
	\Slim\Slim::registerAutoloader();

	//functions to facilitate connection to reuse database
		// - connectReuseDB()		<-- Create mysqli object using reuse db creds

    require '../App/Database/reuseConnect.php';

	//functions facilitating XML file generation for mobile
		// - reuse_generateXML()	<-- Produces XML file
		// - echoXMLFile()		<-- Echos file after generation
	require '../App/Lib/xmlGenerator/xmlGenerator.php';
	
	//functions facilitating Bing Geocoder
	require '../App/Lib/BingGeocoder/geocoder.php';

	/**************************************************************************
	*				Routing set up
	***************************************************************************/
	$app = new \Slim\Slim(
		//More debugging
		array( 'debug' => true )
    );

    $routeFiles = (array) glob('../App/Api/*.php');
    foreach($routeFiles as $routeFile) {
            require $routeFile;
    }

    
    $app->response->headers->set('Content-Type', 'application/json');

    $app->get('/hello/:name', function ($name) {
            echo "Hello, $name";
    });

	
	$app->run();	
?>
