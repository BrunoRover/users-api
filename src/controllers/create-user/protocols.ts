import { User } from "../../models/user";
import { HttpRequest, HttpResponse } from "../protocols";

export interface ICreateUserController {
  handle(
    httpRequest: HttpRequest<CreateUserParams>
  ): Promise<HttpResponse<User>>;
}

export interface CreateUserParams {
  fisrtName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ICreateRepository {
  createUser(params: CreateUserParams): Promise<User>;
}
