import { User } from "./UserType";

export type GetUsersOutput = {
  returnCode: number;
  returnMessage: string;
  users: User[];
};

export type CreateUserInput = {
  requester: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  password: string;
};
