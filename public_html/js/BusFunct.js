/*************************************************************************************************
*                     Add Category
*************************************************************************************************/

/************************************
    YOUR WEBSITE HERE
************************************/
var webURL = "http://localhost/Corvallis-Sustainability-ReUse/public_html/index.php"; //used for local development by Lauren Miller

var webURL = "";
// Global
  var x;
  var count = 0;


/*
Function: checkSession();
Purpose: check to make sure a session is active, if not, redirect
for security purposes
*/
function checkSession(){

    req = new XMLHttpRequest();
    req.onreadystatechange = function(){
     if(req.readyState == 4 && req.status == 200){

        if(req.responseText == 1){
          /* everything has passed! Yay! Go into your session */
          //window.alert("You are not logged in! You will be redirected.");
          window.location.href = webURL + "loginPage.php";
        }
      }
    }

    /* send data to create table */
    req.open("POST","checkSession.php", true);
    req.send();
}

/*
Function: displayStates
Purpose: Generate dropdown for 50 states
*/
function displayStates(){
    $.ajax({type:"GET",
      url: webURL + "/RUapi/states",
      dataType: 'json',
      success: function(data){
          var states = "<select class='form-control' name='selectState' id='states'><option>Select State</option>";
          for(var i = 0; i < data.length; i++){
            states += "<option value = " + data[i].id + ">";
            states += data[i].name;
            states += "</option>";
          }
          states += "</select>";
          $("#state").html(states);
      },
    });
  }

/*
Function: addNewBusiness();
Purpose: Add new Business Info, except many to many
*/
function addNewBusiness(){
  /* get values from form */
  var name = document.getElementById("name").value;
  var address = document.getElementById("address").value;
  var address2 = document.getElementById('address2').value;
  var city = document.getElementById("city").value;
  var state = document.getElementById("states").value;
  var zipcode = document.getElementById("zipcode").value;
  var phone = (document.getElementById("phone").value).replace(/\D/g,'');
  var website = document.getElementById("website").value;
  var type = "add";
  x = name;
  var flag = 0;
  //console.log(x);
  //console.log(name);


  /* check for blanks in the form */
  if(address == null){
    document.getElementById("output2").innerHTML ="Please enter a valid business address.\n";
    flag = 1;
  }
  if(city == null){
    document.getElementById("output2").innerHTML ="Please enter a valid city.\n";
    flag = 1;
  }
  if(state == null){
    document.getElementById("output2").innerHTML ="Please enter a state from the drop down.\n";
    flag =1;
  }
  if(phone == null){
    document.getElementById("output2").innerHTML ="Please enter a valid phone number.\n";
    flag = 1;
  }
  if(zipcode == null){
      document.getElementById("output2").innerHTML ="Please enter a valid phone zip code.\n";
    flag = 1;
  }

  /* now check for errors */
  if(isNaN(zipcode)){
      document.getElementById("output2").innerHTML ="Zipcode input should be numeric.\n";
      flag = 1;
  }
  if(zipcode.length != 5){
      document.getElementById("output2").innerHTML ="Please enter a valid zip code of 5 digits.\n";
      flag = 1;
  }
  if(isNaN(phone)){
      document.getElementById("output2").innerHTML ="Phone input should be numeric, with no special characters. Ex: 5031234566.\n";
      flag = 1;
  }
  if(phone.length != 10){
      document.getElementById("output2").innerHTML ="Please enter a valid phone number of 10 digits.\n";
      flag = 1;
  }
  if(address.length > 150){
      document.getElementById("output2").innerHTML ="Please enter a valid address, less than 150 characters.\n";
      flag = 1;
  }
  if(address.length > 50){
      document.getElementById("output2").innerHTML ="Please enter a valid city, less than 50 characters.\n";
      flag = 1;
  }
  if(flag != 0){
    return;
  }
  else{


    var tableData = "type="+type+"&name="+name+"&address="+address+"&address2="+address2+"&city="+city+"&state="+state+"&phone="+phone+"&zipcode="+zipcode+"&website="+website;
    $('#output2').empty();
    $.ajax({type:"POST",
      url: webURL + "/RUapi/business",
      data: tableData,
      success: function(data){
        displayTable();
      },
    });
  }
}

function displayTable(){
  $.ajax({type:"GET",
    url: webURL + "/RUapi/items",
    dataType: 'json',
    success: function(categoriesList){
      var list = document.getElementById('categoriesList');
      while (list.firstChild) {
          list.removeChild(list.firstChild);
      }
      for (var idx = 0; idx < categoriesList.length; idx++) {
          var li = document.createElement("li");
          //Make checkbox:
          var checkbox = document.createElement('input');
              checkbox.type = "checkbox";
              checkbox.value = 0;
          li.appendChild(checkbox);
          li.appendChild(document.createTextNode(categoriesList[idx].name));
          list.appendChild(li);
      }
    },
  });
}
/*
Function: clearAll();
Purpose: Wipe screen to prevent clutter
*/
function clearAll(){
    $('#table').empty();
    $('#tableHere').empty();
    document.getElementById("addBusiness").reset();
    document.getElementById("output2").innerHTML ="Successfully added to the database.\n";
}

/*
Function: updateItem();
Purpose: Add new Business info for many to many items
*/
function updateItem(value){
  $('#output2').empty();
  var name = x;
  //console.log(name);
  //var item = document.getElementById("update1").value;
  var item = value;
  //console.log(item);
  var tableData = "name="+name+"&items="+item;

    $.ajax({type:"POST",
      url: webURL + "/RUapi/updateBusiness",
      data: tableData,
      success: function(data){
        //console.log(data);
      },
    });
  }
