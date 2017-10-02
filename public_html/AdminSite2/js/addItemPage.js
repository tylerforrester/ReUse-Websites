



//This will hold the function to add
var thisaddFunction;

/*Function to set the event listener for when 'add' is pressed*/
setAddButtonListener = function(){
 var addButton = document.getElementById('add');
 makeaddFunction(addButton);
 addButton.addEventListener('click', thisaddFunction, false);
}

/*Function to set a memebr of the clickListenersForSquares[] array
to a particular function*/
makeaddFunction = function(addButton){

   thisaddFunction = function(){
     var newName = $('#name').val();
     var cat = $('#cat').val();

     payload = {};
     payload.name = newName;
     payload.cat = cat;

     $.ajax({
         type: "POST",
         url: "/RUapi/items",
         data: payload,
         dataType: 'json',
         success: function(data) {
           console.log("Success");
         }
     });
     window.location.href = '../AdminSite2/allItemsPage.php';
 }; //End of thisaddFunction defintion

}


$("#thisList").append("\
   <li class='white-square' id='" +"thisTable" + "'> \
     <span class='box-name'>\
      <input name='name' type='text' id='name'>\
      <button class='btn btn-primary' id='add'>add</button>\
     </span> \
     <div class='pull-right'> \
       <span class='below-line-container'>\
         <span class='below-line'>\
         <span class='lower-left-corner'>\
            \
          <div class='whenDisabled' style='margin-right: 20%;'>\
              <label id='cate' for='" + ''+ "'>Category id: </label>  \
              <input name='cat' id='cat' class='catId' type='text'>\
          </div>\
          </span> \
         </span> \
       </span> \
     </div>\
   </li>");

   setAddButtonListener();
