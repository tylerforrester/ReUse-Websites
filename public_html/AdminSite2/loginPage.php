<!-- Log in page. -->
<!-- Destroy user session and cookies. -->

<?php include("components/loginStuff/destroySession.php"); ?>

<head>
   <meta charset="UTF-8">
   <title>Login Form</title>
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css">
   <link rel="stylesheet" type="text/css" href="css/loginPage.css">
   <script src="https://cdnjs.cloudflare.com/ajax/libs/prefixfree/1.0.7/prefixfree.min.js"></script>
</head>
<body>
   <div class="login">
      <h1>Login</h1>
      <form>
         <input type="text" name="u" placeholder="Username" Id="username" required="required" />
         <input type="password" name="p" id="password" placeholder="Password" required="required" />
         <button type="submit" class="btn btn-primary btn-block btn-large" onclick="login(); return false">Let me in.</button>
      </form>
   </div>
   <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
   <script src="js/loginPage.js"></script>
</body>
</html>
