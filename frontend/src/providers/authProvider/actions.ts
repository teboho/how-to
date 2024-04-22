import { createAction } from "redux-actions";
import { IAuthStateContext } from "./contexts";
import { ILoginResponse, IRegisterResponse, IUser } from "./types";

export const AuthActionEnums = {
    LoginRequest: "LOGIN_REQUEST",
    LoginSuccess: "LOGIN_SUCCESS",
    LoginError: "LOGIN_ERROR",

    RegisterRequest: "REGISTER_REQUEST",
    RegisterSuccess: "REGISTER_SUCCESS",
    RegisterError: "REGISTER_ERROR",

    GetUserRequest: "GET_USER_REQUEST",
    GetUserSuccess: "GET_USER_SUCCESS",
    GetUserError: "GET_USER_ERROR",

    Logout: "LOGOUT",
    SaveTokens: "SAVE_TOKENS"
}

export const loginRequestAction = createAction<IAuthStateContext>(
    AuthActionEnums.LoginRequest,
    () => ({ isPending: true, isSuccess: false, isError: false })
);
export const loginSuccessAction = createAction<IAuthStateContext, ILoginResponse>(
    AuthActionEnums.LoginSuccess,
    (loginObj: ILoginResponse) => ({ isPending: false, isSuccess: true, isError: false, loginObj })
);
export const loginErrorAction = createAction<IAuthStateContext>(
    AuthActionEnums.LoginError,
    () => ({ isPending: false, isSuccess: false, isError: true })
);

export const registerRequestAction = createAction<IAuthStateContext>(
    AuthActionEnums.RegisterRequest,
    () => ({ isPending: true, isSuccess: false, isError: false })
);
export const registerSuccessAction = createAction<IAuthStateContext, IRegisterResponse>(
    AuthActionEnums.RegisterSuccess,
    (registerObj: IRegisterResponse) => ({ isPending: false, isSuccess: true, isError: false, registerObj })
);
export const registerErrorAction = createAction<IAuthStateContext>(
    AuthActionEnums.RegisterError,
    () => ({ isPending: false, isSuccess: false, isError: true })
);

export const getUserRequestAction = createAction<IAuthStateContext>(
    AuthActionEnums.GetUserRequest,
    () => ({ isPending: true, isSuccess: false, isError: false })
);
export const getUserSuccessAction = createAction<IAuthStateContext, IUser>(
    AuthActionEnums.GetUserSuccess,
    (userObj: IUser) => ({ isPending: false, isSuccess: true, isError: false, userObj })
);
export const getUserErrorAction = createAction<IAuthStateContext>(
    AuthActionEnums.GetUserError,
    () => ({ isPending: false, isSuccess: false, isError: true })
);

export const logoutAction = createAction<IAuthStateContext>(
    AuthActionEnums.Logout
);

/**
 * To save tokens that come from localStorage if any
 */
export const saveTokensAction = createAction(
    AuthActionEnums.SaveTokens,
    (accessToken: string, encryptedAccessToken: string, expireInSeconds: number) => ({ accessToken, encryptedAccessToken, expireInSeconds })
)