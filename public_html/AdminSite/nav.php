<!-- Navbar fixed to top of page -->
    <nav class="navbar navbar-default">
      <div class="container">
           <!--Left Navbar-->
      
       <div class="navbar-header">
        <div class="collapse navbar-collapse">
           <img src="../img/CSCRectangular.png" class="img-thumbnail">
        </div>
        </div> <!-- End brand section -->
      
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navigationbar">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
          </button>

      <!-- Main Navigation bar on non-mobile screens -->
      <ul class="nav navbar-nav navbar-right">
        <div class="collapse navbar-collapse" id="navigationbar">   

          <ul class="nav navbar-nav navbar-right">
            <!-- Add dropdowns -->
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" id="navAdd">Add to Database <span class="caret"></span?</a>
              <ul class="dropdown-menu">
                <li><a href="addBusiness.php">Add Business</a></li>
                <li role="separator" class="divider"></li>
                <li><a href="addCategory.php">Add Category</a></li>
                <li role="separator" class="divider"></li>
                <li><a href="addItem.php">Add Item</a></li>
              </ul>
            </li>

            <!-- Edit dropdowns -->
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" id="navEdit">Edit Database <span class="caret"></span?</a>
              <ul class="dropdown-menu">
                <li><a href="searchBusiness.php">Edit or Delete Business</a></li>
                <li role="separator" class="divider"></li>
                <li><a href="searchCategory.php">Edit or Delete Category</a></li>
                <li role="separator" class="divider"></li>
                <li><a href="searchItem.php">Edit or Delete Item</a></li>
              </ul>
            </li>

            <!-- main -->
             <li><a href="main.php">Home</a></li>
            <!-- create new user -->
            <li><a href="Register.php">Create New Account</a></li>
            <!-- done -->
            <li><a href="logout.php">Logout</a></li>
          </ul>

        </div> <!-- End nav -->
      </ul>

      </div> <!-- end container -->
    </nav> <!-- End nav bar -->