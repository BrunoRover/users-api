import validator from "validator";
import { User } from "../../models/user";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { CreateUserParams, ICreateRepository } from "./protocols";

export class CreateUserController implements IController {
  constructor(private readonly createUserRepository: ICreateRepository) {}

  async handle(
    httpRequest: HttpRequest<CreateUserParams>
  ): Promise<HttpResponse<User>> {
    try {
      //verificar campos obrigatorios
      const requireFields = ["fisrtName", "lastName", "email", "password"];

      for (const field of requireFields) {
        if (!httpRequest?.body?.[field as keyof CreateUserParams]?.length) {
          return {
            statusCode: 400,
            body: `Field ${field} is required`,
          };
        }
      }
      //validar email
      const emailIsValid = validator.isEmail(httpRequest.body!.email);
      if (!emailIsValid) {
        return {
          statusCode: 400,
          body: "E-mail is invalid",
        };
      }

      const user = await this.createUserRepository.createUser(
        httpRequest.body!
      );
      return {
        statusCode: 201,
        body: user,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "Something went wrong",
      };
    }
  }
}
