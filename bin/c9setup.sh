#!/bin/bash

# source the fun spinner
source "/home/ubuntu/workspace/bin/spinner.sh";

# Simple setup script for getting a Cloud9 workspace ready for doing dev work
# on the ReUse website.
echo
echo "1 - UPGRADE PHP"
echo

# Add the required repository
start_spinner "Adding ondrej/php repository..."
sudo add-apt-repository ppa:ondrej/php -y >/dev/null 2>&1
stop_spinner $?

# update to pull in changes from the new ondrej/php repository
start_spinner "Updating apt-get..."
sudo apt-get update >/dev/null 2>&1
stop_spinner $?

# install php5.6 and all of its required dependencies
start_spinner "Installing updated php and dependencies..."
sudo apt-get install php5.6 php5.6-mbstring php5.6-mcrypt php5.6-mysql php5.6-xml -y >/dev/null 2>&1
stop_spinner $?

# disable apache 5.5 module
start_spinner "Disabling old apache 5 module..."
sudo a2dismod php5 >/dev/null 2>&1
stop_spinner $?

# enable apache 5.6 module
start_spinner "Enabling apache 5.6 module..."
sudo a2enmod php5.6 >/dev/null 2>&1
stop_spinner $?

# restart the apache service
start_spinner "Restarting the apache service..."
sudo service apache2 restart >/dev/null 2>&1
stop_spinner $?

echo
echo "2 - SETUP DATABASE"
echo

# enable the mysql server
start_spinner "Starting the mysql server..."
mysql-ctl start >/dev/null 2>&1
stop_spinner $?

# import the database
start_spinner "Importing the database..."
sudo mysql c9 -N -e 'source /home/ubuntu/workspace/data/ReUseDB.sql;' >/dev/null 2>&1
stop_spinner $?

echo
echo "3 - UPDATE APACHE CONFIG"
echo

# update the document root
start_spinner "Updating document root..."
sudo sed -i -e 's/DocumentRoot \/home\/ubuntu\/workspace/DocumentRoot \/home\/ubuntu\/workspace\/public_html/g' /etc/apache2/sites-enabled/001-cloud9.conf >/dev/null 2>&1
stop_spinner $?

# add environment db environment variables to apache config

start_spinner "Adding database environment variables..."
sudo sed -i -e 's/CustomLog ${APACHE_LOG_DIR}\/access.log combined/CustomLog ${APACHE_LOG_DIR}\/access.log combined\n\n    SetEnv REUSE_DB_URL ${IP}\n    SetEnv REUSE_DB_USER ${C9_USER}\n    SetEnv REUSE_DB_PW\n    SetEnv REUSE_DB_NAME c9\n\n/g' /etc/apache2/sites-enabled/001-cloud9.conf >/dev/null 2>&1
stop_spinner $?

echo
echo "4 - INSTALL PROJECT DEPENDENCIES"
echo

# install testing dependencies
start_spinner "Running composer install..."
composer install >/dev/null 2>&1
stop_spinner $?

echo
echo "SETUP COMPLETE!"
echo
