/**
 * Created by Jeffrey on 2/9/2017.
 */


console.log(search_term);

/*Set the togglers*/
$(function() {
    return $('[data-toggle]').on('click', function() {
        var toggle;
        toggle = $(this).addClass('active').attr('data-toggle');
        $(this).siblings('[data-toggle]').removeClass('active');
        return $('.list-elements').removeClass('grid list').addClass(toggle);
    });
});

/*Get the list of items*/
$.ajax({
    type: "GET",
    url: "/RUapi/itemSearch/" + search_term,
    dataType: 'json',
    success: function(data) {
        if (data.length == 0)
            alert("No Items found with given search.  Please try again!")
        for (var i = 0; i < data.length; i++) {
            var name = data[i].name;
            var id = data[i].id + '';
            if(!data[i].category_id){
                category_id = "category id is missing";
            }
            else{
                category_id = data[i].category_id ;
            }

            /*fill the table (really ul) with each list item*/
            fillTable(name, category_id, id);
        }
    },
});

/*add a list item to the unoredered list #thisList*/
function fillTable(name, category_id, id){
    /*Build the url to the category page with the id and link to it
     Currently links to google*/
    //var categoryPageUrl = "https://www.google.com/#q=" + category_id;
    /*Add list item to list in allBusinessesPage.php*/
    $("#thisList").append("\
      <li class='white-square' id='" + id + "'> \
        <span class='box-name'>" + name + " </span> \
        <div class='pull-right'> \
          <span class='below-line-container'>\
            <span class='below-line'>\
              <span class='lower-left-corner'>Category id: " + category_id + " </span> \
            </span> \
          </span> \
        </div>\
      </li>");
    /*set the event listener for this list item*/
    setTheOnClickListeners(id);
}

/*Array to hold the functions that will become the event listeners
 for each list item*/
var clickListenersForSquares = [];

/*Function to set the event listeners*/
setTheOnClickListeners = function(id){
    var thisSquare = document.getElementById(id);
    /*Actually assign the thisSquare[id] array element to a function*/
    addFunctionForSquare(thisSquare, id);
    thisSquare.addEventListener('click', clickListenersForSquares[id], false);
}

/*Function to set a memebr of the clickListenersForSquares[] array
 to a particular function*/
addFunctionForSquare = function(thisSquare, id){

    clickListenersForSquares[id] = function(){
        var hiddenFormToSubmit = document.createElement('form');
        hiddenFormToSubmit.action = 'singleItemPage.php';
        hiddenFormToSubmit.method = 'post';

        var hiddenInput = document.createElement('input');
        hiddenInput.type ='hidden';
        hiddenInput.name ='id';
        hiddenInput.value = id;

        hiddenFormToSubmit.appendChild(hiddenInput);
        document.body.appendChild(hiddenFormToSubmit);
        hiddenFormToSubmit.submit();
    };

}
