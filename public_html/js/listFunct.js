var APIBase = "http://localhost/Corvallis-Sustainability-ReUse/public_html/index.php"; //used for local development by Lauren Miller
var APIBase = ""; //used by the live website


//formats a string of numbers according to conventional styling of phone numbers
function getFormattedPhone(phoneString) {
	var formattedPhone = "";
	
	if(phoneString.length == 7) {
		formattedPhone = phoneString.substring(0, 3) + "-" + phoneString.substring(3, 7);
		
	}
	else if (phoneString.length == 10){
		formattedPhone = "(" + phoneString.substring(0, 3) + ") " + phoneString.substring(3, 6) + "-" + phoneString.substring(6, 10);
		
	}
	else if (phoneString.length == 11){
		formattedPhone = " 1 (" + phoneString.substring(1, 4) + ") " + phoneString.substring(4, 7) + "-" + phoneString.substring(7, 11);
	}
	
	return formattedPhone;
}

//formats a string of numbers according to conventional styling of zip codes
function getFormattedZip(zipString) {
	var formattedZip = "";
	
	if(zipString.length == 5) {
		formattedZip = zipString;	
	}
	else {
		formattedZip = zipString.substring(0, 5) + "-" + "" + zipString.substring(5, phoneString.length);
	}
	
	return formattedZip;
}

//replaces a single slash with an underscore - a counterpart to underscoreToSlash in WebsiteRoutes.php
function slashToUnderscore(string) {
	if(string) {
		var string = string.replace("/", "_");
	}
	
	return string;
}

//adds the page title and  and the list of items to "category-list-container"
function addItemList(catName, type) {
	
	var oldCatName = catName;
	catName = slashToUnderscore(catName);

	//adding the page title
	if(type == "reuse" && catName === undefined || type == "reuse" && catName === "") {
		document.getElementsByClassName("side-container-title")[0].innerHTML = "Items Accepted";
	}
	else if(type == "repair" && catName === undefined || type == "repair" && catName === "") {
		document.getElementsByClassName("side-container-title")[0].innerHTML = "Organizations Repairing " + decodeURI(oldCatName);
		document.title = "Organizations Repairing " + decodeURI(oldCatName);
	}
	else {
		document.getElementsByClassName("side-container-title")[0].innerHTML = "Organizations Accepting " + decodeURI(oldCatName);
		document.title = "Organizations Accepting " + decodeURI(oldCatName);
	}
	
	var req = new XMLHttpRequest();
	
	req.onreadystatechange = function() {
		
		if (this.readyState == 4 && this.status == 200) {
			var items = JSON.parse(this.responseText);
			
			
			if (items.length == 0) { //printing the error message if no results
				
				if(catName === undefined) {
					catName = "";
				}
				
				printErrorMessage("side-container-title", "category-list-container", catName);
				return;
			}
			
			//printing the items
			for(i = 0; i < items.length; i++) {
				
				var listDiv = document.getElementById("category-list-container");
				listDiv.className += " list-group";
				
				//the link
				var link = document.createElement("a");
				link.className = "list-group-item";
				link.className += " list-item-title";
				link.setAttribute('href', "item.php?type=" + type + "&cat=" + oldCatName +"&item=" + encodeURI(items[i].name));
				
				//the item name		
				var itemName = document.createTextNode(items[i].name);
				itemName.className = "list-group-item-heading";
				link.appendChild(itemName);
				
				//the count badge
				var itemCountSpan = document.createElement("span");
				itemCountSpan.className = "badge";
				var itemCount = document.createTextNode(items[i].item_count);
				itemCountSpan.appendChild(itemCount);
				link.appendChild(itemCountSpan);

				listDiv.appendChild(link);
			}
			
		}
	};
	
	//returning all categories if none is specified
	if(type === "reuse" && catName === undefined || type === "reuse" && catName === "") {
		var itemsURI = APIBase + "/item/category/reuseExclusive";
	}
        else if (type === "repair" && catName === undefined || type === "repair" && catName === ""){
            var itemsURI = APIBase + "/item/category/repairExclusive";
        }
        else if (type === "reuse"){
            var itemsURI = APIBase + "/reuse/item/category/name/" + catName; 
        }
        else if (type === "repair"){
            var itemsURI = APIBase + "/repair/item/category/name/" + catName; 
        }
	else {
		var itemsURI = APIBase + "/item/category/name/" + catName;
	}
	
	
	req.open("GET", itemsURI, true);
	req.send();
}


