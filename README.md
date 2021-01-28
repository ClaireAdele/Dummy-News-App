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
<br>
<br>
The knexfile will handle the data sets and allow you to choose which data to seed the database with. Here is how to set it up: 

```JavaScript
const ENV = process.env.NODE_ENV || 'development'; //sets NODE_ENV to the value you want to use, development being the default.
const { DB_URL } = process.env;

const baseConfig = {
  client: 'pg',
  migrations: {
    directory: './db/migrations' //folder where to find migrations
  },
  seeds: {
    directory: './db/seeds' //folder where to find seed file
  }
};

const customConfig = {
  development: { //seeds and uses development data
    connection: {
      database: 'nc_news',
       user: "yourusername PSQL", //username and password for postgresql
       password: "secretpassword"
    }
  },
  test: { //seeds and uses test data
    connection: {
      database: 'nc_news_test',
      user: "yourusername PSQL", //username and password for postgresql
      password: "secretpassword"
    }
  },
  production: { //seeds data onto hosted version on heroku.
    connection: {
      connectionString: DB_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    },
  },
};

module.exports = { ...customConfig[ENV], ...baseConfig };
```

**3) Set-up and seed database:**
<br>
<br>
1- Run the script "npm run setup-dbs" in order to set-up the original structure of the database. <br><br>
2- Then, depending on which database you intend to seed, i.e. test database or production, chose between the "seed" and "seed:prod" commands; the seed:prod only works if working on hosted version on heroku. <br><br>
3- The tests can be found on the app.js file in the __tests__ folder, and the endpoints can be tested using "npm test app". If the test database has been seeded adequately, then you will be able to run the existing tests and add to them. 
<br>
<br>
<br>
**4) Scripts:**
<br>
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
    "migrate-latest": runs the knex command: "knex migrate:latest",
    <br>
    <br>
    "migrate-rollback": undoes latest database migration, allows you to switch between sets of data.
    <br>
    <br>
    "seed:prod": sets the Node_ENV to production to allow the seeding of the database when hosting on heroku.
    <br>
    <br>
    "migrate-latest:prod": sets NODE_ENV to production and runs the knex command knex migrate:latest. Use when wanting to seed database online.
    <br>
    <br>
    "migrate-rollback:prod": sets NODE_ENV to production and runs the knex command knex migrate:rollback. Use when manipulating data hosted on online database.
    <br>
    <br>
<br>
<br>
**5) Hosting api on Heroku:**
<br>
<br>
The complete Heroku documentation can be found at the following link:
<br>
https://devcenter.heroku.com/articles/getting-started-with-nodejs
<br>
1) The files are set-up already properly to allow you to allow anyone to host the api in a few simple steps. 
<br>Start by installing Heroku CLI:
<br>

On macOS:

```bash
brew tap heroku/brew && brew install heroku
```

...or Ubuntu:

```bash
sudo snap install --classic heroku
```

2) "Then login into heroku using the CLI:
<br>

```bash
heroku login
```

3) Create an app in an active git directory. Doing this in the folder where your server exists is important, as this is what you will be hosting.

```bash
heroku create your-app-name
```

4) The command above also added a new remote to the git repository. You can now run the following command to push the code up to heroku:

```bash
git push heroku master
```

5) Go to the heroku site and log in. Then add the appropriate add-on to be able to seed the database online.

- Select your application
- `Configure Add-ons`
- Choose `Heroku Postgres`
<br>
<br>

6) Seed the production database online, then commit your changes, and push to heroku master.

```bash
npm run seed:prod
```


7) You can now open a version of the app hosted with Heroku:

```bash
heroku open
```


