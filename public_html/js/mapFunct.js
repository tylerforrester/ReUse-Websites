var APIBase = "http://localhost/Corvallis-Sustainability-ReUse/public_html/index.php"; //used for local development by Lauren Miller
var APIBase = ""; //used by the live website

// Returns a pin with the passed color, or CSC orange by default. Reference http://stackoverflow.com/questions/7095574/google-maps-api-3-custom-marker-color-for-default-dot-marker/7686977#7686977
function pin(pinColor) {
	if (pinColor === undefined) {
		pinColor = "F89420"; //setting default color to CSC orange
	}
	
	var pin = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
		new google.maps.Size(21, 34),
		new google.maps.Point(0,0),
		new google.maps.Point(10, 34));
	
	return pin;
}

//returns an object with lat and lng as floats
function LatLng(lat, lng) {
	var latLng = {lat: parseFloat(lat), lng: parseFloat(lng)};
	return latLng;
}

//ititializes the map centered on the Corvallis area
function corvallisMap () {
	
	var Corvallis = {lat: 44.569949, lng: -123.278285};
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 11,
		center: Corvallis
	});
	
	return map;
}

//ititializes the map centered on the given lat and lng
function centeredMap (busLat, busLng) {

	var  mapCenter = LatLng(busLat, busLng);
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 11,
		center: mapCenter
	});
	
	return map;
}


//ititializes a marker with latLng, map, pin, busName, busAddress, busCity, busState, busZip
function marker(latLng, map, pin, busName, busAddress, busCity, busState, busZip) {
	var marker = new google.maps.Marker({
		position: latLng,
		map: map,
		icon: pin,
		title: busName,
		street_address: busAddress,
		city_address: busCity + " " + ", " + busState + " " + busZip
		});

	return marker;
}

//adds an info window for a given marker
function addInfoWindow(marker, map) {
	var infoWindow = new google.maps.InfoWindow();
	
	//adding the listener for clicking a marker
	google.maps.event.addListener(marker, 'click', function(event) {
		//closing other infowindows
		infoWindow.close();
		
		//opening the selected infowindow
		infoWindow.open(map, this);
		infoWindow.setContent("<p><strong><a href=business.php?name=" + encodeURI(this.title) + ">" + this.title + "</a></strong></p><p>" + this.street_address + "<br>" + this.city_address + "</p>"); 
	});
	
	// adding listener so clicking the map closes Info Windows
	google.maps.event.addListener(map, "click", function(event) {
		infoWindow.close();
	});
}

//replaces a single slash with an underscore - a counterpart to underscoreToSlash in WebsiteRoutes.php
function slashToUnderscore(string) {
	var string = string.replace("/", "_");
	return string;
}

//shows the default map, which is one listing all businesses
function showErrorMap() {
	initBusinessMap();
}

//initializes a map with repair, recycling, and other businesses in three colors
function initGeneralMap() {
	
	var map =  corvallisMap();
	
	var reqReuse = new XMLHttpRequest();
	var reqRecycle = new XMLHttpRequest();
	var reqRepair = new XMLHttpRequest();
	
	reqRecycle.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var businesses = JSON.parse(this.responseText);
			
			for(i = 0; i < businesses.length; i++) {
				
				var pinColor = "7C903A";
				var pinImage = pin(pinColor);
				
				var myLatLng = LatLng(businesses[i].latitude, businesses[i].longitude);
				var myMarker = marker(myLatLng, map, pinImage, businesses[i].name, businesses[i].address_line_1, businesses[i].city, businesses[i].abbreviation, businesses[i].zip_code);

				addInfoWindow(myMarker, map);
				
			}
		}
	};
	
	reqRepair.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var businesses = JSON.parse(this.responseText);
			
			for(i = 0; i < businesses.length; i++) {
				
				var pinColor = "47A6B2";
				var pinImage = pin(pinColor);
				
				var myLatLng = LatLng(businesses[i].latitude, businesses[i].longitude);
				
				var myMarker = marker(myLatLng, map, pinImage, businesses[i].name, businesses[i].address_line_1, businesses[i].city, businesses[i].abbreviation, businesses[i].zip_code);
				addInfoWindow(myMarker, map);
				
			}	
		}
		
	};
	
	reqReuse.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var businesses = JSON.parse(this.responseText);
			
			for(i = 0; i < businesses.length; i++) {
				
				var pinColor = "F89420";
				var pinImage = pin(pinColor);
				
				var myLatLng = LatLng(businesses[i].latitude, businesses[i].longitude);
				
				var myMarker = marker(myLatLng, map, pinImage, businesses[i].name, businesses[i].address_line_1, businesses[i].city, businesses[i].abbreviation, businesses[i].zip_code);
				addInfoWindow(myMarker, map);
				
			}
		}
		
	};

	reqReuse.open("GET", APIBase + "/business/reuseExclusive", true);
	reqReuse.send();
	
	reqRecycle.open("GET", APIBase + "/business/recycleExclusive", true);
	reqRecycle.send();
	
	//reqRepair.open("GET", APIBase + "/business/category/name/Repair%20Items", true);
        reqRepair.open("GET", APIBase + "/business/repairExclusive", true);
	reqRepair.send();

}