//adds the page title and a list of businesses to "item-list-container" - it also sets the map width to 0 if none of the businesses have a lat and long
function addBusinessList(categoryName, itemName, type) {
	
	var oldCategoryName = categoryName;
	var oldItemName = itemName;
	
	categoryName = slashToUnderscore(categoryName);
	itemName = slashToUnderscore(itemName);
	
	//setting the page title 
	if((itemName === undefined || itemName === "") && (categoryName === undefined || categoryName === "")) {
		document.getElementsByClassName("side-container-title")[0].innerHTML = "Organizations";
	}
	else if (type === "repair") {
		document.getElementsByClassName("side-container-title")[0].innerHTML = "Organizations Repairing " + decodeURI(oldItemName);
		document.title = "Organizations Repairing " + decodeURI(oldItemName);
	}
	else if(type === "reuse" && itemName === undefined || type === "reuse" && itemName === "") {
		document.getElementsByClassName("side-container-title")[0].innerHTML = "Organizations Accepting " + decodeURI(oldCategoryName);
		document.title = "Organizations Accepting " + decodeURI(oldCategoryName);
	}
	else {
		document.getElementsByClassName("side-container-title")[0].innerHTML = "Organizations Accepting " + decodeURI(oldItemName);
		document.title = "Organizations Accepting " + decodeURI(oldItemName);
	}
	
	
	var req = new XMLHttpRequest();
	
	req.onreadystatechange = function() {
		
		if (this.readyState == 4 && this.status == 200) {
			var bus = JSON.parse(this.responseText);
			
			if (bus.length == 0) { //printing the error message if no results
				
				if (itemName === undefined) {
					itemName = "";
				}
				
				printErrorMessage("side-container-title", "item-list-container", itemName);
				return;
			}
			
			var latLongCount = 0;
			
			//printing the businesses
			for(i = 0; i < bus.length; i++) {
				
				
				if (categoryName === "Recycle" && itemName === "Recycle") {// if the special case used for recycling centers is used 
					var listDiv = document.getElementById("recycle-list-container");
				}
				else {
					var listDiv = document.getElementById("item-list-container");
				}
				
				listDiv.className += " list-group";
				
				//the link
				var link = document.createElement("a");
				link.className = "list-group-item";
				link.setAttribute('href', "business.php?name=" + encodeURI(bus[i].name));
				
				//the business name
				var linkTitle = document.createElement("p");
				linkTitle.className = "list-group-item-text";
				linkTitle.className += " list-item-title";
				var busName = document.createTextNode(bus[i].name);
				linkTitle.appendChild(busName);
				
				link.appendChild(linkTitle);
				
				//the address
				if (bus[i].address_line_1  && bus[i].city && bus[i].abbreviation && bus[i].zip_code ) {
					var linkAddress = document.createElement("p");
					linkAddress.className = "list-group-item-text";
					
					var pinIcon = document.createElement("img");
					pinIcon.src = "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|F89420";
					pinIcon.className = "pin-icon";
					linkAddress.appendChild(pinIcon);
					
					
					linkAddress.appendChild(document.createTextNode(bus[i].address_line_1));
					linkAddress.appendChild(document.createElement("br"));
					
					
					var cityAddressNode = document.createElement("p");
					cityAddressNode.id = "second-line-address";
					var cityAddress = document.createTextNode(bus[i].city + ", " + bus[i].abbreviation + " " + getFormattedZip(bus[i].zip_code));
					cityAddressNode.appendChild(cityAddress);
					
					linkAddress.appendChild(cityAddressNode);
					
					link.appendChild(linkAddress);
					
				}
				
				//phone
				if(bus[i].phone) {
					var linkPhone = document.createElement("p");
					linkPhone.className = "list-group-item-text";
					
					var phoneIcon = document.createElement("i");
					phoneIcon.className = "zmdi";
					phoneIcon.className += " zmdi-phone";
					
					linkPhone.appendChild(phoneIcon);
					linkPhone.appendChild(document.createTextNode(getFormattedPhone(bus[i].phone)));
					
					link.appendChild(linkPhone);
				}
				
				//the website
				if(bus[i].website) {
					var linkWebsite = document.createElement("a");
					linkWebsite.setAttribute('href', bus[i].website);
					linkWebsite.className = "list-group-item-text";
					
					var webIcon = document.createElement("i");
					webIcon.className = "zmdi";
					webIcon.className += " zmdi-globe";
					
					linkWebsite.appendChild(webIcon);
					linkWebsite.appendChild(document.createTextNode(bus[i].website));
					
					link.appendChild(linkWebsite);
				}
				
				listDiv.appendChild(link);
				
				//counting if lat and long
				if(bus[i].latitude && bus[i].longitude) {
					latLongCount++;
				}
				
			}
			
			
			//adjusting business-map-container and business-info-container widths depending on lat and long
			if(latLongCount == 0) {
				document.getElementById('item-list-container').setAttribute("style","width:100%");
				document.getElementsByClassName("item-map-container")[0].setAttribute("style","width:0%");;
			}
			
		}
	};
	
	
	if((type === "reuse" && categoryName === undefined || type === "reuse" && itemName === undefined) && (type === "reuse" && categoryName === "" || type === "reuse" && itemName === "")) {//selecting all businesses in the Reuse category if none is specified
		var busURI = APIBase + "/business/reuseExclusive";
	}
        else if ((type === "repair" && categoryName === undefined || type === "repair" && itemName === undefined) && (type === "repair" && categoryName === "" || type === "repair" && itemName === "")) {
            var busURI = APIBase + "/business/repairExclusive";
	}
        //if a category is given but not an item, list all businesses associated with a category for reuse or repair
	else if (type === "reuse" && itemName === undefined || type === "reuse" && itemName === "") {
		var busURI = APIBase + "/reuse/business/category/name/" + categoryName;
	}
        else if (type === "repair" && itemName === undefined || type === "repair" && itemName === "") {
		var busURI = APIBase + "/repair/business/category/name/" + categoryName;
	}
        //if an item is given but not a category, list all businesses associated with an item for reuse or repair
	else if (type === "reuse" && categoryName === undefined || type === "reuse" && categoryName === "") {
		var busURI = APIBase + "/reuse/business/item/name/" + itemName;
	}
        else if (type === "repair" && categoryName === undefined || type === "repair" && categoryName === "") {
		var busURI = APIBase + "/repair/business/item/name/" + itemName;
	}
	else if (categoryName === "Recycle" && itemName === "Recycle") {// if the special case used for recycling centers is used 
		var busURI = APIBase + "/business/recycleExclusive";
	}
        //if both category and item names are given, list all businesses associated with both for reuse or repair
	else if (type === "reuse"){
		
		var busURI = APIBase + "/reuse/business/category/name/" + categoryName + "/item/name/" + itemName;
	}
        else if (type === "repair"){
	
		var busURI = APIBase + "/repair/business/category/name/" + categoryName + "/item/name/" + itemName;
	}

	
	req.open("GET", busURI, true);
	req.send();
}

