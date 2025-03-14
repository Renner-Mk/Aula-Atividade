import { TypeStudent } from "../types";

export interface CreateStudentDTO {
  id: string;
  name: string;
  email: string;
  password: string;
  type: TypeStudent;
  age?: number;
}

export interface UpdateStudentDTO {
  id: string;
  name?: string;
  email?: string;
  password?: string;
  age?: number;
}
