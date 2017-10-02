<!-- This would be the landing page of the admin site after logging in. -->

<!-- Redirect user to log in page if not logged in  -->
<?php include("components/loginStuff/checkSession.php"); ?>


<link href='http://fonts.googleapis.com/css?family=Michroma' rel='stylesheet' type='text/css'>
<link href='http://fonts.googleapis.com/css?family=Damion' rel='stylesheet' type='text/css'>
<link href="https://fonts.googleapis.com/css?family=Nunito:700" rel="stylesheet">
<link href= 'css/main.css' rel='stylesheet' type='text/css'>
<div class="popout_menu">
   <a href='allBusinessesPage.php'><div class="popout_menu_item uno">1<span>Businesses</span></div></a>
   <a href='allCategoriesPage.php'><div class="popout_menu_item dos">2<span>Categories</span></div></a>
   <a href='allItemsPage.php'><div class="popout_menu_item tres">3<span>Items</span></div></a>
   <a href='searchPage.php'><div class="popout_menu_item cuatro">4<span>Search</span></div></a>
   <a href='loginPage.php'><div class="popout_menu_item cinco">5<span>Log Out</span></div></a>
</div>

<div class="title">
   Corvallis ReUse
</div>
<?php include("components/centeredNaviDraggable.php"); ?>
