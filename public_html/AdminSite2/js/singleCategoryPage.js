var category_id = document.getElementById('idInput').value;
//console.log("Page for category with id " + category_id);


/*Set the togglers*/
$(function() {
  return $('[data-toggle]').on('click', function() {
    var toggle;
    toggle = $(this).addClass('active').attr('data-toggle');
    $(this).siblings('[data-toggle]').removeClass('active');
    return $('.list-elements').removeClass('grid list').addClass(toggle);
  });
});

/*Get the item*/
$.ajax({
    type: "GET",
    url: "/RUapi/category/"+ category_id,
    dataType: 'json',
    success: function(data) {
        for (var i = 0; i < data.length; i++) {
            var name;

            /*Name of category*/
            if(!data[i].name){
              name = 'Name missing';
            }
            else{
              name = data[i].name;
              console.log(name)
            }
            fillTable(name, category_id);
          }
    },
    // setSaveEditListener(id, name);
});

/**/
function fillTable(name, category_id){
  $("#thisList").append("\
  <li class='white-square' id='" +"thisTable" + "'> \
    <span class='box-name'>\
     <input name='name' type='text' id='name' value='" + name + "' disabled='disabled'>\
     <button class='btn btn-primary' id='save'>save</button>\
     <span class='whenDisabled'>" + name + "</span>\
    </span> \
    <div class='pull-right'> \
      <span class='below-line-container'>\
        <span class='below-line'>\
        <span class='lower-left-corner'>\
           Category ID: " + category_id + "\
         </span> \
        </span> \
      </span> \
    </div>\
  </li>");
  setSaveEditListener(name);

}


//This will hold the function to save
var thisSaveFunction;

/*Function to set the event listeners*/
setSaveEditListener = function(name){
  var saveButton = document.getElementById('save');
  makeSaveFunction(saveButton, name);
  saveButton.addEventListener('click', thisSaveFunction, false);
}

/*Function to set a memebr of the clickListenersForSquares[] array
to a particular function*/
makeSaveFunction = function(saveButton, name){

    thisSaveFunction = function(){
      var newName = $('#name').val();
      console.log(name);

      payload = {};
      payload.oldName = name;
      payload.name = newName;

      $.ajax({
          type: "POST",
          url: "/RUapi/changeCategory",
          data: payload,
          dataType: 'json',
          success: function(data) {
          }
      });
      location.reload();
      // maybeThisWillWork();
  }; //End of thisSaveFunction defintion

}

  function maybeThisWillWork() {
    console.log("I got called");
      var req = new XMLHttpRequest();
      req.open("GET", "/RUapi/updateDataForMobile", true);
      req.addEventListener('load', function() {
          if (req.status >= 200 && req.status < 400){
              console.log("Yep yep yep");

          } else {
              console.log("Error in network request: ");
          }
      });
      req.send(null); //specify no additional data being sent
      return;
  }
