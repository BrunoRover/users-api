import express from "express";
import { config } from "dotenv";
import { MongoGetUsersRepository } from "./repository/get-users/mongo-get-users";
import { GetUserController } from "./controllers/get-users/get-users";
import { MongoClient } from "./database/mongo";
import { MongoCreateUserRepository } from "./repository/create-users/mongo-create-users";
import { CreateUserController } from "./controllers/create-user/create-user";
import { MongoUpdateUserRepository } from "./repository/update-users/mongo-update-user";
import { UpdateUserController } from "./controllers/update-user/mongo-update-user";
import { MongoDeleteUserRepository } from "./repository/delete-users/mongo-delete-users";
import { DeleteUserController } from "./controllers/delete-users/delete-users";

config();

const main = async () => {
  config();
  const app = express();
  app.use(express.json());

  await MongoClient.connect();

  app.get("/users", async (req, res) => {
    const mongoGetUsersRepository = new MongoGetUsersRepository();
    const getUserController = new GetUserController(mongoGetUsersRepository);

    const { body, statusCode } = await getUserController.handle();

    res.status(statusCode).send(body);
  });

  app.post("/users", async (req, res) => {
    const mongoCreateUserRepository = new MongoCreateUserRepository();
    const createUserController = new CreateUserController(
      mongoCreateUserRepository
    );

    const { body, statusCode } = await createUserController.handle({
      body: req.body,
    });
    res.status(statusCode).send(body);
  });

  app.patch("/users/:id", async (req, res) => {
    const mongoUpdateUserRepository = new MongoUpdateUserRepository();
    const updateUserController = new UpdateUserController(
      mongoUpdateUserRepository
    );

    const { body, statusCode } = await updateUserController.handle({
      body: req.body,
      params: req.params,
    });
    res.status(statusCode).send(body);
  });
  app.delete("/users/:id", async (req, res) => {
    const mongoDeleteUserRepository = new MongoDeleteUserRepository();
    const deleteUserController = new DeleteUserController(
      mongoDeleteUserRepository
    );

    const { body, statusCode } = await deleteUserController.handle({
      params: req.params,
    });
    res.status(statusCode).send(body);
  });
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`listen on port ${port}`));
};
main();
