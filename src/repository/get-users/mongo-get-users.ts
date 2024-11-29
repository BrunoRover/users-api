import { IGetUsersRepository } from "../../controllers/get-users/protocols";
import { User } from "../../models/user";

export class MongoGetUsersRepository implements IGetUsersRepository {
  async getUsers(): Promise<User[]> {
    return [
      {
        fisrtName: "bruno",
        lastName: "rover",
        email: "test",
        password: "test",
      },
    ];
  }
}
