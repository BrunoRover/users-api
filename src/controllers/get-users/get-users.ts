import { IGetUserController, IGetUsersRepository } from "./protocols";

export class GetUserController implements IGetUserController {
  constructor(private readonly getUsersRepository: IGetUsersRepository) {}
  async handle() {
    try {
      //validar req
      // direcionar a chamada para o Repository
      const users = await this.getUsersRepository.getUsers();
      return {
        statusCode: 200,
        body: users,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "Something went wrong",
      };
    }
  }
}
