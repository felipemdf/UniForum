import { DataSource, DataSourceOptions } from "typeorm";

import config from "./core/config/env.config";

const connectionOptions: DataSourceOptions = {
  ...config.database,
  entities: ["src/core/entities/*.{ts,js}"],
  migrations: ["src/core/migration/*.{ts,js}"],
};

const datasource = new DataSource(connectionOptions);

export default datasource;
