export interface IUser {
    _id: string;
    username: string;
    password: string;
    type: EUserType;
}

export enum EUserType {
    Admin = 'admin',
    Employee = 'employee'
}