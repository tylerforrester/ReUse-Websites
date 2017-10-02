var id = document.getElementById('idInput').value;
//console.log("Page for business with id " + id);


/*Get the list of businesses*/
$.ajax({
    type: "GET",
    url: "/RUapi/business/"+ id,
    dataType: 'json',
    success: function(data) {
        for (var i = 0; i < data.length; i++) {
            var name, address_line_1, address_line_2, city, zip_code, latitude, longitude, website, phone, id;

            /*Name of business*/
            if(!data[i].name){
                name = 'Name missing';
            }
            else{
                name = data[i].name;
            }

            /*Address line 1*/
            if(!data[i].address_line_1){
                address_line_1 = 'Address missing';}
            else{
                address_line_1 = data[i].address_line_1;
            }

            /*Address line 2*/
            if(!data[i].address_line_2 || data.address_line_2 == null){
                address_line_2 = '';
            }
            else{
                address_line_2 = data[i].address_line_2 + '';
            }

            /*Latitude*/
            if(!data[i].latitude){
                latitude = "latitude is missing";
            }
            else{
                latitude = data[i].latitude + '';
            }

            /*Longitude*/
            if(!data[i].longitude){
                longitude = "longitude is missing";
            }
            else{
                longitude = data[i].longitude + '';
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
                phone = phone.substr(0, 3) + '-' + phone.substr(3, 3) + '-' + phone.substr(6,4);
            }

            /*Id*/
            if(!(data[i].id)){
                id = "id missing";
            }
            else{
                id = data[i].id + '';
            }

            /*fill the table (really ul) with each list item*/
            fillTable(name, address_line_1, address_line_2, city, zip_code, website, phone, id, latitude, longitude);
        }
    },
});

/**/
function fillTable(name, address_line_1, address_line_2, city, zip_code, website, phone, id, latitude, longitude){
    //var shortenedURL = website.replace(/^(https?|ftp):\/\//, '');
    /*Add list item to list in allBusinessesPage.php*/
    $("#thisList").append("\
      <li class='white-square' id='" + id + "'> \
        <span class='box-detail list-only'>" + address_line_1 + ", " + city + " </span>\
        <span class='box-name'>\
          <input name='name_input' type='text' id='name_input' value='" + name + "' disabled='disabled'>\
          <span class='whenDisabled'>"+ name + "</span>\
         </span> \
         <span class='box-detail grid-only'>\
          <input placeholder='address line 1' name='address_line_1_input' type='text' id='address_line_1_input' value='" + address_line_1 + "'disabled='disabled'>\
          <span class='whenDisabled'>" + address_line_1 + "</span>\
         </span> \
          <div>\
            <span class='box-detail grid-only'>\
              <input placeholder='address line 2' name='address_line_2_input' type='text' id='address_line_2_input' value='" + address_line_2 + "' disabled='disabled'> \
              <span class='whenDisabled'>"+ address_line_2 + "</span>\
            </span>\
          </div>\
          <div>\
            <span class='box-detail grid-only'>\
              <input placeholder='zip_code_input' name='zipInput' type='text' id='zip_code_input' value='" + zip_code + "'disabled='disabled'>\
                <span class='whenDisabled'>" + zip_code + "</span> \
            </span>\
          </div>\
          <div>\
          <span class='box-detail grid-only'>\
            <input placeholder='latitude' name='latitude_input' type='text' id='latitude_input' value='" + latitude + "' disabled='disabled'>\
                <span class='whenDisabled'>" + latitude + "</span> \
          </span>\
        </div>\
        <div>\
          <span class='box-detail grid-only'>\
            <input placeholder='longitude' name='longitude_input' type='text' id='longitude_input' value='" + longitude + "' disabled='disabled'>\
                <span class='whenDisabled'>" + longitude + "</span> \
            </span>\
        </div>\
            <span class='box-detail grid-only'> \
          <input placeholder='website' name='website_input' type='text' id='website_input' value='" + website + "'disabled='disabled'>\
            <span class='whenDisabled'><a href='" + website + "'> Website </a></span>\
          </span> \
          <span class='below-line-container'>\
            <span class='below-line'>\
            <input placeholder='phone number' name='phone_input' type='text' id='phone_input' value='" + phone + "'disabled='disabled'>\
              <span class='lower-left-corner'>\
                <button class='btn btn-primary' id='save'>save</button>\
              <span class='whenDisabled'>" + phone + "</span></span> \
            </span> \
          </span> \
        </div>\
      </li>");
}

//This will hold the function to update
var thisUpdateFunction;

/*Function to set the event listeners*/
setUpdateButtonListener = function(){
    var updateButton = document.getElementById('save');
    makeUpdateFunction(updateButton);
    updateButton.addEventListener('click', thisUpdateFunction, false);
}

/*Add onclick listeners*/
makeUpdateFunction = function(updateButton){

    thisUpdateFunction = function(){
        //var oldName = $('#name_input').val();

        payload = {};
        payload.name = $('#name_input').val();
        payload.oldName = $('#name_input').val();
        payload.address = $('#address_line_1_input').val();
        payload.address2 = $('#address_line_2_input').val();
        payload.zipcode = $('#zip_code_input').val();
        payload.city = $('#city_input').val();
        payload.latitude = $('#latitude_input').val;
        payload.longitude = $('#longitude_input').val;
        payload.website = $('#website_input').val();
        payload.phone =  $('#phone_input').val().replace(/\D/g,'');

        $.ajax({
            type: "POST",
            url: "/RUapi/changeBusiness",
            data: payload,
            dataType: 'json',
            success: function(data) {
                console.log("SUCCESS");
            }
        });
        window.location.href = '../AdminSite2/allBusinessesPage.php';
    }; //End of thisUpdateFunction defintion

}

$("input").prop('disabled', false);
$(".whenDisabled").hide();
$(".whenEnabled").show();
$(".box-detail.grid-only").addClass("centerTime");
$("span.below-line").addClass("centerPhone");


setUpdateButtonListener();