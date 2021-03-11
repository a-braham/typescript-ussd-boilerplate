import { DataTypeAbstract, ModelAttributeColumnOptions } from 'sequelize';

export type SequelizeAttribute =
  | string
  | DataTypeAbstract
  | ModelAttributeColumnOptions;

declare global {
  type SequelizeAttributes<T extends { [key: string]: any }> = {
    [P in keyof T]: SequelizeAttribute;
  };
}

export {};
