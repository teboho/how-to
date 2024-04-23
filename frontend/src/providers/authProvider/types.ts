export interface ILoginResponse {
    accessToken: string;
    encryptedAccessToken: string;
    expireInSeconds: number;
    userId: number;
}

export interface IRegisterResponse {
    userName: string,
    name: string,
    surname: string,
    emailAddress: string,
    isActive: boolean,
    fullName: string,
    lastLoginTime: string,
    creationTime: string,
    roleNames?: string[],
    id: number
}

export interface IUser {
    id: number,
    name: string,
    surname: string,
    userName: string,
    emailAddress: string,
    roleNames?: string[],
    fullName?: string
}

export interface ILoginRequest {
    userNameOrEmailAddress: string;
    password: string;
    rememberClient?: boolean;
}

export interface IRegisterRequest {
    userName?: string,
    name: string,
    surname: string,
    emailAddress?: string,
    isActive?: boolean,
    roleNames?: string[],
    password: string
}

export const LoginRequestInitial: ILoginRequest = {
    userNameOrEmailAddress: "",
    password: "",
    rememberClient: false
}


export const RegisterRequestInitial: IRegisterRequest = {
    userName: "",
    name: "",
    surname: "",
    emailAddress: "",
    isActive: false,
    roleNames: [] as string[],
    password: ""
}

export const UserInitial: IUser = {
    id: 0,
    name: "",
    surname: "",
    userName: "",
    emailAddress: "",
    roleNames: [] as string[],
    fullName: ""
}
