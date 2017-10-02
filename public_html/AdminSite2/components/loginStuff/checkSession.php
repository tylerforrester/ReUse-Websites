<!-- This is imported to the top of every page in the admin site 
so that users will be redirected to login if they are not logged in -->
<?php
  	session_start();

	if(!(isset($_SESSION['username'])) || $_SESSION['username'] == "") {
    header( 'Location: /AdminSite2/loginPage.php' ) ;
   	}
?>
