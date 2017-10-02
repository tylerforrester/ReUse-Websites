
/*Set click listener for back button*/

$( "#backBtn" ).click(function() {
    window.location.href = '../AdminSite2/allBusinessesPage.php';
});

/*Add list item to list in allBusinessesPage.php*/
$("#thisList").append("\
 <li class='white-square'> \
      <span class='box-name'>\
        <input name='name_input' type='text' id='name_input' placeholder='name'>\
       </span> \
       <span class='box-detail grid-only'>\
        <input placeholder='address line 1' name='address_line_1_input' type='text' id='address_line_1_input''>\
       </span> \
        <div>\
          <span class='box-detail grid-only'>\
            <input placeholder='address line 2' name='address_line_2_input' type='text' id='address_line_2_input'> \
          </span>\
        </div>\
        <div>\
          <span class='box-detail grid-only'>\
            <input placeholder='zipcode' name='zip_code_input' type='text' id='zip_code_input'>\
          </span>\
        </div>\
        <div>\
          <span class='box-detail grid-only'>\
            <input placeholder='city' name='city_input' type='text' id='city_input'>\
          </span>\
        </div>\
        <div>\
          <span class='box-detail grid-only'>\
            <input placeholder='state' name='state_input' type='text' id='state_input'>\
          </span>\
        </div>\
        <div>\
          <span class='box-detail grid-only'>\
            <input placeholder='latitude' name='latitude_input' type='text' id='latitude_input'>\
          </span>\
        </div>\
        <div>\
          <span class='box-detail grid-only'>\
            <input placeholder='longitude' name='longitude_input' type='text' id='longitude_input'>\
          </span>\
        </div>\
        <span class='box-detail grid-only'> \
            <input placeholder='website' name='website_input' type='text' id='website_input'>\
        </span> \
        <span class='below-line-container'>\
          <span class='below-line'>\
          <input placeholder='phone number' name='phone_input' type='text' id='phone_input'>\
            <span class='lower-left-corner'>\
              <button class='btn btn-primary' id='add'>Save</button>\
          </span> \
        </span> \
      </div>\
    </li>");


// This code returns a list of items by category.
// Haven't figured out how to correctly format yet to display checkboxes that can record items accepted
///*Get the list of categories and items in each category*/
//$.ajax({
//    type: "GET",
//    url: "/RUapi/category",
//    dataType: 'json',
//    success: function(cat_data) {
////        $("#thisList").append("\
////            <li class='white-square' id='categories'> \
////                <div class='cat-detail'>\
////        ");
//        for (var i = 0; i < cat_data.length; i++) {
//          console.log('nard');
//            var cat_name = cat_data[i].name;
//            var cat_id = cat_data[i].id + '';
//
////            $(".cat-detail").append("<span class='cat-box'>" + cat_name + "\n\</span><\div>");
//            //create array for items
//            var item_array = [];
//            /* Get list of items for each category */
//            $.ajax({
//                type: "GET",
//                url: "/RUapi/items/:cat"+ cat_id,
//                dataType: 'json',
//                success: function(item_data) {
//                    for (var i = 0; i < item_data.length; i++) {
//                      console.log('nard');
//                        var item_name = item_data[i].name;
//                        var item_id = item_data[i].id + '';
//                        if(!item_data[i].category_id){
//                          category_id = "category id is missing";
//                        }
//                        else{
//                          category_id = item_data[i].category_id ;
//                        }
//                        item_array[i] = item_name;
////                        <input type='checkbox' name='" + item_id + "' value='" + item_name + "'>" + item_name +"<br>\
//
//                      }
//                },
//            });
//            FillItems(cat_name, item_array);
//          }
//    },
//});
//
//function FillItems(cat_name, item_array){
//     $("#thisList").append("\
//     <li class='white-square'> \
//          <span class='box-name'>\
//           "+ cat_name +"\
//            </span> \
//          <br> <input type='checkbox' name='" + item_array[1] + "' value='" + item_array[1] + "'> " + item_array[0] +" \
//        </li>");
//}


//This will hold the function to add
var thisaddFunction;

/*Function to set the event listeners*/
setAddButtonListener = function(){
    var addButton = document.getElementById('add');
    makeaddFunction(addButton);
    addButton.addEventListener('click', thisaddFunction, false);
}

/*Add onclick listeners*/
makeaddFunction = function(addButton){

    thisaddFunction = function(){
        //var newName = $('#name_input').val();

        payload = {};
        payload.name = $('#name_input').val();
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
            url: "/RUapi/business",
            data: payload,
            dataType: 'json',
            success: function(data) {
                console.log("SUCCESS");
            }
        });
        window.location.href = '../AdminSite2/allBusinessesPage.php';
    }; //End of thisaddFunction defintion

}

$("input").prop('disabled', false);
$(".whenDisabled").hide();
$(".whenEnabled").show();
$(".box-detail.grid-only").addClass("centerTime");
$("span.below-line").addClass("centerPhone");


setAddButtonListener();

