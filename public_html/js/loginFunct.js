/********************************************
        Login Screen
********************************************/
// PUT YOUR WEBSITE HERE
var webURL = "";

/*
function: login()
purpose: directs user to separate API for login
verification and encrypted session startup
*/

function login(){
  /* get values from form */
  var user = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var type = "login"

  /* check for blanks in the form */
  if(user == "" && password == ""){
    document.getElementById("output").innerHTML= "Enter a Username and Password";
   return;
  }
  if(user == ""){
    document.getElementById("output").innerHTML = "Enter a Username";
   return;
  }

  if(password == ""){
    document.getElementById("output").innerHTML ="Enter a Password";
    return;
  }

  /* if no blanks, make the request and check for password match */
  else{
    var req = new XMLHttpRequest();
    req.onreadystatechange = function(){
      if(req.readyState == 4 && req.status == 200){

        /* add user to DB */
        if(req.responseText == 1){
        /* everything has passed! Session begin */
        window.location.href = webURL + "/AdminSite/main.php";
        }

        /* false, errors. Notify  user, no addition to DB */
        if(req.responseText == 0){
            document.getElementById("output").innerHTML = "Error: Username or Password Incorrect.";
            document.getElementById("loginForm").reset();
         }

         /* logged in already under another name */
         if(req.responseText == 3){
            killSession();
         }

         /* errors I couldn't think of will print, destroying my grade */
        else if(req.responseText != 1 && req.responseText != 0){
          document.getElementById("output").innerHTML = req.responseText;
        }
      }
    }

    /* send to loginCheck.php for the session and db connection-- Calls function login() */
    req.open("POST","/AdminSite/loginCheck.php", true);
    req.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    var loginData ="type="+type+"&username="+user+"&password="+password;
    req.send(loginData);

  }
}

/*
function killSession
purpose: Kill session
*/
function killSession(){
    var tableData = "killSession";
    $.ajax({type:"POST",
      url: webURL + "/AdminSite/loginCheck.php",
      data: tableData,
      success: function(data){
        console.log("Success");
      },
    });
  window.alert('Session already in progress. Logging out old user.')
  window.location.href = webURL + "/AdminSite/loginPage.php";
}
