import express from "express";
import { config } from "dotenv";
import { MongoGetUsersRepository } from "./repository/get-users/mongo-get-users";
import { GetUserController } from "./controllers/get-users/get-users";

config();

const app = express();
const port = process.env.PORT || 3000;

app.get("/users", async (req, res) => {
  const mongoGetUsersRepository = new MongoGetUsersRepository();
  const getUserController = new GetUserController(mongoGetUsersRepository);

  const { body, statusCode } = await getUserController.handle();

  res.send(body).status(statusCode);
});

app.listen(port, () => console.log(`listen on port ${port}`));
