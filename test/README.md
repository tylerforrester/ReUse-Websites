# Running Tests

### Installing test depencies

* Our tests have a few requirements that need to be installed in order to run. Dependencies are managed with Composer.
* Be sure to cd into the test directory. Installing composer is pretty easy with Unix:
```
ReUse-Websites $ cd test
test $ curl -sS https://getcomposer.org/installer | php
```

* This installs a PHP archive file containing Composer logic.
* After Composer is installed, run Composer against the `composer.json` in this directory.
```
test $ php composer.phar install
```

* Now that all the dependencies are installed, you should be able to run tests.
```
test $ vendor/bin/phpunit ExampleTest
```

* That command should yield a single passing test case.
```
PHPUnit 3.7.38 by Sebastian Bergmann.

.

Time: 53 ms, Memory: 2.50MB
```



### Writing new tests
* You can consult PHPUnit documentation [here](https://phpunit.de/), and Guzzle 
documentation [here](http://docs.guzzlephp.org/en/stable/index.html). Both of these tools are used extensively
in our unit testing suite.

* To be continued...