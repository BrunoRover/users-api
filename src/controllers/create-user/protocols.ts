import { User } from "../../models/user";

export interface CreateUserParams {
  fisrtName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ICreateRepository {
  createUser(params: CreateUserParams): Promise<User>;
}
