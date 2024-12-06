import { User } from "../../models/user";
import { HttpRequest } from "../protocols";

export interface UpdateUserParams {
  fisrtName?: string;
  lastName?: string;
  password?: string;
}

export interface IUpdateUserController {
  handle(HttpRequest: HttpRequest<any>): Promise<User>;
}

export interface IUpdateUserRepository {
  updateUser(id: string, params: UpdateUserParams): Promise<User>;
}