//adds the page title and contact information for a given businesses to "contact-container", not including the list of items accepted - it also sets the map width to 0 if the business doesn't have a lat and long
function addBusinessContact(busName) {
	
	//setting the page title
	document.getElementsByClassName("side-container-title")[0].innerHTML = decodeURI(busName);
	document.title = decodeURI(busName);
	
	busName = slashToUnderscore(busName);
	
	var req = new XMLHttpRequest();
	
	req.onreadystatechange = function() {
		
		if (this.readyState == 4 && this.status == 200) {
			
			var bus = JSON.parse(this.responseText);
			
			if (bus === null) { //printing the error message if no results
				
				if (busName === undefined) {
					busName = "";
				}
				
				printErrorMessage("side-container-title", "business-info-container", busName);
				return;
			}
			
			//adjusting business-map-container and business-info-container widths depending on lat and long
			if(!bus.latitude|| !bus.longitude) {
				document.getElementById('business-info-container').setAttribute("style","width:100%");
				document.getElementsByClassName("business-map-container")[0].setAttribute("style","width:0%");;
			}
			
			
			

			//printing the business contact
			
			var contactDiv = document.getElementById("contact-container");
			contactDiv.className = "list-group-item";
			
			//contatct label
			var contactTitle = document.createElement("p");
			contactTitle.className = "side-container-subtitle";
			contactTitle.innerHTML = "Contact";
			
			contactDiv.appendChild(contactTitle);
			
			//address
			if (bus.address_line_1  && bus.city && bus.abbreviation && bus.zip_code ) {
				var busAddress = document.createElement("p");
				busAddress.className = "list-group-item-text";
				
				
				var pinIcon = document.createElement("img");
				pinIcon.src = "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|F89420";
				pinIcon.className = "pin-icon";
				busAddress.appendChild(pinIcon);
				
				busAddress.appendChild(document.createTextNode(bus.address_line_1));
				busAddress.appendChild(document.createElement("br"));
				
				var cityAddressNode = document.createElement("p");
				cityAddressNode.id = "second-line-address";
				var cityAddress = document.createTextNode(bus.city + ", " + bus.abbreviation + " " + getFormattedZip(bus.zip_code));
				
				cityAddressNode.appendChild(cityAddress);
				busAddress.appendChild(cityAddressNode);
				
				contactDiv.appendChild(busAddress);
			}

			//phone
			if(bus.phone) {
				var busPhone = document.createElement("p");
				busPhone.className = "list-group-item-text";
				
				var phoneIcon = document.createElement("i");
				phoneIcon.className = "zmdi";
				phoneIcon.className += " zmdi-phone";
				
				busPhone.appendChild(phoneIcon);
				busPhone.appendChild(document.createTextNode(getFormattedPhone(bus.phone)));
				
				contactDiv.appendChild(busPhone);
			}
			
			//website
			if(bus.website) {

				var busWebsite = document.createElement("a");
				busWebsite.setAttribute('href', bus.website);
				busWebsite.className = "list-group-item-text";
				
				var webIcon = document.createElement("i");
				webIcon.className = "zmdi";
				webIcon.className += " zmdi-globe";
				
				busWebsite.appendChild(webIcon);
				busWebsite.appendChild(document.createTextNode(bus.website));

				contactDiv.appendChild(busWebsite);
			}
			
			
			var contactTitle = document.createElement("p");
			contactTitle.className = "side-container-subtitle";
			contactTitle.innerHTML = "Services";

		}
	};

	if (busName === undefined || busName === "") { //if no business name is given, printing an error message
		printErrorMessage("side-container-title", "business-info-container", "");
		return;
		
	}
	else {//if a business name is given, printing its details
		var busURI = APIBase + "/business/name/" + busName;
	
		req.open("GET", busURI, true);
		req.send();
	}
	
	
}

