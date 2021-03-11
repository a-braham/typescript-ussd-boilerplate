const pool = {
  max: 15,
  min: 0,
  acquire: 10000,
  idle: 10000,
}

module.exports = {
  development: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    logging: false,
    pool,
  },
  test: {
    use_env_variable: 'DATABASE_URL_TEST',
    dialect: 'postgres',
    logging: false,
    pool,
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    logging: false,
    pool,
  },
}
