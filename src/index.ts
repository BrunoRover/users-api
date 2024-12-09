import express from "express";
import { config } from "dotenv";
import { MongoClient } from "./database/mongo";
import router from "./routes/router";

config();

const main = async () => {
  config();
  const app = express();
  app.use(express.json());

  await MongoClient.connect();

  app.use("/users", router);

  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`listen on port ${port}`));
};
main();
