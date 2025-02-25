import { TypeStudent } from "../types"

export interface CreateStudentDTO {
    id: string
    name: string
    email: string,
    password: string,
    age?: number,
    type: TypeStudent
}


export interface UpdateStudentDTO {
    id: string
    name?: string
    email?: string,
    password?: string,
    age?: number,
}