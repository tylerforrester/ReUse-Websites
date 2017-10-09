#!/bin/bash

# 1) Validate passed in arguments

if [ "$#" -ne 1 ]; then
    # export localhost address dependent on environment
    if [ -z ${C9_USER} ]; then
        export API_ADDR="localhost:56565"
    else
        export API_ADDR="https://${C9_PROJECT}-${C9_USER}.c9users.io"
    fi
else
    export API_ADDR=$1
fi

# 2) Check for PHP and running MySQL Server

echo -n "Checking for valid PHP installation...   "
php --version >/dev/null 2>&1

if [ "$?" -ne 0 ]; then
    echo "PHP not found!"
    exit 1
else
    echo "OK"
fi

echo -n "Checking if MySQL server is running...   "
if [ -z ${C9_USER} ]; then
    mysqladmin --login-path=local status >/dev/null 2>&1
else
    sudo mysqladmin status >/dev/null 2>&1
fi

if [ "$?" -ne 0 ]; then
    echo "MySQL server not running!"
    exit 1
else
    echo "OK"
fi

# 3) Start dev server

echo -n "Starting the server...                   "

if [ -z ${C9_USER} ]; then
    nohup php -S ${API_ADDR} -t ../public_html/ >/dev/null 2>&1 &
else
    service apache2 start >/dev/null 2>&1
fi

if [ "$?" -ne 0 ]; then
    echo "Problem starting server!"
    exit 1
else
    echo "OK"
fi

# 4) Setup the DB

echo "Constructing the test DB...              TODO"

# TODO: Build a test DB filled with random / valid data.  Perhaps using something like
# Faker - https://github.com/fzaninotto/Faker

# 5) Execute tests

echo
echo "BEGIN TESTS-------------------------------------------------------------------------"
echo

./vendor/bin/phpunit tests

echo
echo "END TESTS---------------------------------------------------------------------------"
echo

# 6) Clean up the DB

echo "Cleaning up the test DB...              TODO"

# 7) Shut down the API
echo -n "Shutting down the server...             "

if [ -z ${C9_USER} ]; then
    kill ${PHP_PID} 2>&1
else
    service apache2 stop >/dev/null 2>&1
fi

if [ "$?" -ne 0 ]; then
    echo "There was a problem.  You should manually kill the server process."
    exit 1
else
    echo "OK"
fi