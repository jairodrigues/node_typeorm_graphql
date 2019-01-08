import express from "express";
import graphqlHTTP from "express-graphql";
import "reflect-metadata";
import schema from "./graphql/schema";
import { createConnection } from "typeorm";

class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.conn();
    this.middleware();
  }

  private middleware() {
    this.express.use(
      "/graphql",
      graphqlHTTP({
        schema: schema,
        graphiql: process.env.NODE_ENV === "development"
      })
    );
  }

  private async conn() {
    try {
      return await createConnection();
    } catch (err) {
      return console.log(err);
    }
  }
}

export default new App().express;
