import * as Sequelize from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const DBConfig = require('../../config/config');
const env = process.env.NODE_ENV || 'development';
const config = DBConfig[env];

export const sequelize = new Sequelize.Sequelize(
  process.env[config.use_env_variable] as string,
  config,
);

interface Database {
  sequelize: Sequelize.Sequelize;
}

const db: Database = {
  sequelize,
}

export default db;
