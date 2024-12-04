import { User } from "../../models/user";

export interface UpdateUserParams {
  fisrtName?: string;
  lastName?: string;
  password?: string;
}

export interface IUpdateUserRepository {
  updateUser(id: string, params: UpdateUserParams): Promise<User>;
}
