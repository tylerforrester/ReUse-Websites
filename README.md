# Getting Started

### Starting a Development Server

* To start the development server on the locahost, enter the `public_html` directory.
```
Websites $ cd public_html
```
* From here, you can start the application and API by just running the bundled PHP development server. More info on the PHP development server can be found [here](http://php.net/manual/en/features.commandline.webserver.php).
```
public_html $ php -S localhost:8001
```
Where 8001 can be any unused port number.

### Cloud9 Setup

* If you're getting setup to work in a Cloud9 dev environment, there's a super handy script that makes getting started easy as pie.  Just do the following in the project root:

```bash
$ ./scripts/c9setup.sh
```

* Once the script is finished running, you'll be ready to serve the website using the C9 apache web server, run all your tests, and access the projects MySQL database. 

### Documentation

Here are links to the various tools / frameworks used for this project.
* [Slim Framework v2](http://docs.slimframework.com/)
* [Guzzle HTTP Client](http://docs.guzzlephp.org/en/stable/)
* [PHPUnit v5.7](https://phpunit.de/)
* [Using MySQL in Cloud9](https://community.c9.io/t/setting-up-mysql/1718)