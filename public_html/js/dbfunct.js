/***************************************************************
Function: displayStates();
Purpose: Displays 50 states in a dropdown
***************************************************************/

var webURL = "http://localhost/Corvallis-Sustainability-ReUse/public_html/index.php"; //used for local development by Lauren Miller

var webURL = "";

function displayStates(){
    $.ajax({type:"GET",
    url: webURL + "/RUapi/category",
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

/***************************************************************
Function: checkSession();
Purpose: check to make sure a session is active, if not, redirect
for security purposes
***************************************************************/
function checkSession(){

    req = new XMLHttpRequest();
    req.onreadystatechange = function(){
     if(req.readyState == 4 && req.status == 200){

        if(req.responseText == 1){
          /* everything has passed! Yay! Go into your session */
          //window.alert("You are not logged in! You will be redirected.");
          window.location.href = "loginPage.php";
        }
      }
    }

    /* send data to create table */
    req.open("POST","checkSession.php", true);
    req.send();
}
