<?php
	
	//For DEBUGGING	
	ini_set('display_errors', 'On');	

		
	/**************************************************************************
	*				Requirements
	**************************************************************************/
	
	require_once '../vendor/autoload.php';

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
    
    $app->get('/test/:cid', function ($cid) use ($app) {
		// query for items with category $cid
		$items = ItemQuery::create()
			->filterByCategory($cid)
			->find();
		
		// set our headers	
		$app->response->headers->set('Content-Type', 'text/html');
		
		// echo start of the html
		echo '<html><body><ul>';
		
		// iterate over each thing returned form the db
		foreach ($items as $item)
		{
			echo '<li>'.$item->getName().'</li>';
		}
		
		// close out the html
		echo '</ul></body></html>';
    });
    
	$app->run();	
?>
