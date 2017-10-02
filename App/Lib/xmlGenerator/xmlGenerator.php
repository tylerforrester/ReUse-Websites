<?php
/* Escape problem characters in XML ( '<', '>', '&', ''', '"' ) */
function escapeSpecial($str) {
	$specialChars 	= array("<",	">", 	"&", 		"'", 		'"' );
	$escapeTags 	= array("&lt;",	"&gt;",	"&amp;",	"&apos;",	"&quot;");
	$str = str_replace($specialChars, $escapeTags, $str);
	$str = preg_replace('/[[:^print:]]/', '', $str);
	return $str;
}

/* Generates an XML string from the Reuse project's SQL database */
function reuse_generateXML() {
	
	/* Filename to write XML to */
		// - As $XML_FILENAME	
	require 'xmlGeneratorConfig.php' ;
	
	/* SimpleXML Declaration */
	$sxml = new SimpleXMLElement('<?xml version="1.0" encoding="UTF-8" ?><reuse/>');
	
	/* Revision */	
	$revision = $sxml->addChild("Revision", uniqid() );
	/* Business List*/
	$businessList = $sxml->addChild("BusinessList");
	
	/* connect to database */
	/* OLD	
	include( $DATABASE_CRED_FILE );
	$mysqli = new mysqli($DBUrl, $DBUser, $DBPw, $DBName);
	if ($mysqli->connect_errno) {
		echo "Failed to connect to database (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
		exit();
	}
	*/
	/* NEW */
	$mysqli = connectReuseDB();
	
	/* Query for businesses and all items associated with it */
	//Prepare Statement - Select all businesses and their attributes
	if ( !($stmt = $mysqli->prepare( "SELECT L.id, L.name, L.address_line_1, L.address_line_2, L.city, S.abbreviation, L.zip_code, L.phone, L.website, L.latitude, L.longitude  FROM Reuse_Locations L LEFT JOIN States S ON L.state_id = S.id" ) ) ) {
		echo "Prepare failed: (" . $mysqli->errno . ") " . $mysqli->error;
	}
	
	$stmt->bind_result($Loc_id, $name, $address_line_1, $address_line_2, $city, $state, $zip_code, $phone, $website, $latitude, $longitude);
	$stmt->execute();
	$stmt->store_result();
	
	  //fetch and print results
	while ($stmt->fetch()) {
		//echo "$name \r\n";
		$business = $businessList->addChild("business");
		$business->addChild("id", $Loc_id);
		$business->addChild("name", escapeSpecial($name));
		$contact_info = $business->addChild("contact_info");
			$address = $contact_info->addChild("address");			
				$address->addChild("address_line_1", escapeSpecial($address_line_1));
				$address->addChild("address_line_2", $address_line_2);
				$address->addChild("city", escapeSpecial($city));
				$address->addChild("state", $state);
				$address->addChild("zip", escapeSpecial($zip_code));
			$contact_info->addChild("phone", escapeSpecial($phone));
			$contact_info->addChild("website", escapeSpecial($website));
			$latlong = $contact_info->addChild("latlong");
				$latlong->addChild("latitude", $latitude);
				$latlong->addChild("longitude", $longitude);
		$catList = $business->addChild("category_list");
		
		if ( !(	$stmt2 = $mysqli->prepare( "SELECT DISTINCT CAT.id, CAT.name FROM Reuse_Categories CAT INNER JOIN Reuse_Items ITM ON ITM.category_id = CAT.id INNER JOIN Reuse_Locations_Items L_ITM ON L_ITM.item_id = ITM.id INNER JOIN Reuse_Locations L ON L.id = L_ITM.location_id WHERE L.id = ?") ) ) {
					echo "Prepare failed: (" . $mysqli->errno . ") " . $mysqli->error;
		}
		$stmt2->bind_param('i', $Loc_id);
		$stmt2->bind_result($cat_id, $cat_name);
		$stmt2->execute();
		$stmt2->store_result();
		while ($stmt2->fetch()) {
			//echo "\t $cat_name \r\n";
			$category = $catList->addChild("category");
				$category->addChild("name", $cat_name);
				$subcatlist = $category->addChild("subcategory_list");
			$stmt3 = $mysqli->prepare("SELECT DISTINCT ITM.name FROM Reuse_Categories CAT INNER JOIN Reuse_Items ITM ON ITM.category_id = CAT.id INNER JOIN Reuse_Locations_Items L_ITM ON L_ITM.item_id = ITM.id INNER JOIN Reuse_Locations L ON L.id = L_ITM.location_id WHERE L.id = ? AND CAT.id = ?");
			$stmt3->bind_param('ii', $Loc_id, $cat_id);
			$stmt3->bind_result($subcat_name);
			$stmt3->execute();
			
			$i = 0;
			while ($stmt3->fetch()) {
				//echo "\t\t $subcat \r\n";
				//$i = $i + 1;
				$subcat = $subcatlist->addChild("subcategory", $subcat_name);
			}
			$stmt3->close();
		}
		$stmt2->close();
		
		
		//adding links
		
		$linkList = $business->addChild("link_list");
		
		if ( !(	$stmt4 = $mysqli->prepare( "SELECT DISTINCT link.name, link.URI FROM Reuse_Documents AS link INNER JOIN Reuse_Locations AS loc ON loc.id = link.location_id WHERE loc.id = ?") ) ) {
					echo "Prepare failed: (" . $mysqli->errno . ") " . $mysqli->error;
		}
		$stmt4->bind_param('i', $Loc_id);
		$stmt4->bind_result($link_name, $link_URI);
		$stmt4->execute();
		$stmt4->store_result();
		while ($stmt4->fetch()) {
			$link = $linkList->addChild("link");
				$link->addChild("name", $link_name);
				$link->addChild("URI", $link_URI);
		}
		$stmt4->close();
		
		
	}
	$stmt->close();
	
	$sxml->asXML( $XML_FILENAME );
	return true;
	
}