//adds the list of items a given business accepts to "services-container"
function addBusinessServices(busName) {
	
	var oldBusName = busName;
	busName = slashToUnderscore(busName);
	
	var req = new XMLHttpRequest();
	
	req.onreadystatechange = function() {
		
		if (this.readyState == 4 && this.status == 200) {
			
			var items = JSON.parse(this.responseText);

			//checking for a special case for Recycling Businesses with no items besides "Recycle" or the case where no items are returned
			if((items.length == 0 || items.length == 1 && items[0].name == "Recycle")) {
				
				//adding any links the business may have
				addBusinessLinks(busName);
				
				//setting the contact div so that it expands to fill the remainding space in business-info-container
				/*
				var minHeight = document.getElementById('business-info-container').offsetHeight - document.getElementsByClassName('side-container-title')[0].offsetHeight - 10;
				if(document.getElementById('contact-container').offsetHeight < minHeight) {
					document.getElementById('contact-container').style.height = minHeight + "px";
				}
				*/
				return;
			}
			
			var servicesDiv = document.getElementById("services-container");
			servicesDiv.className = "list-group-item";
			
			//services label
			var servicesTitle = document.createElement("p");
			servicesTitle.className = "side-container-subtitle";
			servicesTitle.innerHTML = "Services";
			servicesDiv.appendChild(servicesTitle);
			
			//services description
			var servicesDesc = document.createElement("p");
			servicesDesc.className = "list-group-item-text";
			servicesDesc.className += " services-description-text";
			servicesDesc.appendChild(document.createTextNode(decodeURI(oldBusName) + " accepts the following items:"));
			servicesDiv.appendChild(servicesDesc);
			
			//printing the items
			var itemList = document.createElement("p");
			itemList.className = "list-group-item-text";
			
			itemList.appendChild(document.createTextNode(items[0].name));
			
			for(i = 1; i < items.length; i++) {
				
				if(items[i].name != "Recycle") {//a special case for Recycling Businesses with no items besides "Recycle"
					itemList.appendChild(document.createElement("br"));
					itemList.appendChild(document.createTextNode(items[i].name));
				}
			}

			servicesDiv.appendChild(itemList);
			
			//adding any links the business may have
			addBusinessLinks(busName);
			
			//setting the services div so that it expands to fill the remainding space in business-info-container
			var minServicesHeight = document.getElementById('business-info-container').offsetHeight - document.getElementsByClassName('side-container-title')[0].offsetHeight - document.getElementById('contact-container').offsetHeight - 10;
			if(servicesDiv.offsetHeight < minServicesHeight) {
				servicesDiv.style.height = minServicesHeight + "px";
			}

		}
	};
	
	if (busName != undefined && busName != "") { //only if a business name is given should services be printed
		var busURI = APIBase + "/item/business/name/" + busName;
	
		req.open("GET", busURI, true);
		req.send();
	}
}

