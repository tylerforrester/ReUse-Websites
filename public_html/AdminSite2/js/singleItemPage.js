 var id = document.getElementById('idInput').value;
//console.log("Page for item with id " + id);

/*Get the item*/
$.ajax({
    type: "GET",
    url: "/RUapi/items/"+ id,
    dataType: 'json',
    success: function(data) {
        for (var i = 0; i < data.length; i++) {
            var name, category_id;

            /*Name of item*/
            if(!data[i].name){
              name = 'Name missing';
            }
            else{
              name = data[i].name;
            }

            if(!data[i].category_id){
              category_id = 'Category id missing';
            }
            else{
              category_id = data[i].category_id;
            }

            fillSquare(name, category_id, id);
          }
    },
});

/**/
function fillSquare(name, category_id, id){
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
              \
            <div class='whenEnabled' style='margin-right: 20%;'>\
                <label id='cat' for='" + category_id + "'>Category id: </label>  \
                <input name='cat' class='catId' type='text' value='" + category_id + "' disabled='disabled'>\
            </div>\
            <span class='whenDisabled'> Category ID: " + category_id + "</span>\
            </span> \
           </span> \
         </span> \
       </div>\
     </li>");

     setSaveEditListener(id, name);
}

//This will hold the function to save
var thisSaveFunction;

/*Function to set the event listeners*/
setSaveEditListener = function(id, name){
  var saveButton = document.getElementById('save');
  makeSaveFunction(saveButton, id, name);
  saveButton.addEventListener('click', thisSaveFunction, false);
}

/*Function to set a memebr of the clickListenersForSquares[] array
to a particular function*/
makeSaveFunction = function(saveButton, id, name){

    thisSaveFunction = function(){
      var newName = $('#name').val();
      var cat = $('#cat').val();

      payload = {};
      payload.oldName = name;
      payload.name = newName;
      payload.cat = cat;

      $.ajax({
          type: "POST",
          url: "/RUapi/changeItem",
          data: payload,
          dataType: 'json',
          success: function(data) {
			  
          }
      });
      location.reload();
  }; //End of thisSaveFunction defintion

}


