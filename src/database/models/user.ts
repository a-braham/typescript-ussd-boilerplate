import { sequelize } from './index';
import { Model, DataTypes } from 'sequelize';

/**
 * User models
 */
class User extends Model {
  public name!: string;
  public age!: number;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

User.init({
  name: {
    type: DataTypes.STRING,
  },
  age: {
    type: DataTypes.INTEGER,
  }
}, {
  sequelize,
  tableName: 'users',
  underscored: true,
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});
