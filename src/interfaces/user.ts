export type UserRoles = "admin" | "customer";
export interface IUser extends ICreateUser { }

export interface ICreateUser {
    id: bigint;
    fullname: string;
    username: string;
    email: string;
    password: string;
    createdAt: string;
    updatedAt: string;
}
