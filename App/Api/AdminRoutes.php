<?php
//Routes used by the admin portal to change or view the database.

/**
   * @api {get} /
   * @apiName Admin Site
   *
 */
$app->get('/admin', function() use ($app) {
  $app->redirect("/AdminSite2/loginPage.php");
});

$app->response->headers->set('Content-Type', 'application/json');
// API group
 	$app->group('/RUapi', function () use ($app) {

	/****************************************************************************
	*				Gets
	****************************************************************************/

    /***
  	 * @api {get} /category/:id
     * @apiName ReUseApp
     * @apiGroup RUapi
     *
	 * @apiParam {Integer} id category unique ID.
     *
	 * @apiSuccess {String} The name of the category corresponding to that ID
	 */
	$app->get('/category/:id', function($id){
		$mysqli = connectReuseDB();

		$id = (int)$mysqli->real_escape_string($id);
		$result = $mysqli->query('SELECT name, id FROM Reuse_Categories WHERE Reuse_Categories.id = '.$id.'');
	    $returnArray = array();
	    while($row = $result->fetch_object()){
	      $returnArray[] = $row;
	    }

	    echo json_encode($returnArray);

	    $result->close();
	    $mysqli->close();
	});


    /**
  	 * @api {get} /states Gets name and ID of all states, returns as JSON string
     *
     * @apiName ReUseApp
	 * @apiGroup RUapi
	 *
	 * @apiSuccess {string[]} name Names of all states are returned
	 * @apiSuccess {integer} id ID of all states
	 */

	$app->get('/states', function() {
		$mysqli = connectReuseDB();

		$result = $mysqli->query('SELECT name, id FROM States');
		$returnArray = array();

	    while($row = $result->fetch_object()){
	      $returnArray[] = $row;
	    }

	    echo json_encode($returnArray);
	    $result->close();
	    $mysqli->close();
	});

    /**
     * GET response that provides a listing of all
     * businesses available in the
     * database and the corresponding ID.
  	 * @api {get} /business
 	 * @apiName ReUseApp
	 * @apiGroup RUapi
	 *
	 * @apiSuccess {String} All names and corresponding ID of businesses in the table
	 */

	$app->get('/business', function() {
		$mysqli = connectReuseDB();

    $result = $mysqli->query("SELECT name, id, address_line_1, address_line_2, state_id, phone, website, city, zip_code FROM Reuse_Locations");

		$returnArray = array();
	    while($row = $result->fetch_assoc()){
	       $returnArray[] = array_map("utf8_encode", $row);
	    }

	    echo json_encode($returnArray);

	    $result->close();
	    $mysqli->close();
	});


    /**
     * GET response that provides a listing of all
     * categories available in the
     * database and the corresponding ID.
     *
     * @api {get} /category Request User information
     * @apiName ReUseApp
	 * @apiGroup RUapi
	 *
	 * @apiSuccess {String} name Name of the category.
	 * @apiSuccess {Integer} id ID of the category.
	 */

	$app->get('/category', function() {
		$mysqli = connectReuseDB();

		$result = $mysqli->query('SELECT name, id FROM Reuse_Categories');

	    $returnArray = array();
	    while($row = $result->fetch_object()){
	      $returnArray[] = $row;
	    }

	    echo json_encode($returnArray);

	    $result->close();
	    $mysqli->close();
	});

	/**
	 * @api {get} /items/:id Request item name and category id from item id.
 	 * @apiName ReUseApp
	 * @apiGroup RUapi
	 *
	 * @apiParam {integer} id Item ID.
	 *
	 * @apiSuccess {string} name Name of business.
	 */
	$app->get('/items/:id', function($id){
		$mysqli = connectReuseDB();

		$id = (int)$mysqli->real_escape_string($id);
		$result = $mysqli->query('SELECT name, id, category_id FROM Reuse_Items WHERE Reuse_Items.id = '.$id.'');


		$returnArray = array();
	    while($row = $result->fetch_object()){
	      $returnArray[] = $row;
	    }

	    echo json_encode($returnArray);

	    $result->close();
	    $mysqli->close();
	});

	/**
	 * @api {get} /business/:one Request business info.
 	 * @apiName ReUseApp
	 * @apiGroup RUapi
	 *
	 * @apiParam {String} one  Name of business.
	 *
     *
	 * @apiSuccess {String} name Name of business
	 * @apiSuccess {Integer} id ID of business
     * @apiSuccess {String} Address_line1 Street
     * @apiSuccess {String} address_line2 Street continued
     * @apiSuccess {Integer} state_id State ID where business resides.
     * @apiSuccess {string} phone Phone Number of business.
	 * @apiSuccess {string} website Website URL
	 * @apiSuccess {string} city City
	 * @apiSuccess {string} zip_code Zipcode
	 */
    $app->get('/business/:one', function($one){
		$mysqli = connectReuseDB();

		$result = $mysqli->query("SELECT name, id, address_line_1, address_line_2, state_id, phone, website, city, zip_code FROM Reuse_Locations WHERE Reuse_Locations.id = '$one'");

		$returnArray = array();
	    while($row = $result->fetch_object()){
	      $returnArray[] = $row;
	    }

	    echo json_encode($returnArray);

	    $result->close();
	    $mysqli->close();
	});

	/**
	* Request for business with LIKE name
	* Updated 2/10/2017 - Jeffrey Schachtsick
	*
	*/
	$app->get('/businessSearch/:term', function($term){
		$mysqli = connectReuseDB();

		$result = $mysqli->query("SELECT name, id, address_line_1, address_line_2, state_id, phone, website, city, zip_code FROM Reuse_Locations WHERE Reuse_Locations.name LIKE '%$term%'");

		$returnArray = array();
		while($row = $result->fetch_object()){
			$returnArray[] = $row;
		}

		echo json_encode($returnArray);

		$result->close();
		$mysqli->close();

	});

	/**
	* Request for categories with LIKE name
	* Updated 2/12/2017 - Jeffrey Schachtsick
	*
	*/
	$app->get('/categorySearch/:term', function($term){
		$mysqli = connectReuseDB();

		$result = $mysqli->query("SELECT name, id FROM Reuse_Categories WHERE Reuse_Categories.name LIKE '%$term%'");

		$returnArray = array();
		while($row = $result->fetch_object()){
			$returnArray[] = $row;
		}

		echo json_encode($returnArray);

		$result->close();
		$mysqli->close();

	});

	/**
	* Request for items with LIKE name
	* Updated 2/12/2017 - Jeffrey Schachtsick
	*
	*/
	$app->get('/itemSearch/:term', function($term){
		$mysqli = connectReuseDB();

		$result = $mysqli->query("SELECT name, id, category_id FROM Reuse_Items WHERE Reuse_Items.name LIKE '%$term%'");

		$returnArray = array();
		while($row = $result->fetch_object()){
			$returnArray[] = $row;
		}

		echo json_encode($returnArray);

		$result->close();
		$mysqli->close();

	});


	/**
	 * @api {get} /items/:id Request item name and category id from item id.
 	 * @apiName ReUseApp
	 * @apiGroup RUapi
	 *
	 *
	 * @apiSuccess {string[]} name Name of all businesses in JSON format.
	 */
	$app->get('/items', function() {
		$mysqli = connectReuseDB();

		$result = $mysqli->query('SELECT name, id, category_id FROM Reuse_Items');

		$returnArray = array();
	    while($row = $result->fetch_object()){
	      $returnArray[] = $row;
	    }

	    echo json_encode($returnArray);

	    $result->close();
	    $mysqli->close();
    });


	/**
	* @api {get} /item/:cat Request item names by category id
	* @apiName ReUseApp
	* @apiGroup RUapi
	*
	* @apiParam {integer} cat Category ID
	*
	* @apiSuccess {string[]} name Name of all items in category in JSON format.
	*/
	$app->get('/items/:cat', function($cat){
		$mysqli = connectReuseDB();

		$result = $mysqli->query("SELECT name, id, category_id FROM Reuse_Items WHERE Reuse_Items.category_id = '".$cat."'");

		$returnArray = array();
		while($row = $result->fetch_object()){
			$returnArray[] = $row;
		}

		echo json_encode($returnArray);

		$result->close();
		$mysqli->close();
	});

	/**
	 * @api {get} /businessdocs/:id Request all documents for a given business.
 	 * @apiName ReUseApp
	 * @apiGroup RUapi
	 *
	 *
	 * @apiSuccess {string[]} name All documents in JSON format.
	 */
	$app->get('/businessdocs/:id', function($id) {
		$mysqli = connectReuseDB();

		$result = $mysqli->query("SELECT id, name, URI FROM Reuse_Documents WHERE location_id = '$id'");

		$returnArray = array();

        while($row = $result->fetch_object()){
	      $returnArray[] = $row;
	    }

        echo json_encode($returnArray);

	    $result->close();
	    $mysqli->close();
	});




/************************************************************************************
*					DELETES
*************************************************************************************/

	/**
	 * @api {delete} /business/:id Remove a specific business.
 	 * @apiName ReUseApp
	 * @apiGroup RUapi
	 *
	 * @apiParam {integer} id business ID.
	 */
    $app->delete('/business/:id', function($id){
		$mysqli = connectReuseDB();
		$delID = $mysqli->real_escape_string($id);

		$mysqli->query("DELETE FROM Reuse_Locations_Items WHERE location_id = '$delID'");
        if($mysqli->query("DELETE FROM Reuse_Locations WHERE Reuse_Locations.id ='$delID'"))
            echo "Succesfully Deleted";
        else
            echo "The business was not removed";
		$mysqli->close();


		/* Update Mobile Database */
		reuse_generateXML();
	});

	/**
	 * @api {delete} /item/:id Remove a specific item.
 	 * @apiName ReUseApp
	 * @apiGroup RUapi
	 *
	 * @apiParam {integer} id item ID.
	 */
    $app->delete('/item/:id', function($id){
		$mysqli = connectReuseDB();

        $delID = $mysqli->real_escape_string($id);
		$mysqli->query("DELETE FROM Reuse_Locations_Items WHERE item_id = '$delID'");
		$mysqli->query("DELETE FROM Reuse_Items WHERE Reuse_Items.id ='$delID'");
		$mysqli->close();

		/* Update Mobile Database */
		 reuse_generateXML();
	});

	/**
	 * @api {delete} /category/:id Remove a specific category (associated businesses default to NULL).
 	 * @apiName ReUseApp
	 * @apiGroup RUapi
	 *
	 * @apiParam {integer} id Category ID.
	 */
	$app->delete('/category/:id', function($id){
		$mysqli = connectReuseDB();

		$delID = $mysqli->real_escape_string($id);
		$mysqli->query("DELETE FROM Reuse_Categories WHERE Reuse_Categories.id ='$delID'");
		$mysqli->close();

		/* Update Mobile Database */
		reuse_generateXML();
	});

	/**
	 * @api {delete} /updateBusiness/:one/:id Remove a specific item from a business's catalog.
 	 * @apiName ReUseApp
	 * @apiGroup RUapi
	 *
	 * @apiParam {integer} id Category ID.
	 */
	$app->delete('/updateBusiness/:one/:id', function($one, $id){

		$mysqli = connectReuseDB();

		/* get location id based off name */
		$result = $mysqli->query("SELECT name, id FROM Reuse_Locations");
        while($row = $result->fetch_object()){
            if($row->name == $one){
				$match = $row->id;
			}
		}
		$match2 = $mysqli->real_escape_string($id);

		$mysqli->query("DELETE FROM Reuse_Locations_Items WHERE location_id = '$match' AND item_id = '$match2'");
		$mysqli->close();
	});


	/**
	 * @api {delete} /businessDoc/:id Remove a specific document from a business.
 	 * @apiName ReUseApp
	 * @apiGroup RUapi
	 *
	 * @apiParam {integer} id business ID.
	 */
    $app->delete('/businessDoc/:id', function($id){
		$mysqli = connectReuseDB();
		$delID = $mysqli->real_escape_string($id);

        $result = $mysqli->query("SELECT location_id FROM Reuse_Documents WHERE id = '$delID'");

        while($row = $result->fetch_object()){
	      $returnArray[] = $row;
	    }
    echo json_encode($returnArray);

	$mysqli->query("DELETE FROM Reuse_Documents WHERE id ='$delID'");
    $mysqli->close();
    });

/******************************************************************************************
*				PUTS -- doing it as POSTS with UPDATES to avoid form issues
******************************************************************************************/


	/* Update reuse_database.xml */

	/**
	 * @api {POST} /updateDataForMobile Update reuse_database.xml
 	 * @apiName ReUseApp
	 * @apiGroup RUapi
	 *
	 */
	$app->post('/updateDataForMobile', function(){
		reuse_generateXML();
	});

	/* Update a specific category name */

	/**
	 * @api {PUT} /changeCategory Update the name of a category
 	 * @apiName ReUseApp
	 * @apiGroup RUapi
	 *
	 * @apiParam {string} name New category name.
	 * @apiParam {string} oldName Current category name.
	 *
	 */
	$app->post('/changeCategory', function(){

		$oldName = $_POST['oldName'];
		$name = $_POST['name'];

		$mysqli = connectReuseDB();

		if($oldName != 'undefined' && $name != 'undefined'){
			$mysqli->query("UPDATE Reuse_Categories SET name = '$name' WHERE name = '$oldName'");
		}
		$mysqli->close();

		/* Update Mobile Database */
    //Still breaks the route :(
		reuse_generateXML();
	});


	/**
	 * @api {PUT} /changeItem Update the name of an item
 	 * @apiName ReUseApp
	 * @apiGroup RUapi
	 *
	 * @apiParam {string} name New item name.
	 * @apiParam {string} oldName Current item name.
	 */
    $app->post('/changeItem', function(){

			$oldName = $_POST['oldName'];
			$name = $_POST['name'];
			$cat = $_POST['cat'];

		$mysqli = connectReuseDB();

		if($name != 'undefined' && $oldName != 'undefined'){
			$mysqli->query("UPDATE Reuse_Items SET name = '$name' WHERE name = '$oldName'");
		}
		if($cat != 'undefined' && $oldName != 'undefined'){
			$mysqli->query("UPDATE Reuse_Items SET category_id = '$cat' WHERE name = '$oldName'");
		}
		$mysqli->close();

    echo json_encode("Item Update Success");
		/* Update Mobile Database */
		 reuse_generateXML();
	});

		/* update business */
    /**
  	 * @api {POST} /changeBusiness Update a business, identify by name
 	 * @apiName ReUseApp
	 * @apiGroup RUapi
     *
	 * @apiParam {string} oldName Current name of business.
	 * @apiParam {String} name Name of business
     * @apiParam {String} add1 Street
     * @apiParam {String} add2 Street continued
     * @apiParam {string} phone Phone Number of business.
	 * @apiParam {string} website Website URL
     * @apiParam {string} city City
     * @apiParam {string} state State
	 * @apiParam {string} zip Zipcode
	 */
	$app->post('/changeBusiness', function(){

		$oldName = $_POST['oldName'];
		$name = $_POST['name'];
		$address = $_POST['add1'];
		$address2 = $_POST['add2'];
		$zipcode = $_POST['zip'];
		$city = $_POST['city'];
		$state = $_POST['state'];
		$phone = $_POST['phone'];
		$website = $_POST['website'];
		$latitude = $_POST['latitude'];
		$longitude = $_POST['longitude'];

		$mysqli = connectReuseDB();
		if($state != 'undefined' && $oldName != 'undefined'){
			$mysqli->query("UPDATE Reuse_Locations SET state_id = '$state' WHERE name = '$oldName'");
		}
		if($address != 'undefined' && $oldName != 'undefined'){
			$mysqli->query("UPDATE Reuse_Locations SET address_line_1 = '$address' WHERE name = '$oldName'");
		}
		if($address2 != 'undefined' && $oldName != 'undefined'){
			$mysqli->query("UPDATE Reuse_Locations SET address_line_2 = '$address2' WHERE name = '$oldName'");
		}
		if($phone != 'undefined' && $oldName != 'undefined'){
			$mysqli->query("UPDATE Reuse_Locations SET phone = '$phone' WHERE name = '$oldName'");
		}
		if($zipcode != 'undefined' && $oldName != 'undefined'){
			$mysqli->query("UPDATE Reuse_Locations SET zip_code = '$zipcode' WHERE name = '$oldName'");
		}
		if($city != 'undefined' && $oldName != 'undefined'){
			$mysqli->query("UPDATE Reuse_Locations SET city = '$city' WHERE name = '$oldName'");
		}
		if($website != 'undefined' && $oldName != 'undefined'){
			$mysqli->query("UPDATE Reuse_Locations SET website = '$website' WHERE name = '$oldName'");
		}
		if($name != 'undefined' && $oldName != 'undefined'){
			$mysqli->query("UPDATE Reuse_Locations SET name = '$name' WHERE name = '$oldName'");
		}
		if($latitude != 'undefined' && $oldName != 'undefined'){
			$mysqli->query("UPDATE Reuse_Locations SET latitude = '$latitude' WHERE name = '$oldName'");
		}
		if($longitude != 'undefined' && $oldName != 'undefined'){
			$mysqli->query("UPDATE Reuse_Locations SET longitude = '$longitude' WHERE name = '$oldName'");
		}
		$mysqli->close();

		/* Update Mobile Database */
		reuse_generateXML();

	echo json_encode("success");
	});


/*****************************************************************************************
*			POSTS
******************************************************************************************/

		/* update business */
    /**
  	 * @api {POST} /Business Insert a business, identify by name
 	 * @apiName ReUseApp
	 * @apiGroup RUapi
     *
	 * @apiParam {String} name Name of business
     * @apiParam {String} address Street
     * @apiParam {String} address2 Street continued
     * @apiParam {string} phone Phone Number of business.
	 * @apiParam {string} website Website URL
     * @apiParam {string} city City
     * @apiParam {string} state State
	 * @apiParam {string} zipcode Zipcode
	 */
    $app->post('/business', function(){

		$name = $_POST['name'];
		if (isset($_POST['address']) && !empty($_POST['address'])){
			$address = $_POST['address'];
		}
		else {
			$address = null;
		}
		if (isset($_POST['address2']) && !empty($_POST['address2'])){
			$address2 = $_POST['address2'];
		}
		else {
			$address2 = null;
		}
		if (isset($_POST['city']) && !empty($_POST['city'])){
			$city = $_POST['city'];
		}
		else{
			$city = null;
		}
		if (isset($_POST['state']) && !empty($_POST['state'])){
			$stateId = $_POST['state'];
		}
		else{
			$stateId = 37; //Oregon
		}
		if (isset($_POST['zipcode']) && !empty($_POST['zipcode'])){
			$zipcode = $_POST['zipcode'];
		}
		else{
			$zipcode = null;
		}
		if (isset($_POST['phone']) && !empty($_POST['phone'])){
			$phone = $_POST['phone'];
		}
		else {
			$phone = null;
		}
		if (isset($_POST['latitude']) && !empty($_POST['latitude'])){
			$latitude = $_POST['latitude'];
		}
		else{
			$latitude = null;
		}
		if (isset($_POST['longitude']) && !empty($_POST['longitude'])){
			$latitude = $_POST['longitude'];
		}
		else{
			$latitude = null;
		}
		if (isset($_POST['website']) && !empty($_POST['website'])){
			$website = $_POST['website'];
		}
		else {
			$website = null;
		}


		/* Convert state_id to the string it references */
		$mysqli = connectReuseDB();
		if (!($stmt = $mysqli->prepare("SELECT abbreviation FROM  `States` WHERE id = ?"))){
			echo "Prepare failed : (".$mysqli->connect_errno.")".$mysqli->connect_error;
		}

		$stmt->bind_param('i', $stateId);
		$stmt->bind_result($state);
		$stmt->execute();
		$stmt->fetch();

		$stmt->close();
		$mysqli->close();


		/* Geocode address for storage if not set */
		if($latitude == null || $longitude == null){
			$latlong = bingGeocode($address, $city, $state, $zipcode);

			if ($latlong == false) {
				$latitude = null;
				$longitude = null;
			} else {
				$latitude = $latlong['lat'];
				$longitude = $latlong['long'];
			}
		}


		$mysqli = connectReuseDB();


		/* prepare the statement*/
		if (!($stmt = $mysqli->prepare("INSERT INTO Reuse_Locations (name, address_line_1, address_line_2, city, state_id, zip_code, phone, website, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"))){
			echo "Prepare failed : (".$mysqli->connect_errno.")".$mysqli->connect_error;
		}

		/* bind the variables */
		if(!$stmt->bind_param('ssssiissdd', $name, $address, $address2, $city, $stateId, $zipcode, $phone, $website, $latitude, $longitude)){
	 		echo "Binding failed. (".$mysqli->connect_errno.")".$mysqli->connect_error;
	 	}

		/* execute */
		if(!$stmt->execute()){
			echo "Execute failed. (".$mysqli->connect_errno.")".$mysqli->connect_error;
		}

		/* updated */
		echo 1;
		$stmt->close();
		$mysqli->close();

		/* Update Mobile Database */
		reuse_generateXML();
});

    /**
  	 * @api {POST} /category Insert a new category
 	 * @apiName ReUseApp
	 * @apiGroup RUapi
     *
	 * @apiParam {string} name Category name to add
	 */
$app->post('/category', function(){
		$name = $_POST['name'];

		$mysqli = connectReuseDB();


		/* Check to  make sure it's not a duplicate */
		$result = $mysqli->query('SELECT name, id FROM Reuse_Categories');
            while($row = $result->fetch_object()){
                if($row->name == $name){
					$mysqli->close();
				}
			}


		/* prepare the statement*/
		if (!($stmt = $mysqli->prepare("INSERT INTO Reuse_Categories (name) VALUES (?)"))){
			echo "Prepare failed : (".$mysqli->connect_errno.")".$mysqli->connect_error;
		}

		/* bind the variables */
		if(!$stmt->bind_param('s', $name)){
	 		echo "Binding failed. (".$mysqli->connect_errno.")".$mysqli->connect_error;
	 	}

		/* execute */
		if(!$stmt->execute()){
			echo "Execute failed. (".$mysqli->connect_errno.")".$mysqli->connect_error;
		}

		/* updated */
		echo 1;
		$stmt->close();
		$mysqli->close();
});


    /**
  	 * @api {POST} /updateItems Update category item is in
 	 * @apiName ReUseApp
	 * @apiGroup RUapi
     *
	 * @apiParam {Integer} category Category ID item will belong to
	 * @apiParam {string} name Item name to set
	 */
$app->post('/updateItems', function(){
		$category = $_POST['category'];
		$name = $_POST['name'];

		$mysqli = connectReuseDB();

		if($category != 'undefined' && $name != 'undefined'){
			$mysqli->query("UPDATE Reuse_Items SET category_id = '$category' WHERE Reuse_Items.name = '$name'");
		}
		$mysqli->close();
});


    /**
  	 * @api {POST} /updateBusiness Update items sold by a given business
 	 * @apiName ReUseApp
	 * @apiGroup RUapi
     *
	 * @apiParam {string} name Business name to set
	 */
$app->post('/updateBusiness', function(){
		$name = $_POST['name'];

		$mysqli = connectReuseDB();

		/* get location id based off name */
		$result = $mysqli->query("SELECT name, id FROM Reuse_Locations");
        while($row = $result->fetch_object()){
            if($row->name == $name){
				$match = $row->id;
			}
		}
		$mysqli->close();

		// add to joining table
		$mysqli = connectReuseDB();
		/* prepare the statement*/
		if (!($stmt = $mysqli->prepare("INSERT INTO Reuse_Locations_Items (item_id, location_id) VALUES (?, ?)"))){
			echo "Prepare failed : (".$mysqli->connect_errno.")".$mysqli->connect_error;
		}

		/* bind the variables */
		if(!$stmt->bind_param('ii', $item, $match)){
	 		echo "Binding failed. (".$mysqli->connect_errno.")".$mysqli->connect_error;
	 	}

		/* execute */
		if(!$stmt->execute()){
			echo "Execute failed. (".$mysqli->connect_errno.")".$mysqli->connect_error;
		}


		$mysqli->close();

    header("Location: /Site/searchBusiness.php"); /* Redirect browser */
    exit();

});

/* Adding a New Item */

    /**
  	 * @api {POST} /items
 	 * @apiName ReUseApp
	 * @apiGroup RUapi
     *
	 * @apiParam {Integer} cat Category ID item will belong to
	 * @apiParam {string} name Item name to set
	 */
$app->post('/items', function(){

		$name = $_POST['name'];
		$cat = $_POST['cat'];

		$mysqli = connectReuseDB();

		/* Check to  make sure it's not a duplicate */
		$result = $mysqli->query('SELECT name, id FROM Reuse_Items');
            while($row = $result->fetch_object()){
                if($row->name == $name){
					$mysqli->close();
				}
			}


		/* prepare the statement*/
		if (!($stmt = $mysqli->prepare("INSERT INTO Reuse_Items (name, category_id) VALUES (?, ?)"))){
			echo "Prepare failed : (".$mysqli->connect_errno.")".$mysqli->connect_error;
		}

		/* bind the variables */
		if(!$stmt->bind_param('si', $name, $cat)){
	 		echo "Binding failed. (".$mysqli->connect_errno.")".$mysqli->connect_error;
	 	}

		/* execute */
		if(!$stmt->execute()){
			echo "Execute failed. (".$mysqli->connect_errno.")".$mysqli->connect_error;
		}

		/* updated */
		echo 1;
		$stmt->close();
		$mysqli->close();
});


/* Adding a new document to a given location */

    /**
  	 * @api {POST} /addBusinessDoc
 	 * @apiName ReUseApp
	 * @apiGroup RUapi
     *
	 * @apiParam {Integer} cat Category ID item will belong to
	 * @apiParam {string} name Item name to set
	 */
$app->post('/addBusinessDoc', function(){

		$doc_name = $_POST['doc_name'];
		$doc_url = $_POST['doc_url'];
        $business_id =(int)$_POST['business_id'];
		$mysqli = connectReuseDB();
		$trigger = 1;
		/* Check to  make sure it's not a duplicate */
		$result = $mysqli->query('SELECT name, URI FROM Reuse_Documents');
        while($row = $result->fetch_object()){
            if($row->name == $doc_name){
                $mysqli->close();
                echo json_encode("Item already exists, please select a different name.");
                $trigger = 0;
			 }
		}

        if($trigger)
        {

		    /* prepare the statement*/
		    if (!($stmt = $mysqli->prepare("INSERT INTO Reuse_Documents (name, URI, location_id) VALUES (?, ?, ?)"))){
			    echo "Prepare failed : (".$mysqli->connect_errno.")".$mysqli->connect_error;
		    }

		    /* ind the variables */
		    if(!$stmt->bind_param('ssi', $doc_name, $doc_url, $business_id)){
	 		echo "Binding failed. (".$mysqli->connect_errno.")".$mysqli->connect_error;
	    	}

		    /* execute */
		    if(!$stmt->execute()){
			echo "Execute failed. (".$mysqli->connect_errno.")".$mysqli->connect_error;
		    }

		    /* ulpdated */
		    echo  json_encode("Item added succesfully");
		    $stmt->close();
            $mysqli->close();

        }
});

});
?>
