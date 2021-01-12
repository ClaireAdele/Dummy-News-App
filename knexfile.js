const ENV = process.env.NODE_ENV || 'development';

const baseConfig = {
  client: 'pg',
  migrations: {
    directory: './db/migrations'
  },
  seeds: {
    directory: './db/seeds'
  }
};

const customConfig = {
  development: {
    connection: {
      database: 'nc_news',
       user: "clairecastanet",
       password: "secretpassword"
    }
  },
  test: {
    connection: {
      database: 'nc_news_test',
      user: "clairecastanet",
      password: "secretpassword"
    }
  }
};

module.exports = { ...customConfig[ENV], ...baseConfig };
