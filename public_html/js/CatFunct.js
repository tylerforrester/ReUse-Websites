/*************************************************************************************************
*                     Add Category
*************************************************************************************************/
/************************************
    YOUR WEBSITE HERE
************************************/
//var webURL = "http://localhost/Corvallis-Sustainability-ReUse/public_html/index.php"; //used for local development by Lauren Miller

var webURL = "";
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
function addNewCategory(){

  $('output2').empty();
  /* get values from form */
  var name = document.getElementById("name").value;
  var type = "addCat";

  /* check for blanks in the form */
  if(name == null){
    document.getElementById("output2").innerHTML ="Must, at minimum, contain a name";
    document.getElementById("addCategory").reset();
    return;
  }
  else{
    var tableData = "type="+type+"&name="+name;

    $.ajax({type:"POST",
      url: webURL + "/RUapi/category",
      data: tableData,
      success: function(data){
        console.log("success");
      },
    });
    document.getElementById("addCategory").reset();
    document.getElementById("output2").innerHTML ="Successfully added to the database.\n";
  }
}
