/**
 * Created by Jeffrey on 3/11/2017.
 */
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

// Function to get a list of items matching the search term.
function getItems(search_term) {
    //console.log("Items search with " + search_term);
    // Search for items matching like search_term
    $.ajax({
        type: "GET",
        url: "/itemSearch/" + search_term,
        dataType: 'json',
        success: function (items) {
            // Loop through the items to get the category name
            //console.log(items);
            for (i = 0; i < items.length; i++) {
                var item_name = items[i].name;
                //console.log("Item #" + i + ": " + item_name);
                var category_ID = items[i].category_id;
                var item_type = items[i].Type;
                //console.log("My type: " + item_type);
                //console.log(category_ID);
                //Now let's get the category name to
                getCat(item_name, category_ID, item_type);
                function getCat(item_name, category_ID, item_type) {
                    $.ajax({
                        type: "GET",
                        url: "/category/" + category_ID,
                        dataType: 'json',
                        success: function(cat_data) {
                            //console.log(cat_data);
                            var category_name = cat_data[0].name;

                            var listDiv = document.getElementById("category-list-container");
                            listDiv.className += " list-group";

                            // Decide between item types
                            var type = ""
                            if (item_type == 0) {
                                type = "reuse";
                            }
                            else if (item_type == 1) {
                                type = "repair";
                            }
                            else {
                                type = "unknown"
                            }


                            //the link
                            var link = document.createElement("a");
                            link.className = "list-group-item";
                            link.className += " list-item-title";
                            link.setAttribute('href', "item.php?type=" + type + "&cat=" + category_name +"&item=" + item_name);

                            //the item name
                            var itemName = document.createTextNode(category_name + ": " + item_name);
                            itemName.className = "list-group-item-heading";
                            link.appendChild(itemName);

                            listDiv.appendChild(link);
                        }
                    });
                }

            }

        }
    });
}

// Function to get a list of categories matching the search term.  Returns objects with "id" and "name"
function getCategories(search_term) {
    //console.log("Categories term " + search_term);
    // Search for categories matching like search_term
    $.ajax({
        type: "GET",
        url: "/categorySearch/" + search_term,
        dataType: 'json',
        success: function (categories) {
            console.log(categories);
            for (j = 0; j < categories.length; j++) {
                var cat_name = categories[j].name;
                var cat_type = categories[j].Type;
                //console.log(cat_name);

                // Decide what type string
                var type = ""
                var title_type = ""
                if (cat_type == 0) {
                    type = "reuse";
                    title_type = "Reuse";
                }
                else if (cat_type == 1) {
                    type = "repair";
                    title_type = "Repair";
                }
                else {
                    type = "unknown"
                    title_type = "Unknown";
                }

                var listDiv = document.getElementById("category-list-container");
                listDiv.className += " list-group";

                //the link
                var link = document.createElement("a");
                link.className = "list-group-item";
                link.className += " list-item-title";
                link.setAttribute('href', "category.php?type=" + type + "&name=" + cat_name);

                //the item name
                var catName = document.createTextNode(title_type + ": " + cat_name);
                catName.className = "list-group-item-heading";
                link.appendChild(catName);

                listDiv.appendChild(link);
            }
        }
    });
}

// Function to get a list of businesses matching the search term.  Returns objects with business data.
function getBusinesses(search_term) {
    //console.log("Business term " + search_term);
    // Search for businesses matching like search_term
    $.ajax({
        type: "GET",
        url: "/businessSearch/" + search_term,
        dataType: 'json',
        success: function (businesses) {
            //console.log(businesses);
            for (k = 0; k < businesses.length; k++) {
                var bus_name = businesses[k].name;
                console.log(bus_name);

                var listDiv = document.getElementById("category-list-container");
                listDiv.className += " list-group";

                //the link
                var link = document.createElement("a");
                link.className = "list-group-item";
                link.className += " list-item-title";
                link.setAttribute('href', "business.php?name=" + bus_name);

                //the item name
                var busName = document.createTextNode(bus_name);
                busName.className = "list-group-item-heading";
                link.appendChild(busName);

                listDiv.appendChild(link);

                //initBusinessMap(bus_name);

                // the address
                if (businesses[k].address_line_1 && businesses[k].city && businesses[k].zip_code) {
                    var linkAddress = document.createElement("p");
                    linkAddress.className = "list-group-item-text";

                    var pinIcon = document.createElement("img");
                    pinIcon.src = "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|F89420";
                    pinIcon.className = "pin-icon";
                    linkAddress.appendChild(pinIcon);

                    linkAddress.appendChild(document.createTextNode(businesses[k].address_line_1));
                    linkAddress.appendChild(document.createElement("br"));


                    var cityAddressNode = document.createElement("p");
                    cityAddressNode.id = "second-line-address";
                    var cityAddress = document.createTextNode(businesses[k].city + ", " + getFormattedZip(businesses[k].zip_code));
                    cityAddressNode.appendChild(cityAddress);

                    linkAddress.appendChild(cityAddressNode);

                    link.appendChild(linkAddress);
                }

                //phone
                if(businesses[k].phone) {
                    var linkPhone = document.createElement("p");
                    linkPhone.className = "list-group-item-text";

                    var phoneIcon = document.createElement("i");
                    phoneIcon.className = "zmdi";
                    phoneIcon.className += " zmdi-phone";

                    linkPhone.appendChild(phoneIcon);
                    linkPhone.appendChild(document.createTextNode(getFormattedPhone(businesses[k].phone)));

                    link.appendChild(linkPhone);
                }

                //the website
                if(businesses[k].website) {
                    var linkWebsite = document.createElement("a");
                    linkWebsite.setAttribute('href', businesses[k].website);
                    linkWebsite.className = "list-group-item-text";

                    var webIcon = document.createElement("i");
                    webIcon.className = "zmdi";
                    webIcon.className += " zmdi-globe";

                    linkWebsite.appendChild(webIcon);
                    linkWebsite.appendChild(document.createTextNode(businesses[k].website));

                    link.appendChild(linkWebsite);
                }
            }
        }
    });
}

// Main function for searching a specific term
function searchTerm(search_term) {
    //console.log("My term " + search_term);

    // Replace any slashes with underscore to the term
    var old_term = search_term;
    search_term = slashToUnderscore(search_term);

    document.getElementsByClassName("side-container-title")[0].innerHTML = "Search results containing '" + decodeURI(search_term) + "'";

    // Make the list
    //makeList(search_term)

    // Get Items, has data of items with category ID.  Category ID needs to be looked up to get the category name.
    getItems(search_term);

    // Get Category, has data including name of category
    getCategories(search_term);

    // Get Business, has data including name of business
    getBusinesses(search_term);

}
