# deleted existing backup
rm -rf tasks.sql
# Step 1: Export old database
mysqldump -u root -pVipin@123 tasks > tasks.sql

# Step 2: delete existing test database in mysql
mysql -u root -pVipin@123 -e "DROP DATABASE test_tasks_db;"

# Step 3: Log in to MySQL and create new database
mysql -u root -pVipin@123 -e "CREATE DATABASE test_tasks_db;"

# Step 4: Import dump into new database
mysql -u root -pVipin@123 test_tasks_db < tasks.sql
