var APIBase = "http://localhost/Corvallis-Sustainability-ReUse/public_html/index.php"; //used for local development by Lauren Miller
var APIBase = ""; //used by the live website and colleen

// Listen for the Enter key for the search and then do things after that.
$(document).keypress(function (e) {
    if (e.which == 13) {
        // Get the search term
        var search_term = $('#searchTerm').val();
        // Find special characters
        //Source: http://stackoverflow.com/questions/13840143/jquery-check-if-special-characters-exists-in-string
        if (/^[a-zA-Z0-9- ]*$/.test(search_term) == false) {
            alert('Your search string contains illegal characters.  Please try Again!');
        }
        else {
            var next_url = "searchPage.php?term=" + search_term;
            window.location.href = next_url;
        }
    }
});

//adds dropdown menu links of items in the Repair Items category to "header-repair-links"
function addRepairLinks() {
    var req = new XMLHttpRequest();

    req.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            var items = JSON.parse(this.responseText);

            for (i = 0; i < items.length; i++) {

                var dropDown = document.getElementById("header-repair-links");

                var link = document.createElement("a");
                var linkText = document.createTextNode(items[i].name);
                link.appendChild(linkText);
                //link.setAttribute('href', "item.php?cat=Repair%20Items&item=" + encodeURI(items[i].name));
                link.setAttribute('href', "category.php?type=repair&name=" + encodeURI(items[i].name));

                dropDown.appendChild(link);
            }

        }
    };

    //var repairItemsURI = APIBase + "/item/category/name/Repair%20Items";
    var repairItemsURI = APIBase + "/category/repairExclusive";

    req.open("GET", repairItemsURI, true);
    req.send();
}

//adds dropdown menu links of all categories not in the special categories of Repair, Repair Items, or Recycle
function addReuseLinks() {
    var req = new XMLHttpRequest();

    req.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            var items = JSON.parse(this.responseText);

            for (i = 0; i < items.length; i++) {

                var dropDown = document.getElementById("header-reuse-links");

                var link = document.createElement("a");
                var linkText = document.createTextNode(items[i].name);
                link.appendChild(linkText);
                link.setAttribute('href', "category.php?type=reuse&name=" + encodeURI(items[i].name));

                dropDown.appendChild(link);
            }

        }
    };

    var reuseCatsURI = APIBase + "/category/reuseExclusive";

    req.open("GET", reuseCatsURI, true);
    req.send();
}


//adds dropdown menu links of all businesses associated with the Category Recycle
function addRecycleLinks() {
    var req = new XMLHttpRequest();

    req.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            var recycleCenters = JSON.parse(this.responseText);

            for (i = 0; i < recycleCenters.length; i++) {

                var dropDown = document.getElementById("header-recycle-links");

                var link = document.createElement("a");
                var linkText = document.createTextNode(recycleCenters[i].name);
                link.appendChild(linkText);
                link.setAttribute('href', "business.php?name=" + encodeURI(recycleCenters[i].name));

                dropDown.appendChild(link);
            }

        }
    };

    var recycleURI = APIBase + "/business/recycleExclusive";

    req.open("GET", recycleURI, true);
    req.send();
}
