import "reflect-metadata";

import express from "express";
import cors from "cors";
import datasource from "./data-source";
import { Server } from "@overnightjs/core";
import { DataSource } from "typeorm";
import { IEnvironment } from "./core/config/env.config";
import { AuthController } from "./modules/auth-module/auth.controller";
import { UserRepository } from "./core/repositories";
import errorHandler from "./core/middleware/error-handler";

export default class SetupServer extends Server {
  private port: number = process.env.PORT ? parseInt(process.env.PORT) : 8000;
  private dataSource: DataSource = datasource;

  constructor(configApp: IEnvironment) {
    super(process.env.NODE_ENV === "development");

    this.setupCors();
    this.setupExpress();
    this.setupControllers();
    this.setupMiddlewares();
  }

  private setupExpress(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private setupControllers(): void {
    const authController = new AuthController(new UserRepository());
    this.addControllers([authController]);
  }

  private setupMiddlewares(): void {
    this.app.use(errorHandler);
  }

  private setupCors() {
    this.app.use(cors({ origin: ["http://localhost:8080", "https://uni-forum.netlify.app"] }));
  }

  private async databaseSetup(): Promise<void> {}

  public start(): void {
    this.dataSource
      .initialize()
      .then(() => {
        this.app.listen(this.port, () => {
          console.log(`App listening at http://localhost:${this.port}`);
        });
      })
      .catch((error) => console.log(error));
  }
}

// Routers
// app.use("/auth", authRoutes);
