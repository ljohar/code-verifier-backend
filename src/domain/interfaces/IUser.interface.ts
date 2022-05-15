export enum UserRole {
    USER = 'User',
    ADMIN = 'Admin'
}

export interface IUser {
    name: string,
    email: string,
    password: string,
    age: number,
    katas: string[],
    role: UserRole
}