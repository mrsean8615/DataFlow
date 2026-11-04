import { BaseOutputType } from "./BaseTypes";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
};

export type LoginResponse = BaseOutputType & {
  token: string;
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
};
