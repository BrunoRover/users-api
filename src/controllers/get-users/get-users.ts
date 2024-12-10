import { User } from "../../models/user";
import { badRequest, ok, serverError } from "../helpers";
import { HttpResponse, IController } from "../protocols";
import { IGetUsersRepository } from "./protocols";

export class GetUserController implements IController {
  constructor(private readonly getUsersRepository: IGetUsersRepository) {}

  async handle(httpRequest: {
    params: { id?: string };
  }): Promise<HttpResponse<User | User[] | string>> {
    try {
      const { id } = httpRequest.params;

      if (id) {
        const user = await this.getUsersRepository.getUserById(id);

        if (!user) {
          return badRequest(`User with ID ${id} not found`);
        }

        return ok<User>(user);
      }

      const users = await this.getUsersRepository.getUsers();
      return ok<User[]>(users);
    } catch (error) {
      return serverError();
    }
  }
}
