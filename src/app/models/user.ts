import { Role } from "./role";

export interface User{
    idUser: number,
    firstName: string,
    lastName: string,
    email: string;
    password: string;
    role: Role;
}