//initializes a map with businesses from a given category, or all categories except Repair Items and Recycle if no category name is given
function initCategoryMap(categoryName, type) {
	
	categoryName = slashToUnderscore(categoryName);
		
	var map =  corvallisMap();
	
	var req = new XMLHttpRequest();
	
	req.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var businesses = JSON.parse(this.responseText);
			
			if(businesses.length == 0) {//printing the default error map if no results
				showErrorMap();
				return;
			}
			
			//centering on single business
			if(businesses.length == 1 && businesses[0].latitude && businesses[0].longitude) {
				map = centeredMap (businesses[0].latitude, businesses[0].longitude);
			}
			
			//placing the pins
			for(i = 0; i < businesses.length; i++) {
				
				var pinImage = pin();
				var myLatLng = LatLng(businesses[i].latitude, businesses[i].longitude);
				
				var myMarker = marker(myLatLng, map, pinImage, businesses[i].name, businesses[i].address_line_1, businesses[i].city, businesses[i].abbreviation, businesses[i].zip_code);
				addInfoWindow(myMarker, map);		
			}
		}	
	};
	
	
	if(type === "reuse" && categoryName === undefined || type === "reuse" && categoryName === "") {
		var catURI = APIBase + "/business/reuseExclusive"; 
	}
        else if(type === "repair" && categoryName === undefined || type === "repair" && categoryName === "") {
		var catURI = APIBase + "/business/repairExclusive"; 
	}
	else if (type === "reuse") {
		var catURI = APIBase + "/reuse/business/category/name/" + categoryName; 
	}
        else if (type === "repair") {
		var catURI = APIBase + "/repair/business/category/name/" + categoryName; 
	}
        else{
            initGeneralMap();
        }
	
	req.open("GET", catURI, true);
	req.send();
}

