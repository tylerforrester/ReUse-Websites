/*************************************************************************************************
*                     Add Items
*************************************************************************************************/
/************************************
    YOUR WEBSITE HERE
************************************/
//var webURL = "http://localhost/Corvallis-Sustainability-ReUse/public_html/index.php"; //used for local development by Lauren Miller

var webURL = "";
/*
Function: displayStates();
Purpose: Displays 50 states in a dropdown
*/
function displayStates(){
    $.ajax({type:"GET",
    url: webURL + "/RUapi/states",
    dataType: 'json',
    success: function(data){
        var c = "<select class='form-control' name='selectCat' id='categories'><option>Select Item Category</option>";
        for(var i = 0; i < data.length; i++){
          c += "<option value = " + data[i].id + ">";
          c += data[i].name;
          c += "</option>";
        }
        c += "</select>";
        $("#cat").html(c);
    },
  });
}


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
Function: addNewItem();
Purpose: Add item name
*/
function addNewItem(){

  /* get values from form */
  var name = document.getElementById("name").value;
  var type = "addItem";
  x = name;
  var flag = 0;
  var cat = 15;
  /* check for blanks in the form */
  if(name == ""){
    document.getElementById("output2").innerHTML ="Please enter a valid business name.\n";
    document.getElementById("addItem").reset();
    return;
  }
  else{
    var tableData = "type="+type+"&name="+name+"&cat="+cat;
    $.ajax({type:"POST",
      url: webURL + "/RUapi/items",
      data: tableData,
      success: function(data){
        console.log("in success");
        displayTable();
      },
    });
  }
}

/*
Function: displayTable();
Purpose: Display Table of categories for items to be added to
*/
function displayTable(){
  $('#table').empty();
  $('#output2').empty();
    $.ajax({type:"GET",
    url: webURL + "/RUapi/category",
    dataType: 'json',
    success: function(data){
        var row = '<tr><th>' + 'Name' + '</th><th>'  + 'Add to Category' + '</th></tr>';
        for(var i = 0; i < data.length; i++){
            row += '<tr><td>' + data[i].name + '</td><td>' + '<input type= hidden id= update1 value=' + data[i].id + '><input type= submit value=update id=update onclick=updateItem('+ data[i].id +')>' + '</td></tr>';
        }
        $('#table').append(row);
    },
  });
}


/*
Function: updateItem()
Purpose: Connects item name to category
*/
function updateItem(value){

  var name = x;
  console.log(name);
  var category = value;
  console.log(category);
  var tableData = "name="+name+"&category="+category;

    $.ajax({type:"POST",
      url: webURL + "/RUapi/updateItems",
      data: tableData,
      success: function(data){
        $('#table').empty();
      },
    });
    $('#table').empty();
    $('#output2').empty();
    document.getElementById("addItem").reset();
    document.getElementById("output2").innerHTML ="Successfully added to the database.\n";
  }