/* Reads in xml file, converts to a string, and echos it out in text/xml MIME-type */
function echoXMLFile() {
	/* File Location To Read */
	include ( 'xmlGeneratorConfig.php' );
	
	/*output type is xml*/
	header('Content-Type: text/xml');

	
	//create the file if it doesn't exist
	if (file_exists($XML_FILENAME) == false) {
		reuse_generateXML();
		
		if (file_exists($XML_FILENAME) == false) {
			// if the file still doesn't exist, there are problems
			echo "$XML_FILENAME Does not Exist.  Check the configuration of XML Generator";
		}
	}
	
	
	echo file_get_contents( $XML_FILENAME );
	
	return;
}

/* Prints out text/xml MIME-type name of the existing the recycling centers*/
function echoRecycleNameXML() {
	
	/* Database Connection */
	include ( 'xmlGeneratorConfig.php' );
	$mysqli = connectReuseDB();
	
	/*output type is xml*/
	header('Content-Type: text/xml');

	/* SimpleXML Declaration */
	$sxml = new SimpleXMLElement('<?xml version="1.0" encoding="UTF-8" ?><recycle/>');
	
	/* Recycle List*/
	$businessList = $sxml->addChild("recycle_center_names");
	
	
	
	/* Query for recycling center names */
	if ( !($stmt = $mysqli->prepare( "SELECT L.name FROM Reuse_Locations L WHERE L.recycle = 1 ORDER BY L.name;" ) ) ) {
		echo "Prepare failed: (" . $mysqli->errno . ") " . $mysqli->error;
	}
	
	$stmt->bind_result($name);
	$stmt->execute();
	$stmt->store_result();
	
	  //fetch and print results
	while ($stmt->fetch()) {
		
		//adding business names
		$businessList->addChild("name", $name);
	}
	$stmt->close();
	
	echo $sxml->asXML();
	return true;
	
}

