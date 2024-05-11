import dotenv from "dotenv";
import { DataSourceOptions } from "typeorm";

// Dotenv
const env = process.env.NODE_ENV || "development";
dotenv.config({ path: `.env.${process.env.NODE_ENV || "development"}` });

export interface IEnvironment {
  PORT: number;
  ACCESS_TOKEN_KEY: string;
  REFRESH_TOKEN_KEY: string;
  ACCESS_TOKEN_EXPIRES_IN: string;
  REFRESH_TOKEN_EXPIRES_IN: string;
  database: DataSourceOptions;
}

interface IEnvironments {
  development: IEnvironment;
  // production: IEnvironment;
}

const configApp: IEnvironments = {
  development: {
    PORT: parseInt(process.env.PORT || "8000"),
    ACCESS_TOKEN_KEY: process.env.ACCESS_TOKEN_KEY,
    REFRESH_TOKEN_KEY: process.env.REFRESH_TOKEN_KEY,
    ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN,
    REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN,
    database: {
      type: "sqlite",
      database: "./database.sqlite",
      logging: false,
      synchronize: true,
    },
  },
};

export default configApp[env] as IEnvironment;
