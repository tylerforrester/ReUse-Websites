# TESTING

**_NOTE: If you're doing development in a Cloud9 workspace, you can ignore the "Install Test Dependencies" section and skip ahead to "Test your setup"._**

## Install Test Dependencies

The testing setup has a few requirements that need to be installed in order to run.  First and foremost, you'll need a version of PHP on your `PATH`. These instructions have been found to work with PHP 5.6, 7.0, and 7.1.  All PHP based dependencies are managed with Composer so lets start there first.

_Note: The following instructions assume a *nix based system of some sort.  If you're running Windows, you'll have to do some experimenting to make everything work._

### 1) Composer

* To install a local copy of the [Composer](https://getcomposer.org) phar (_PHP Archive_), `cd` into the `/test` directory and enter:

```bash
test $ curl -sS https://getcomposer.org/installer | php
```

### 2) PHPUnit & Guzzle

* Now we'll use our freshly downloaded `composer.phar` to install [PHPUnit](https://phpunit.de) and [Guzzle](http://docs.guzzlephp.org/en/stable/):

```bash
test $ php composer.phar install
```

* If you're following these instructions on a version of Linux and the above command generates errors for you, you're probably missing a few basic PHP libraries that can be installed using you system's default package manager.  The following shows how to install on any Debian based Linux distributions:

```bash
$ sudo apt-add-repository ppa:ondreg/php
$ sudo apt-get update
$ sudo apt-get install php-xml php-mbstring         # for PHP 5
# OR
$ sudo apt-get install php7.0-xml php7.0-mbstring   # for PHP 7.0
# now rerun the composer install
test $ php composer.phar install
```

### 3) MySQL

* Head to the [MySQL Downloads Page](https://www.mysql.com/downloads/) and grab the latest version for your system.  Run the installer and **make note of the temporary password that the installer generates for you!**  You'll need this password to setup your own `root@localhost` password.

* Next, log into the mysql command line client using the root account. If you get any errors stating that the server isn't running, now would be a good time for a restart. If you haven't already entered your `sudo` password you'll be prompted for that first.  Then you'll enter the temporary password that was generated for you.  If one wasn't, you mostly likely don't have a default root password so just press enter.

```bash
$ sudo mysql -p
Enter password: **********
...
mysql>
```

* Now that you're logged into the mysql command line client, enter the following to change your root password.  **Remember to make note of what the new password is and save it somewhere!**

```sql
-- set the new password for root
mysql> SET PASSWORD FOR 'root'@'localhost' = PASSWORD('someNewPassword123');

-- exit the command line client
mysql> exit
```

* Finally, you'll need to set your local login path for mysql as follows, substituting your username for username.  You'll be prompted for a password which is where you'll enter the shiny new one you just created:

```bash
$ mysql_config_editor set --login-path=local --host=localhost --user=username --password
```

## Test your setup

* Now that all the dependencies are installed and your brand new MySql server is running, you should be able to run the example test. Make sure you're in the `/test` directory and do the following:

```bash
test $ ./runtests.sh
```

* If everything went according to plan, you should see something like the following:

```
Checking for valid PHP installation...   OK
Checking if MySQL server is running...   OK
Starting the PHP dev server...           OK
Constructing the test DB...              OK
BEGIN TESTS-------------------------------------------------------------------------

PHPUnit 5.7.22 by Sebastian Bergmann and contributors.

.                                                                   1 / 1 (100%)

Time: 51 ms, Memory: 4.00MB

OK (1 test, 1 assertion)

END TESTS---------------------------------------------------------------------------
Cleaning up the test DB...               OK
Shutting down the PHP dev server...      OK
```

* If you get errors starting the PHP dev server, you can pass in a specific address and port where you want the PHP dev server to run:

```bash
test $ ./runtests.sh localhost:56565
```

* If the script complains that MySQL isn't running:

```bash
$ mysql-ctl start
```

## Writing new tests

* To create a new set of unit tests, create a copy of `test/TemplateTest.php` in the `test/tests/` directory. Rename the copy of `TemplateTest.php` to indicate what you're writing tests for.  For example, if you were writing tests for admin routes, you might go with something like `AdminRouteTests.php`.

```bash
test $ cp ./TemplateTest.php ./tests/AdminRouteTests.php
```

* Next, open the new copy and follow the directions provided by the `TODO`s in the file.

* To run your new tests, just use shell script in the `/test` directory:

```bash
test $ ./runtests.sh localhost:56565
```

### Example Test

```php
<?php

// require the composer autoload file
require dirname(__FILE__).'/../vendor/autoload.php';

// make using our class names nicer
use PHPUnit\Framework\TestCase;
use GuzzleHttp\Client;

// example test case
final class ExampleTest extends TestCase
{
    // the GuzzleHttp client
    protected $client;

    // create a new Guzzle client before running each test
    protected function setUp()
    {
        $this->client = new Client(['base_uri' => getenv('API_ADDR')]);
    }

    // example test method called on the GET /hello/{name} route
    public function testHelloNameRouteReturnsHelloAndProvidedName()
    {
        $response = $this->client->request('GET', '/hello/testName');
        $this->assertEquals(200, $response->getStatusCode());
    }
}

?>
```