/* Prints out text/xml MIME-type information about existing the recycling centers*/
function echoRecycleXML() {
	
	/* Database Connection */
	include ( 'xmlGeneratorConfig.php' );
	$mysqli = connectReuseDB();
	
	/*output type is xml*/
	header('Content-Type: text/xml');

	/* SimpleXML Declaration */
	$sxml = new SimpleXMLElement('<?xml version="1.0" encoding="UTF-8" ?><recycle/>');
	
	/* Recycle List*/
	$businessList = $sxml->addChild("recycle_list");
	
	
	
	/* Query for recycling centers and all items associated with it */
	if ( !($stmt = $mysqli->prepare( "SELECT DISTINCT L.id, L.name, L.address_line_1, L.address_line_2, L.city, S.abbreviation, L.zip_code, L.phone, L.website, L.latitude, L.longitude  FROM Reuse_Locations L LEFT JOIN States S ON L.state_id = S.id WHERE L.recycle = 1 ORDER BY L.name;" ) ) ) {
		echo "Prepare failed: (" . $mysqli->errno . ") " . $mysqli->error;
	}
	
	$stmt->bind_result($Loc_id, $name, $address_line_1, $address_line_2, $city, $state, $zip_code, $phone, $website, $latitude, $longitude);
	$stmt->execute();
	$stmt->store_result();
	
	  //fetch and print results
	while ($stmt->fetch()) {
		
		//adding business details
		$business = $businessList->addChild("business");
		$business->addChild("id", $Loc_id);
		$business->addChild("name", escapeSpecial($name));
		$contact_info = $business->addChild("contact_info");
			$address = $contact_info->addChild("address");			
				$address->addChild("address_line_1", escapeSpecial($address_line_1));
				$address->addChild("address_line_2", $address_line_2);
				$address->addChild("city", escapeSpecial($city));
				$address->addChild("state", $state);
				$address->addChild("zip", escapeSpecial($zip_code));
			$contact_info->addChild("phone", escapeSpecial($phone));
			$contact_info->addChild("website", escapeSpecial($website));
			$latlong = $contact_info->addChild("latlong");
				$latlong->addChild("latitude", $latitude);
				$latlong->addChild("longitude", $longitude);
		
		
		//adding items
		
		$itemList = $business->addChild("services_list");

		if ( !(	$stmt2 = $mysqli->prepare( "SELECT DISTINCT item.name FROM Reuse_Items AS item INNER JOIN Reuse_Locations_Items AS loc_item ON loc_item.item_id = item.id INNER JOIN Reuse_Locations AS loc ON loc.id = loc_item.location_id WHERE loc.id = ?") ) ) {
					echo "Prepare failed: (" . $mysqli->errno . ") " . $mysqli->error;
		}
		$stmt2->bind_param('i', $Loc_id);
		$stmt2->bind_result($item_name);
		$stmt2->execute();
		$stmt2->store_result();
		while ($stmt2->fetch()) {
			$item = $itemList->addChild("item", $item_name);
		}
		$stmt2->close();
		
		//adding links
		
		$linkList = $business->addChild("link_list");
		
		if ( !(	$stmt3 = $mysqli->prepare( "SELECT DISTINCT link.name, link.URI FROM Reuse_Documents AS link INNER JOIN Reuse_Locations AS loc ON loc.id = link.location_id WHERE loc.id = ?") ) ) {
					echo "Prepare failed: (" . $mysqli->errno . ") " . $mysqli->error;
		}
		$stmt3->bind_param('i', $Loc_id);
		$stmt3->bind_result($link_name, $link_URI);
		$stmt3->execute();
		$stmt3->store_result();
		while ($stmt3->fetch()) {
			$link = $linkList->addChild("link");
				$link->addChild("name", $link_name);
				$link->addChild("URI", $link_URI);
		}
		$stmt3->close();
		
	}
	$stmt->close();
	
	echo $sxml->asXML();
	return true;
	
}

/* Prints out text/xml MIME-type information about existing donors*/
function echoDonorXML() {
	
	/* Database Connection */
	include ( 'xmlGeneratorConfig.php' );
	$mysqli = connectReuseDB();
	
	/*output type is xml*/
	header('Content-Type: text/xml');

	/* SimpleXML Declaration */
	$sxml = new SimpleXMLElement('<?xml version="1.0" encoding="UTF-8" ?><donor/>');
	
	/* Recycle List*/
	$donorList = $sxml->addChild("donor_list");
	
	
	
	/* Query for donors */
	if ( !($stmt = $mysqli->prepare( "SELECT DISTINCT donor.name, donor.websiteurl, donor.description FROM Reuse_Donors AS donor ORDER BY donor.name" ) ) ) {
		echo "Prepare failed: (" . $mysqli->errno . ") " . $mysqli->error;
	}
	
	$stmt->bind_result($donorName, $donorURL, $donorDescription);
	$stmt->execute();
	$stmt->store_result();
	
	  //fetch and print results
	while ($stmt->fetch()) {
		
		//adding business details
		$business = $donorList->addChild("donor");
			$business->addChild("name", escapeSpecial($donorName));
			$business->addChild("URL", $donorURL);
			$business->addChild("description", $donorDescription);
	}
	$stmt->close();
	
	echo $sxml->asXML();
	return true;
	
}
?>
