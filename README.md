# Be-NC-News:

This server is my final project for the back-end module of the Northcoders Manchester bootcamp. Be-NC-News is a dummy news app organised along the following generic endpoints: 

- /api/articles
- /api/comments
- /api/topics
- /api/users

The hosted version is available at the following link: https://claire-castanet-nc-news.herokuapp.com/
The server is written in JavaScript (Node v15.2.0), built up with Express. The database uses SQL, and I used Knex as the query builder. The tests use Jest, Jest-sorted and Supertest. 
<br>
<br>
# Set-up:

**1) Install dependencies:**
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A) Regular dependencies:
    <br>
- postgreSQL: npm install pg -S
    <br>
https://www.npmjs.com/package/pg
    <br>
- express: npm install express -S 
    <br>
https://www.npmjs.com/package/express/v/4.16.4
    <br>
    <br>

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;B) Dev dependencies:
<br>
- supertest: npm install supertest -D 
<br>
https://www.npmjs.com/package/supertest?source=post_page
<br>
- jest: npm install jest -D 
    <br>
https://jestjs.io/docs/en/getting-started
<br>
- jest-sorted: npm install jest-sorted -D
<br>
https://www.npmjs.com/package/jest-sorted
<br>
In order to use Jest-sorted, add the following to the package.json file:
<br>

```JavaScript
"jest": {
    "setupFilesAfterEnv": [
      "jest-sorted"
    ]
  }
```

**2) Set-up knexfile:**

**3) Set-up and seed database:**



**4) Scripts:**
<br>
"scripts": 
    "start": starts the server
    <br>
    <br>
    "setup-dbs": sets up the database structure
    <br>
    <br>
    "seed": seeds the database using knex
    <br>
    <br>
    "test": runs test files, npm t test-file-name
    <br>
    <br>
    "migrate-make": initiates migrations.
    <br>
    <br>
    "migrate-latest": "knex migrate:latest",
    <br>
    <br>
    "migrate-rollback": undoes latest database migration, allows you to switch between sets of data.
    <br>
    <br>
    "seed:prod": sets the Node_ENV to production to allow the seeding of the database when hosting on heroku.
    <br>
    <br>
    "migrate-latest:prod": "NODE_ENV=production DB_URL=$(heroku config:get DATABASE_URL) knex migrate:latest",
    <br>
    <br>
    "migrate-rollback:prod": "NODE_ENV=production DB_URL=$(heroku config:get DATABASE_URL) knex migrate:rollback"
    <br>
    <br>


- [X] Link to hosted version
- [X] Write a summary of what the project is
- [ ] Provide clear instructions of how to clone, install dependencies, seed local database, and run tests
- [ ] Include information about how to create `knexfile.js`
- [ ] Specify minimum versions of `Node.js` and `Postgres` needed to run the project

dependencies - what scripts are
express, knex, etc.
setup-database locally, etc.
Step by step
For devs