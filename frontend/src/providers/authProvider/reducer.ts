import { handleActions } from "redux-actions";

import { AuthActionEnums } from "./actions";
import { AuthStateContextInitial, IAuthStateContext } from "./contexts";

const authReducer = handleActions<IAuthStateContext, any>(
    {
        [AuthActionEnums.LoginRequest]: (state, action) => ({ ...state, ...action.payload }),
        [AuthActionEnums.LoginSuccess]: (state, action) => ({ ...state, ...action.payload }),
        [AuthActionEnums.LoginError]: (state, action) => ({ ...state, ...action.payload }),

        [AuthActionEnums.RegisterRequest]: (state, action) => ({ ...state, ...action.payload }),
        [AuthActionEnums.RegisterSuccess]: (state, action) => ({ ...state, ...action.payload }),
        [AuthActionEnums.RegisterError]: (state, action) => ({ ...state, ...action.payload }),

        [AuthActionEnums.GetUserRequest]: (state, action) => ({ ...state, ...action.payload }),
        [AuthActionEnums.GetUserSuccess]: (state, action) => ({ ...state, ...action.payload }),
        [AuthActionEnums.GetUserError]: (state, action) => ({ ...state, ...action.payload }),

        [AuthActionEnums.GetAllUsersRequest]: (state, action) => ({ ...state, ...action.payload }),
        [AuthActionEnums.GetAllUsersSuccess]: (state, action) => ({ ...state, ...action.payload }),
        [AuthActionEnums.GetAllUsersError]: (state, action) => ({ ...state, ...action.payload }),

        [AuthActionEnums.Logout]: () => ({ ...AuthStateContextInitial }),
        [AuthActionEnums.SaveTokens]: (state, action) => ({ 
            ...state, 
            loginObj: { 
                accessToken: action.payload.accessToken,  
                encryptedAccessToken: action.payload.encryptedAccessToken,  
                expireInSeconds: action.payload.expireInSeconds,  
            } 
        }),
        [AuthActionEnums.SaveDecodedToken]: (state, action) => ({ 
            ...state, 
            decodedToken: action.payload.decodedToken
        })
    },
    AuthStateContextInitial
);

export default authReducer;