//adds the list of items a given business accepts to "services-container"
function addBusinessLinks(busName) {
	//var oldBusName = busName;
	busName = slashToUnderscore(busName);
	
	var req = new XMLHttpRequest();
	
	req.onreadystatechange = function() {
		
		if (this.readyState == 4 && this.status == 200) {
			
			var links = JSON.parse(this.responseText);

			//checking if there are no links
			if(links.length == 0) {

				//expanding the contact div
				if(!document.getElementById("services-container").firstChild) {
					//setting the contact div so that it expands to fill the remainding space in business-info-container				
					var minHeight = document.getElementById('business-info-container').offsetHeight - document.getElementsByClassName('side-container-title')[0].offsetHeight - 10;
					if(document.getElementById('contact-container').offsetHeight < minHeight) {
						document.getElementById('contact-container').style.height = minHeight + "px";
					}
				}
				
				
				return;
			}
			
			
			var servicesDiv = document.getElementById("services-container");
			servicesDiv.className = "list-group-item";
			
			//services label
			var servicesTitle = document.createElement("p");
			servicesTitle.className = "side-container-subtitle";
			servicesTitle.innerHTML = "Additional Information";
			servicesDiv.appendChild(servicesTitle);
			
			console.log(links);
			
			//adding links
			for(i = 0; i < links.length; i++) {
				
				var busPar = document.createElement("p");
				var busLink = document.createElement("a");
				busLink.setAttribute('href', links[i].URI);
				
				var linkIcon = document.createElement("i");
				linkIcon.className = "zmdi";
				linkIcon.className += " zmdi-link";
				
				busLink.appendChild(linkIcon);
				busLink.appendChild(document.createTextNode(links[i].name));
				busPar.appendChild(busLink);

				servicesDiv.appendChild(busPar);
			}

			//setting the services div so that it expands to fill the remainding space in business-info-container
			var minServicesHeight = document.getElementById('business-info-container').offsetHeight - document.getElementsByClassName('side-container-title')[0].offsetHeight - document.getElementById('contact-container').offsetHeight - 10;
			if(servicesDiv.offsetHeight < minServicesHeight) {
				servicesDiv.style.height = minServicesHeight + "px";
			}
			

		}
	};
	
	if (busName != undefined && busName != "") { //only if a business name is given should links be printed
		var busURI = APIBase + "/document/business/name/" + busName;
	
		req.open("GET", busURI, true);
		req.send();
	}
}

