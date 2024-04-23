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
    decodedToken?: IDecodedToken
}

export interface IAuthActionsContext {
    login: (loginRequest: ILoginRequest) => void;
    register: (registerRequest: IRegisterRequest) => void;
    getUser: () => void;
    logout: () => void;
}

export const AuthStateContextInitial: IAuthStateContext = {
    isPending: false,
    isSuccess: false,
    isError: false,
    loginObj: undefined,
    registerObj: undefined,
    userObj: undefined,
    decodedToken: undefined
}

export const AuthActionsContextInitial: IAuthActionsContext = {
    login: (loginReqest: ILoginRequest) => {},
    register: (registerRequest: IRegisterRequest) => {},
    getUser: () => {},
    logout: () => {}
}

const AuthStateContext = createContext(AuthStateContextInitial);
const AuthActionsContext = createContext(AuthActionsContextInitial);

export { AuthStateContext, AuthActionsContext };
