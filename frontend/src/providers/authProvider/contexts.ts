"use client";
import { createContext } from "react";
import { ILoginRequest, ILoginResponse, IRegisterRequest, IRegisterResponse, IUser } from "./types";
import { IDecodedToken } from "@/utils";

export interface IAuthStateContext {
    isPending: boolean;
    isSuccess: boolean;
    isError: boolean;
    loginObj?: ILoginResponse;
    registerObj?: IRegisterResponse;
    userObj?: IUser;
    decodedToken?: IDecodedToken;
    users?: IUser[];
}

export interface IAuthActionsContext {
    login: (loginRequest: ILoginRequest) => void;
    register: (registerRequest: IRegisterRequest) => void;
    registerSupport: (registerRequest: IRegisterRequest) => void;
    getUser: () => void;
    logout: () => void;
    getAllUsers: () => void;
    getMyUser: () => void;
}

export const AuthStateContextInitial: IAuthStateContext = {
    isPending: false,
    isSuccess: false,
    isError: false,
    loginObj: undefined,
    registerObj: undefined,
    userObj: undefined,
    decodedToken: undefined,
    users: undefined
}

export const AuthActionsContextInitial: IAuthActionsContext = {
    login: (loginReqest: ILoginRequest) => {},
    register: (registerRequest: IRegisterRequest) => {},
    registerSupport: (registerRequest: IRegisterRequest) => {},
    getUser: () => {},
    logout: () => {},
    getAllUsers: () => {},
    getMyUser: () => {}
}

const AuthStateContext = createContext(AuthStateContextInitial);
const AuthActionsContext = createContext(AuthActionsContextInitial);

export { AuthStateContext, AuthActionsContext };