function printErrorMessage(titleClass, containerId, topic) {
		
		//setting the page titles
		if(topic != "" && topic != undefined) {
			
			document.title = "Error - Unable to Find \"" + topic + "\"";
			document.getElementsByClassName(titleClass)[0].innerHTML = "Error - Unable to Find \"" + topic + "\"";
		}
		else {
			document.title = "Error";
			document.getElementsByClassName(titleClass)[0].innerHTML = "Error";
		}

		//adding the error message
		
		var parentDiv = document.getElementById(containerId);
		
		var errorDiv = document.createElement("div");
		errorDiv.className = "list-group-item";
		errorDiv.className += " error-message-text";
		
		var errorMessage = document.createElement("p");
		errorMessage.className = "list-group-item-text";
		
		if(topic === undefined || topic === "") {
			errorMessage.appendChild(document.createTextNode("Unforunately, we could not find what you were looking for."));
		}
		else {
			errorMessage.appendChild(document.createTextNode("Unforunately, we could not find any results related to " + topic.toLowerCase() + "."));
		}
		
		errorMessage.appendChild(document.createElement("br"));
		errorMessage.appendChild(document.createElement("br"));
		errorMessage.appendChild(document.createTextNode("Try reviewing "));
		
		repairMessage = document.createElement("a");
		repairMessage.setAttribute('href', "category.php?name=Repair%20Items");
		repairMessage.innerHTML = "items accepted for repair";
		errorMessage.appendChild(repairMessage);
		
		errorMessage.appendChild(document.createTextNode(", "));
		
		reuseMessage = document.createElement("a");
		reuseMessage.setAttribute('href', "category.php?name=Repair%20Items");
		reuseMessage.innerHTML = "items accepted for resale";
		errorMessage.appendChild(reuseMessage);
		
		errorMessage.appendChild(document.createTextNode(", "));
		
		reuseMessage = document.createElement("a");
		reuseMessage.setAttribute('href', "recycle.php");
		reuseMessage.innerHTML = "recycling services";
		errorMessage.appendChild(reuseMessage);
		
		errorMessage.appendChild(document.createTextNode(", or the businesses shown on the map."));
		
		errorMessage.appendChild(document.createElement("br"));
		errorMessage.appendChild(document.createElement("br"));
		
		errorMessage.appendChild(document.createTextNode("If you believe that there are businesses or items that should be included in the Corvallis Reuse and Repair Directory, please "));
		reuseMessage = document.createElement("a");
		reuseMessage.setAttribute('href', "contact.php");
		reuseMessage.innerHTML = "let us know";
		errorMessage.appendChild(reuseMessage);
		errorMessage.appendChild(document.createTextNode("."));
		
		errorDiv.appendChild(errorMessage);
		parentDiv.appendChild(errorDiv);
		
		//setting the error div so that it expands to fill the remainding space in business-info-container
		var minHeight = parentDiv.offsetHeight - document.getElementsByClassName('side-container-title')[0].offsetHeight - 10;
		if(errorDiv.offsetHeight < minHeight) {
			errorDiv.style.height = minHeight + "px";
		}
}