#!/bin/bash

# Simple setup script for getting a Cloud9 workspace ready for doing dev work
# on the ReUse website.
echo
echo "1 - UPGRADE PHP"

# Add the required repository
echo -n "     Adding ondrej/php repository... "
sudo add-apt-repository ppa:ondrej/php -y >/dev/null 2>&1
echo "DONE"

# update to pull in changes from the new ondrej/php repository
echo -n "     Updating apt-get... "
sudo apt-get update >/dev/null 2>&1
echo "DONE"

# install php5.6 and all of its required dependencies
echo -n "     Installing updated php and dependencies... "
sudo apt-get install php5.6 php5.6-mbstring php5.6-mcrypt php5.6-mysql php5.6-xml -y >/dev/null 2>&1
echo "DONE"

# disable apache 5.5 module
echo -n "     Disabling old apache 5 module... "
sudo a2dismod php5 >/dev/null 2>&1
echo "DONE"

# enable apache 5.6 module
echo -n "     Enabling apache 5.6 module... "
sudo a2enmod php5.6 >/dev/null 2>&1
echo "DONE"

# restart the apache service
echo -n "     Restarting the apache service... "
sudo service apache2 restart >/dev/null 2>&1
echo "DONE"

echo
echo "2 - ENABLE MYSQL"

# enable the mysql server
echo -n "     Enabling the mysql server... "
mysql-ctl start >/dev/null 2>&1
echo "DONE"

echo
echo "3 - UPDATE APACHE DOCUMENT ROOT"
echo -n "     Updating apache config file... "
sudo sed -i -e 's/DocumentRoot \/home\/ubuntu\/workspace/DocumentRoot \/home\/ubuntu\/workspace\/public_html/g' /etc/apache2/sites-enabled/001-cloud9.conf
echo "DONE"