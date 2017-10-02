/*This is the javascript for allBusinessPages.php to create the
grid/list of businesses (w/the grid component), all of which post their ids to
singleBusinessPage.php when clicked from either list or grid view.*/

/*Set the togglers*/
$(function() {
  return $('[data-toggle]').on('click', function() {
    var toggle;
    toggle = $(this).addClass('active').attr('data-toggle');
    $(this).siblings('[data-toggle]').removeClass('active');
    return $('.list-elements').removeClass('grid list').addClass(toggle);
  });
});

/*Get the list of businesses*/
$.ajax({
    type: "GET",
    url: "/RUapi/business",
    dataType: 'json',
    success: function(data) {
        for (var i = 0; i < data.length; i++) {
            var name, address_line_1, address_line_2, city, zip_code, website, phone, id;

            /*Name of business*/
            if(!data[i].name){
              name = 'Name missing';
            }
            else{
              name = data[i].name;
            }

            /*Address line 1*/
            if(!data[i].address_line_1){
              address_line_1 = 'Address missing';            }
            else{
              address_line_1 = data[i].address_line_1;
            }

            /*Address line 2*/
            if(!data[i].address_line_2 || data.addres_line_2 == null){
              address_line_2 = '';
            }
            else{
              address_line_2 = data[i].address_line_2 + '';
            }

            /*Website*/
            if(!data[i].website){
              website = "https://www.google.com/#q=Website+is+missing";
            }
            else{
              website = data[i].website + '';
            }
            //var zip = data[i].zip + '';

            /*city*/
            if(!(data[i].city)){
              city = "city is missing";
            }
            else{
             city = data[i].city + '';
            }

            /*Zip*/
            if(!(data[i].zip_code)){
              zip_code = "zipcode missing";
            }
            else{
             zip_code = data[i].city + '';
            }

            /*Phone*/
            if(!(data[i].phone)){
              phone = "phone missing";
            }
            else{
              phone = data[i].phone + '';
              phone = phone.substr(0, 3) + '-' + phone.substr(3, 3) + '-' + phone.substr(6,4)
            }

            /*Id*/
            if(!(data[i].id)){
              id = "id missing";
            }
            else{
              id = data[i].id + '';
            }

            /*fill the table (really ul) with each list item*/
            fillTable(name, address_line_1, address_line_2, city, zip_code, website, phone, id);
          }
    },
});

/*add a list item to the unoredered list #thisList*/
function fillTable(name, address_line_1, address_line_2, city, zip_code, website, phone, id){
  //var shortenedURL = website.replace(/^(https?|ftp):\/\//, '');
  /*Add list item to list in allBusinessesPage.php*/
   $("#thisList").append("\
      <li class='white-square' id='" + id + "'> \
        <span class='box-detail list-only'>" + address_line_1 + ", " + city + " </span>\
        <span class='box-name'>" + name + " </span> \
        <span class='box-detail grid-only'>" + address_line_1 + " </span> \
        <div class='pull-right'> \
          <div><span class='box-detail grid-only'>" + address_line_2 + " </span> </div>\
          <div><span class='box-detail grid-only'>" + zip_code + " </span></div>\
          <span class='box-detail grid-only'> <a href='" + website + "'> Website </span> \
          <span class='below-line-container'>\
            <span class='below-line'>\
              <span class='lower-left-corner'>" + phone + " </span> \
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
     hiddenFormToSubmit.action = 'singleBusinessPage.php';
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
