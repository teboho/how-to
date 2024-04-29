"use client";

import { useContext, useEffect, useMemo, useReducer } from "react";
import { AuthActionsContext, AuthStateContext, AuthStateContextInitial } from "./contexts";
import authReducer from "./reducer";
import type { ILoginRequest, ILoginResponse, IRegisterRequest } from "./types";
import * as authActions from './actions';
import { AbpTokenProperies, type IDecodedToken, decodeToken, getAxiosInstace } from "@/utils";
import { useRouter } from "next/navigation";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(authReducer, AuthStateContextInitial);
    const { push } = useRouter();

    useEffect(() => {
        if (typeof window !== "undefined") {
            try {
                const accessToken = localStorage.getItem("accessToken");
                const encryptedAccessToken = localStorage.getItem("encryptedAccessToken");
                const expireInSeconds_str = localStorage.getItem("expireInSeconds");
                const userId_str = localStorage.getItem("userId");
                let expireInSeconds = expireInSeconds_str === null ? 0 : Number.parseInt(expireInSeconds_str);
                let userId = userId_str === null ? 0 : Number.parseInt(userId_str);
                
                if (accessToken && encryptedAccessToken && expireInSeconds && userId) {
                    const loginObj: ILoginResponse = {
                        accessToken,
                        encryptedAccessToken,
                        userId,
                        expireInSeconds
                    };
                    dispatch(authActions.loginSuccessAction(loginObj));
                }
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

    useEffect(() => {
        const accessToken = state.loginObj?.accessToken;
        const encryptedAccessToken = state.loginObj?.encryptedAccessToken;
        const expireInSeconds = state.loginObj?.expireInSeconds;
        const userId = state.loginObj?.userId;

        if (typeof window !== "undefined") {
            if (accessToken && encryptedAccessToken && expireInSeconds && userId) {
                localStorage.setItem("accessToken", accessToken);
                localStorage.setItem("encryptedAccessToken", encryptedAccessToken);
                localStorage.setItem("expireInSeconds", expireInSeconds + "");
                localStorage.setItem("userId", userId + "");
            }   else {
                localStorage.clear();
            }  
        } 
    }, [state]);
    
    const login = (loginRequest: ILoginRequest) => {
        dispatch(authActions.loginRequestAction());
        const endpoint = "api/TokenAuth/Authenticate"
        instance.post(endpoint, loginRequest)
                .then(response => {
                    if (response.status > 199 && response.status < 300) {
                        dispatch(authActions.loginSuccessAction(response.data.result));
                        const decodedToken: IDecodedToken = decodeToken(response.data.result.accessToken);
                        const _role = (decodedToken[AbpTokenProperies.role]);
                        console.log("role", _role);
                        push("home/" + _role.toLocaleLowerCase());
                    } else {
                        dispatch(authActions.loginErrorAction())
                    }
                })
                .catch(err => 
                    dispatch(authActions.loginErrorAction())
                );
    };

    const register = (registerRequest: IRegisterRequest) => {
        console.log(registerRequest)
        dispatch(authActions.registerRequestAction());
        const endpoint = "api/services/app/User/Create"
        instance.post(endpoint, registerRequest)
                .then(response => {
                    if (response.status > 199 && response.status < 300) {
                        dispatch(authActions.registerSuccessAction(response.data.result))
                        push('login')
                    } else {
                        dispatch(authActions.registerErrorAction())
                    }
                })
                .catch(err => 
                    dispatch(authActions.registerErrorAction())
                );
    };
    
    const getUser = () => {
        if (state.loginObj) {
            const decoded = decodeToken(state.loginObj.accessToken);
            dispatch(authActions.saveDecodedTokenAction(decoded))
        }
    };

    const logout = () => {
        dispatch(authActions.logoutAction());
        push('/login');
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