//initializes a map with businesses associated with a given category and item
function initItemMap(categoryName, itemName, type) {
		
	categoryName = slashToUnderscore(categoryName);
	itemName = slashToUnderscore(itemName);
	var map =  corvallisMap();
	
	var req = new XMLHttpRequest();
	
	req.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var businesses = JSON.parse(this.responseText);
			
			if(businesses.length == 0) {//printing the default error map if no results
				showErrorMap();
				return;
			}
			
			//centering on single business
			if(businesses.length == 1 && businesses[0].latitude && businesses[0].longitude) {
				map = centeredMap (businesses[0].latitude, businesses[0].longitude);
			}
			
			for(i = 0; i < businesses.length; i++) {
				
				var pinImage = pin();
				var myLatLng = LatLng(businesses[i].latitude, businesses[i].longitude);
				var myMarker = marker(myLatLng, map, pinImage, businesses[i].name, businesses[i].address_line_1, businesses[i].city, businesses[i].abbreviation, businesses[i].zip_code);

				addInfoWindow(myMarker, map);
				
			}
		}
		
	};

        //selecting all businesses in the Reuse category if none is specified
	if(type === "reuse" && categoryName === undefined && itemName === undefined || type === "reuse" && categoryName === "" && itemName === "") {
		var itemURI = APIBase + "/business/reuseExclusive";
	}
        //selecting all business in repair category
        else if(type === "repair" && categoryName === undefined && itemName === undefined || type === "repair" && categoryName === "" && itemName === "") {
		var itemURI = APIBase + "/business/repairExclusive";
	}
        //if a category is given but not an item, list all businesses associated with a category for reuse or repair
	else if (type == "reuse" && itemName === undefined || type == "reuse" && itemName === "") {
		var itemURI = APIBase + "/reuse/business/category/name/" + categoryName;
	}
        else if (type == "repair" && itemName === undefined || type == "repair" && itemName === "") {
		var itemURI = APIBase + "/repair/business/category/name/" + categoryName;
	}
        //if an item is given but not a category, list all businesses associated with an item for reuse or repair
	else if (type == "reuse" && categoryName === undefined || type == "reuse" && categoryName === "") {
		var itemURI = APIBase + "/reuse/business/item/name/" + itemName;
	}
        else if (type == "repair" && categoryName === undefined || type == "repair" && categoryName === "") {
		var itemURI = APIBase + "/repair/business/item/name/" + itemName;
	}
	else if (categoryName === "Recycle" && itemName === "Recycle") {//if the special Recyce case is used 
		var itemURI = APIBase + "/business/recycleExclusive";
	}
        //if both category and item names are given, list all businesses associated with both for reuse or repair
	else if (type == "reuse" ){
		var itemURI = APIBase + "/reuse/business/category/name/" + categoryName + "/item/name/" + itemName;
	}
        else if (type == "repair" ){
		var itemURI = APIBase + "/repair/business/category/name/" + categoryName + "/item/name/" + itemName;
	}
        // otherwise draw general map
        else{
            initGeneralMap();
        }
	
	req.open("GET", itemURI, true);
	req.send();
}

//initializes a map with a pin for a single business with a given name
function initBusinessMap(busName) {
		
	busName = slashToUnderscore(busName);
	
	var map =  corvallisMap();
	var req = new XMLHttpRequest();
	
	req.onreadystatechange = function() {
		
		if (this.readyState == 4 && this.status == 200) {
			var businesses = JSON.parse(this.responseText);

			
			if (busName === undefined || busName === "") { //if no business name is given, printing multiple businesses
				
				
				if(businesses.length == 0) {//printing the default error map if no results
					showErrorMap();
					return;
				}
				
				//centering on single business
				if(businesses.length == 1 && businesses[0].latitude && businesses[0].longitude) {
					map = centeredMap (businesses[0].latitude, businesses[0].longitude);
				}
				
				//placing the pins
				for(i = 0; i < businesses.length; i++) {
					
					var pinImage = pin();
					var myLatLng = LatLng(businesses[i].latitude, businesses[i].longitude);
					var myMarker = marker(myLatLng, map, pinImage, businesses[i].name, businesses[i].address_line_1, businesses[i].city, businesses[i].abbreviation, businesses[i].zip_code);
					
					addInfoWindow(myMarker, map);
				}
				
			}
			else {//if a business name is given, showing that business
			
				if(businesses === null) {//printing the default error map if no results
					showErrorMap();
					return;
				}
			
				//centering on single business
				if(businesses.latitude && businesses.longitude) {
					map = centeredMap (businesses.latitude, businesses.longitude);
				}
				
				//placing the pin
				var pinImage = pin();
				var myLatLng = LatLng(businesses.latitude, businesses.longitude);
				var myMarker = marker(myLatLng, map, pinImage, businesses.name, businesses.address_line_1, businesses.city, businesses.abbreviation, businesses.zip_code);
				
				addInfoWindow(myMarker, map);
			}
			
			
			
		}
	};

	
	if (busName === undefined || busName === "") { //if no business name is given, showing all businesses
		var busURI = APIBase + "/business";
		
	}
	else {//if a business name is given, show that business
		var busURI = APIBase + "/business/name/" + busName;
	}
	
	
	req.open("GET", busURI, true);
	req.send();
}



  
  
  
