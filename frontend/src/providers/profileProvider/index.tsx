"use client";

import { getAxiosInstace } from "@/utils";
import React, { useMemo, useReducer } from "react";
import { useAuthState } from "../authProvider";
import * as profileActions from "./actions";
import profileReducer from "./reducer";
import { IProfile, ProfileActionsContext, ProfileStateContext, ProfileStateContext_Default } from "./context";

const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
    const { loginObj } = useAuthState();
    const [state, dispatch] = useReducer(profileReducer, ProfileStateContext_Default);

    const instance = useMemo(() => {
        const accessToken = loginObj?.accessToken;
        if (accessToken) {
            return getAxiosInstace(accessToken)
        } else {
            return getAxiosInstace("");
        }        
    }, [loginObj]);

    const getProfile = () => {
        dispatch(profileActions.getProfileRequestAction());
        const endpoint = "api/services/app/Profile/Get";
        instance.get(endpoint)
                .then(response => {
                    if (response.status > 199 && response.status < 300) {
                        dispatch(profileActions.getProfileSuccessAction(response.data.result))
                    } else {
                        dispatch(profileActions.getProfileErrorAction())
                    }
                })
                .catch(err => 
                    dispatch(profileActions.getProfileErrorAction())
                );
    }
    const postProfile = (profile: IProfile) => {
        dispatch(profileActions.postProfileRequestAction());
        const endpoint = "api/services/app/Profile/Create"
        instance.post(endpoint, profile)
                .then(response => {
                    if (response.status > 199 && response.status < 300) {
                        dispatch(profileActions.postProfileSuccessAction(response.data.result))
                    } else {
                        dispatch(profileActions.postProfileErrorAction())
                    }
                })
                .catch(err => 
                    dispatch(profileActions.postProfileErrorAction())
                );
    }
    const putProfile = (profile: IProfile) => {
        dispatch(profileActions.putProfileRequestAction());
        const endpoint = "api/services/app/Profile/Update";
        instance.put(endpoint, profile)
                .then(response => {
                    if (response.status > 199 && response.status < 300) {
                        dispatch(profileActions.putProfileSuccessAction(response.data.result))
                    } else {
                        dispatch(profileActions.putProfileErrorAction())
                    }
                })
                .catch(err => 
                    dispatch(profileActions.putProfileErrorAction())
                );
    }
    const deleteProfile = (profile: IProfile) => {
        dispatch(profileActions.deleteProfileRequestAction());
        const endpoint = "api/services/app/Profile/Delete";
        instance.delete(endpoint, { data: profile })
                .then(response => {
                    if (response.status > 199 && response.status < 300) {
                        dispatch(profileActions.deleteProfileSuccessAction())
                    } else {
                        dispatch(profileActions.deleteProfileErrorAction())
                    }
                })
                .catch(err => 
                    dispatch(profileActions.deleteProfileErrorAction())
                );
    }
    const getProfiles = () => {
        dispatch(profileActions.getProfilesRequestAction());
        const endpoint = "api/services/app/Profile/GetAll";
        instance.get(endpoint)
                .then(response => {
                    console.log(response);
                    if (response.status > 199 && response.status < 300) {
                        dispatch(profileActions.getProfilesSuccessAction(response.data.result.items))
                    } else {
                        dispatch(profileActions.getProfilesErrorAction())
                    }
                })
                .catch(err => 
                    dispatch(profileActions.getProfilesErrorAction())
                );
    }
    const getMyProfile = () => {
        dispatch(profileActions.getProfileRequestAction());
        const endpoint = `api/services/app/Profile/GetMyProfile?userId=${loginObj?.userId}`;
        instance.get(endpoint)
                .then(response => {
                    if (response.status > 199 && response.status < 300) {
                        dispatch(profileActions.getProfileSuccessAction(response.data.result))
                    } else {
                        dispatch(profileActions.getProfileErrorAction())
                    }
                })
                .catch(err => 
                    dispatch(profileActions.getProfileErrorAction())
                );
    }

    return (
        <ProfileStateContext.Provider value={{ ...state }}>
            <ProfileActionsContext.Provider value={{
                getProfile,
                getMyProfile,
                postProfile,
                putProfile,
                deleteProfile,
                getProfiles,
            }}>
                {children}
            </ProfileActionsContext.Provider>
        </ProfileStateContext.Provider>
    );
}

export default ProfileProvider;

export const useProfileState = () => {
    const context = React.useContext(ProfileStateContext);
    if (!context) {
        throw new Error("useProfileState must be used as a descendant within a ProfileProvider");
    }
    return context;
}

export const useProfileActions = () => {
    const context = React.useContext(ProfileActionsContext);
    if (!context) {
        throw new Error("useProfileActions must be used as a descendant within a ProfileProvider");
    }
    return context;
}