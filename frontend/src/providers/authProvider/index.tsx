"use client";
import { AbpTokenProperies, type IDecodedToken, decodeToken, getAxiosInstace } from "@/utils";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useMemo, useReducer } from "react";
import * as authActions from './actions';
import { AuthActionsContext, AuthStateContext, AuthStateContextInitial } from "./contexts";
import authReducer from "./reducer";
import type { ILoginRequest, ILoginResponse, IRegisterRequest, IUser } from "./types";
import { message } from "antd";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(authReducer, AuthStateContextInitial);
    const { push } = useRouter();
    const [messageApi, contextHolder] = message.useMessage();

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
                    dispatch(authActions.saveDecodedTokenAction(decodeToken(accessToken)));

                    // getMyUser();
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
            } else {
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
                    dispatch(authActions.saveDecodedTokenAction(decodedToken));
                    const _role = (decodedToken[AbpTokenProperies.role]);
                    push("home/" + _role.toLocaleLowerCase());
                    messageApi.success("Welcome or Welcome back!");
                } else {
                    dispatch(authActions.loginErrorAction())
                    messageApi.error("Invalid username or password");
                }
            })
            .catch(err => {
                dispatch(authActions.loginErrorAction());
                messageApi.error("Invalid username or password");
            });
    };

    const register = (registerRequest: IRegisterRequest) => {
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

    const registerSupport = (registerRequest: IRegisterRequest) => {
        dispatch(authActions.registerRequestAction());
        const endpoint = "api/services/app/User/Create"
        instance.post(endpoint, registerRequest)
            .then(response => {
                if (response.status > 199 && response.status < 300) {
                    dispatch(authActions.registerSuccessAction(response.data.result));
                    messageApi.success("New support team member registered!");
                } else {
                    dispatch(authActions.registerErrorAction())
                    messageApi.error("Something went wrong with support registration.");
                    appendUser(response.data.result);
                }
            })
            .catch(err => {
                dispatch(authActions.registerErrorAction());
                messageApi.error("Something went wrong with support registration.");
            });
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

    // current logged in information

    const getAllUsers = () => {
        const endpoint = 'api/services/app/User/GetAll?MaxResultCount=50';
        dispatch(authActions.getAllUsersRequestAction());
        const _instance = getAxiosInstace(state.loginObj?.accessToken || "");
        _instance.get(endpoint)
            .then(res => {
                const data = res.data;
                if (data.success) {
                    dispatch(authActions.getAllUsersSuccessAction(data.result.items));
                } else {
                    dispatch(authActions.getAllUsersErrorAction());
                }
            })
            .catch(err =>
                dispatch(authActions.getAllUsersErrorAction())
            );
    }
    const getMyUser = () => {
        const endpoint = 'api/services/app/Session/GetCurrentLoginInformations';
        dispatch(authActions.getUserRequestAction());
        const _instance = getAxiosInstace(state.loginObj?.accessToken || "");
        _instance.get(endpoint)
            .then(res => {
                const data = res.data;
                if (data.success) {
                    dispatch(authActions.getUserSuccessAction(data.result.items));
                } else {
                    dispatch(authActions.getUserErrorAction());
                }
            })
            .catch(err =>
                dispatch(authActions.getUserErrorAction())
            );
    }

    const appendUser = (user: IUser) => {
        const users = state.users ? [...state?.users, user] : undefined;
        if (users) {
            dispatch(authActions.getAllUsersSuccessAction(users));
        }
    }

    return (
        <AuthStateContext.Provider value={state}>
            <AuthActionsContext.Provider value={{
                login,
                register,
                registerSupport,
                getUser,
                logout,
                getAllUsers,
                getMyUser
            }}>
                {contextHolder}
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