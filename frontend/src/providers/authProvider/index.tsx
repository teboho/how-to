"use client";

import { useContext, useEffect, useMemo, useReducer } from "react";
import { AuthActionsContext, AuthStateContext, AuthStateContextInitial } from "./contexts";
import authReducer from "./reducer";
import { ILoginRequest, IRegisterRequest } from "./types";
import * as authActions from './actions';
import { getAxiosInstace } from "@/utils";
import { logger } from "../../../logger";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(authReducer, AuthStateContextInitial);

    useEffect(() => {
        if (typeof window !== "undefined") {
            try {
                const accessToken = localStorage.getItem("accessToken");
                const encryptedAccessToken = localStorage.getItem("encryptedAccessToken");
                const expireInSeconds_str = localStorage.getItem("expireInSeconds");
                let expireInSeconds = expireInSeconds_str === null ? 0 : Number.parseInt(expireInSeconds_str);
            } catch (error) {
                console.error("Error accessing localStorage: ", error);
            }
        }
    }, []);

    const instance = useMemo(() => {
        const accessToken = state.loginObj?.accessToken;
        if (accessToken) {
            return getAxiosInstace(accessToken)
        } else {
            return getAxiosInstace("");
        }        
    }, [state]);
    
    const login = (loginRequest: ILoginRequest) => {
        dispatch(authActions.loginRequestAction());
        const endpoint = "api/TokenAuth/Authenticate"
        instance.get(endpoint)
                .then(response => {
                    if (response.status > 199 && response.status < 300) {
                        logger.info("LoggedIn");
                        console.log(response);
                        
                    } else {

                    }
                })
    };
    const register = (registerRequest: IRegisterRequest) => {

    };
    const getUser = () => {

    };
    const logout = () => {

    };

    return (
        <AuthStateContext.Provider value={state}>
            <AuthActionsContext.Provider value={{
                login,
                register,
                getUser,
                logout
            }}>
                {children}
            </AuthActionsContext.Provider>
        </AuthStateContext.Provider>
    );
};

export default AuthProvider;

export const useAuthState = () => {
    const context = useContext(AuthStateContext);
    if (!context) {
        throw new Error("useAuthState must be used as a descendant within a AuthProvider");
    }
    return context;
}

export const useAuthActions = () => {
    const context = useContext(AuthActionsContext);
    if (!context) {
        throw new Error("useAuthActions must be used as a descendant within a AuthProvider");
    }
    return context;
}