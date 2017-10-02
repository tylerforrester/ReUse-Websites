/**
 * Created by Jeffrey on 2/4/2017.
 */

/*Form to submit for search*/
$("#thisList").append("\
<li class='white-square'>\
    <span class='box-detail grid-only'>\
        Choose Search Criteria<br>\
    </span>\
    <span class='box-detail grid-only'>\
        <input name='radio_search' type='radio' value='business' checked='true'>Business<br>\
    </span>\
    <span class='box-detail grid-only'>\
        <input name='radio_search' type='radio' value='category'>Category<br>\
    </span>\
    <span class='box-detail grid-only'>\
        <input name='radio_search' type='radio' value='item'>Item \
    </span>\
    <input placeholder='Enter Search Term Here' name='search_word' type='text' id='search_input'>\
    <button class='btn btn-primary' id='search'>Search</button> \
</li>")

// This will hold the function to search
var thisSearchFunction;

// Function to set the event listners
setSearchButtonListener = function() {
    var searchButton = document.getElementById('search');
    makeSearchFunction(searchButton);
    searchButton.addEventListener('click', thisSearchFunction, false);
}

// Search onclick listeners
makeSearchFunction = function(searchButton) {
    thisSearchFunction = function() {
        // Get the radio button checked
        var radio_select = $('input[name="radio_search"]:checked').val();
        //console.log(radio_select);
        // Get the search term
        var search_term = $('#search_input').val();
        //console.log(search_term);

        // Find special characters
        //Source: http://stackoverflow.com/questions/13840143/jquery-check-if-special-characters-exists-in-string
        if(/^[a-zA-Z0-9- ]*$/.test(search_term) == false) {
            alert('Your search string contains illegal characters.  Please try Again!');
        }
        else {
            // Conditional for which page to go to
            if (radio_select == 'business')
                var next_url = '../AdminSite2/searchBusinessPage.php';
            else if (radio_select == 'category')
                var next_url = '../AdminSite2/searchCategoriesPage.php';
            else
                var next_url = '../AdminSite2/searchItemsPage.php';

            // Send url to the next page along with the search term.
            window.location.href = next_url + '?term=' + search_term;
        }

    }
}

// Start up the function
setSearchButtonListener();
