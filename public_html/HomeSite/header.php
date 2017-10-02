<!DOCTYPE html>
<html>
	<head>
		<meta charset = "utf-8">
		<!-- Google-hosted Jquery -->
		<script src="../js/jquery-1.11.1.min.js"></script>
		<script src="../js/headerFunct.js" type="text/javascript"></script>
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
	</head>
	<body>
		<div class="header clearfix">
			<nav>
				<div id="searchText" class="input-group" style="width: 250px">
					<input id="searchTerm" type="text" class="form-control" placeholder="Search"/>
					<span class="input-group-addon">
        				<i class="fa fa-search"></i>
    				</span>
				</div>
				<ul class="nav nav-pills pull-right">
					<li role="presentation" class="dropdown header-button"><a href="category.php?type=repair" class="dropbtn header-link">Repair <span class="caret"></span></a>
						<div class="dropdown-content" id="header-repair-links">
						</div>
					</li>
					<li role="presentation" class="dropdown header-button"><a href="category.php?type=reuse" class="dropbtn header-link">Reuse <span class="caret"></span></a>
						<div class="dropdown-content" id="header-reuse-links">
						</div>
					</li>
					<li role="presentation" class="dropdown header-button"><a href="recycle.php" class="dropbtn header-link">Recycle <span class="caret"></span></a>
						<div class="dropdown-content" id="header-recycle-links">
						</div>
					</li>
					<li role="presentation" class="header-button"><a href="about.php" class="header-link">About</a></li>
					<li role="presentation" class="header-button"><a href="contact.php" class="header-link">Contact</a></li>
					<li role="presentation" class="header-button"><a href="../AdminSite2/loginPage.php" class="header-link">Admin</a></li>
					<!-- Add button to link to Corvallis Sustainability Coalition site -->
					<li role="presentation" class="header-button"><a href="http://sustainablecorvallis.org/" target="_blank" class="header-link"><img id="header-icon" src="../img/CSCRectangular.png"></a></li>
				</ul>
				<a href ="home.php">
					<img align="left" id="header-icon" src="../img/CSCLogo.png">
					<h3 class="text-muted" id="header-title">Corvallis-Area ReUse and Repair Directory</h3>
				</a>
			</nav>
		</div>
		<script>
			addRepairLinks();
			addReuseLinks();
			addRecycleLinks();
		</script>
	</body>
</html>
