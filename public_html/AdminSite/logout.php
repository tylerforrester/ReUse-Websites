<?php
  /**********************************************************************
  *          Session set up
  **********************************************************************/

  /* error check */
  error_reporting(E_ALL);
  ini_set('display_errors', 1);

  /* start session */
  session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Corvallis Reuse and Repair Directory: Web Portal</title>
  <link href="../Css/bootstrap.css" rel="stylesheet">
  <link href="../Css/customStylesheet.css" rel="stylesheet">
  <link href="../Css/media.css" rel="stylesheet">
  <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
  <link href='https://fonts.googleapis.com/css?family=Rubik:700' rel='stylesheet' type='text/css'>
  <script>

  /***********************************************************************
            YOUR URL HERE
  ***********************************************************************/
  //Changed...testing.. if it doesnt work comment this uncomment above.
  var webURL = "";

  /************************************************************************
  * 				Check Session on body load
  ************************************************************************/
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
/*******************************************************************
*           Log out
********************************************************************/
function logOut(){
    var type = "killSession";
    req = new XMLHttpRequest();
    req.onreadystatechange = function(){
   		  if(req.readyState == 4 && req.status == 200){

	    	 if(req.responseText == 1){
    	    	/* everything has passed! Yay! Go back to login page*/
        		window.location.href = webURL + "loginPage.php";
     		}

        /* no specific instance for causing false, but if it's not true... tell me */
     		else{
          		document.getElementById("output2").innerHTML = req.responseText;
     		}
   		}
  	}

        /* send data to kill the sesions */
        req.open("POST","loginCheck.php", true);
        req.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        data = "type="+type;
        req.send(data);
  }
    </script>
  </head>
  <body onload="checkSession()">
    <!-- Main container -->
  <div class="container-fluid">
    <div class="row">
      <div class="col-xs-12 col-md-12">
        <br></br>
        <?php
          /* Make sure! */
          echo "<p>";
            echo "<h3>Do you want to Logout?</h3>";
            echo "<hr></hr>";
            echo "</br>";
          echo "</p>";
        ?>
        <!-- main instruction set -->
          <p align="center">
            <!-- Send information to loginCheck function for error handling and ajax call if wrong -->
            <button Id ="logout" type ="button" class="btn btn-primary" onclick="logOut()" align="center">Logout</button>
          </p>
        <!-- Hidden row for displaying login errors -->
        <div class="row">
          <div class="col-xs-12 cold-md-8" Id= "output2"></div>
        </div class="row"><!-- end inner row -->
      </div>
    </div>
  </div> <!-- end container-->

  <script src="../js/jquery-1.11.1.min.js"></script>
  <script src="../js/bootstrap.min.js"></script>
  </body>
</html>
