//var APIBase = "http://localhost/Corvallis-Sustainability-ReUse/public_html/index.php"; //used for local development by Lauren Miller
var APIBase = ""; //used by the live website


//overwrites and adds a short appreciation message to "donor-thanks"
function addShortSponsorsThanks() {
	var req = new XMLHttpRequest();

	req.onreadystatechange = function() {

		if (this.readyState == 4 && this.status == 200) {
			var donors = JSON.parse(this.responseText);

			//leaving the default message if there are no donors
			if(donors.length == 0) {
				return;
			}

			var donorDiv = document.getElementById("donor-thanks");

			donorDiv.innerHTML = "";

			//adding the title
			var donorTitle = document.createElement("h4");
			donorTitle.innerHTML = "Sponsors";
			donorDiv.appendChild(donorTitle);

			var donorText = document.createElement("p");
			donorText.appendChild(document.createTextNode("We appreciate the support of "));

			//printing the first donor
			busLink = document.createElement("a");
			busLink.setAttribute('href', donors[0].websiteurl);
			busLink.appendChild(document.createTextNode(donors[0].name));
			donorText.appendChild(busLink);

			//printing all donors but the first and last
			for(i = 1; i < donors.length - 1; i++) {
				donorText.appendChild(document.createTextNode(", "));

				//the link
				var busLink = document.createElement("a");
				busLink.setAttribute('href', donors[i].websiteurl);
				busLink.appendChild(document.createTextNode(donors[i].name));

				donorText.appendChild(busLink);
			}

			if(donors.length == 2) {
				donorText.appendChild(document.createTextNode(" and "));
			}
			else if(donors.length > 2) {
				donorText.appendChild(document.createTextNode(", and "));
			}

			if(donors.length > 1) {
				//printing the last donor
				busLink = document.createElement("a");
				busLink.setAttribute('href', donors[donors.length - 1].websiteurl);
				busLink.appendChild(document.createTextNode(donors[donors.length - 1].name));
				donorText.appendChild(busLink);
			}

			donorText.appendChild(document.createTextNode("."));
			donorDiv.appendChild(donorText);
		}
	};

	var donorURI = APIBase + "/donor";

	req.open("GET", donorURI, true);
	req.send();
}

//adds a list thanking current donors to "about-donors"
function addLongSponsorsThanks() {
	var req = new XMLHttpRequest();

	req.onreadystatechange = function() {

		if (this.readyState == 4 && this.status == 200) {
			var donors = JSON.parse(this.responseText);

			//leaving the default message if there are no donors
			if(donors.length == 0) {
				return;
			}

			var donorDiv = document.getElementById("about-donors");

			if (donors.length == 1) {
				//thanks message
				var donorThanks = document.createElement("p");
				donorThanks.innerHTML = "We appreciate the support of " + donors[0].name + ".";
				donorDiv.appendChild(donorLabel);

				//description
				var donorDescription = document.createElement("p");
				donorDescription.innerHTML = donors[0].description;
				donorDiv.appendChild(donorDescription);

				//website
				if(donors[0].websiteurl) {
					var busLinkText = document.createElement("p");
					busLinkText.appendChild(document.createTextNode("Learn more about " + donors[0].name + " online, at "))

					var busLink = document.createElement("a");
					busLink.setAttribute('href', donors[0].websiteurl);
					busLink.appendChild(document.createTextNode(donors[0].websiteurl));

					busLinkText.appendChild(busLink);
					busLinkText.appendChild(document.createTextNode("."))
					donorDiv.appendChild(busLinkText);
				}

				return;
			}

			//thanks message
			var donorThanks = document.createElement("p");
			donorThanks.innerHTML = "We appreciate the support of our current sponsors:";
			donorDiv.appendChild(donorThanks);

			for(i = 0; i < donors.length; i++) {

				donorDiv.appendChild(document.createElement("br"));

				//label
				var donorLabel = document.createElement("h4");
				donorLabel.innerHTML = donors[i].name;
				donorLabel.className = "donor-label";
				donorDiv.appendChild(donorLabel);

				//description
				var donorDescription = document.createElement("p");
				donorDescription.innerHTML = donors[i].description;
				donorDiv.appendChild(donorDescription);

				//website
				if(donors[0].websiteurl) {
					var busLinkText = document.createElement("p");
					busLinkText.appendChild(document.createTextNode("Learn more about " + donors[i].name + " online, at "))

					var busLink = document.createElement("a");
					busLink.setAttribute('href', donors[i].websiteurl);
					busLink.appendChild(document.createTextNode(donors[i].websiteurl));

					busLinkText.appendChild(busLink);
					busLinkText.appendChild(document.createTextNode("."))
					donorDiv.appendChild(busLinkText);
				}
			}
		}
	};

	var donorURI = APIBase + "/donor";

	req.open("GET", donorURI, true);
	req.send();
}
