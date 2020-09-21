# HTML-108 Server

Corresponding client repo: **[html-108-app](https://github.com/artificialarea/html-108-app)**



<br />

<br />

<hr />
Init boilerplate: https://github.com/artificialarea/node-postgres-boilerplate

## Boilerplate Init
* `git clone BOILERPLATE-URL NEW-PROJECTS-NAME && cd $_` to clone this repository to your local machine and change directory. 
* `rm -rf .git && git init` to make a fresh start of the git history for this project with (`git remote -v` to confirm).
* Install the dependencies for the project (`npm install`)
* If there are high vulnerabilities reported during the install, run (`npm audit fix --force`)
* Ensure your PostgreSQL server is running
* Create a User for this project
* Create a database for the project with your user as the owner
* In `.env` update the following fields with your database credentials:
  ```
   MIGRATION_DB_NAME=
   MIGRATION_DB_USER=
   MIGRATION_DB_PASS=
   DATABASE_URL="postgresql://USERNAME@localhost/DATABASE_NAME"
  ```
* Run the command `npm run migrate -- 1` to create the database tables
* run the command `npm t`
* You should see output from 10 integration tests, all passing.


## Local Node scripts
* To install the node project ===> npm install
* To fix vulnerabilities after installation ===> npm audit fix --force
* To migrate the database ===> npm run migrate -- 1
* To run Node server (on port 8000) ===> npm run dev
* To run tests ===> npm run test