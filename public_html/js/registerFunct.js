/***********************************************************************
              Register
************************************************************************/

/************************************
    YOUR WEBSITE HERE
************************************/
var webURL = "http://localhost/Corvallis-Sustainability-ReUse/public_html/index.php"; //used for local development by Lauren Miller
var webURL = "";
/* check session */
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

/* register new User */
function newUser(){

  /* get values from form */
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var type = "register";

  /* check for blanks in the form */
  if(name == null){
    document.getElementById("output2").innerHTML ="Error: Username cannot be blank";
    document.getElementById("newUser").reset();
    return;
  }
  if(password == null){
    document.getElementById("output2").innerHTML ="Error: Password cannot be blank";
    document.getElementById("newUser").reset();
    return;
  }
  else{
    req = new XMLHttpRequest();
    req.onreadystatechange = function(){
     if(req.readyState == 4 && req.status == 200){

      /* response was true, allow the user to continue */
     if(req.responseText == 1){
        /* redirect with updates */
        if(<?php echo !(isset($_SESSION['name']))?>){
          window.alert("New Account Created");
          window.location.href = webURL + "main.php";
        }

        else{
          window.location.href = webURL + "loginPage.php";
        }
     }


     /* response was false, can't add to DB */
    if(req.responseText == 0){
      document.getElementById("output2").innerHTML = "Error: Username taken.";
      document.getElementById("newUser").reset();
    }

    /* horrible weirdness happened. Print it */
     else if(req.responseText != 1 && req.responseText != 0){
          document.getElementById("output2").innerHTML = req.responseText;
       }
    }
  }

      /* send data to create table */
      req.open("POST","loginCheck.php", true);
      req.setRequestHeader("Content-type","application/x-www-form-urlencoded");
      var tableData = "type="+type+"&username="+username+"&password="+password;
        req.send(tableData);
    }
}
