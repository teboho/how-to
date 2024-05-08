import { createAction } from "redux-actions";
import { IProfile, IProfileStateContext, ProfileStateContext_Default } from "./context";

export const ProfileActionEnums = {
    GetProfileRequest: "GET_PROFILE_REQUEST",
    GetProfileSuccess: "GET_PROFILE_SUCCESS",
    GetProfileError: "GET_PROFILE_ERROR",

    PostProfileRequest: "POST_PROFILE_REQUEST",
    PostProfileSuccess: "POST_PROFILE_SUCCESS",
    PostProfileError: "POST_PROFILE_ERROR",

    PutProfileRequest: "PUT_PROFILE_REQUEST",
    PutProfileSuccess: "PUT_PROFILE_SUCCESS",
    PutProfileError: "PUT_PROFILE_ERROR",

    DeleteProfileRequest: "DELETE_PROFILE_REQUEST",
    DeleteProfileSuccess: "DELETE_PROFILE_SUCCESS",
    DeleteProfileError: "DELETE_PROFILE_ERROR",

    GetProfilesRequest: "GET_PROFILES_REQUEST",
    GetProfilesSuccess: "GET_PROFILES_SUCCESS",
    GetProfilesError: "GET_PROFILES_ERROR",

    ClearProfileState: "CLEAR_PROFILE_STATE"
}

export const getProfileRequestAction = createAction<IProfileStateContext>(
    ProfileActionEnums.GetProfileRequest,
    () => ({ isPending: true, isSuccess: false, isError: false, profile: undefined })
);
export const getProfileSuccessAction = createAction<IProfileStateContext, IProfile>(
    ProfileActionEnums.GetProfileSuccess,
    (profile: IProfile) => ({ isPending: false, isSuccess: true, isError: false, profile })
);
export const getProfileErrorAction = createAction<IProfileStateContext>(
    ProfileActionEnums.GetProfileError,
    () => ({ isPending: false, isSuccess: false, isError: true, profile: undefined })
);

export const postProfileRequestAction = createAction<IProfileStateContext>(
    ProfileActionEnums.PostProfileRequest,
    () => ({ isPending: true, isSuccess: false, isError: false, profile: undefined })
);
export const postProfileSuccessAction = createAction<IProfileStateContext, IProfile>(
    ProfileActionEnums.PostProfileSuccess,
    (profile: IProfile) => ({ isPending: false, isSuccess: true, isError: false, profile })
);
export const postProfileErrorAction = createAction<IProfileStateContext>(
    ProfileActionEnums.PostProfileError,
    () => ({ isPending: false, isSuccess: false, isError: true, profile: undefined })
);

export const putProfileRequestAction = createAction<IProfileStateContext>(
    ProfileActionEnums.PutProfileRequest,
    () => ({ isPending: true, isSuccess: false, isError: false, profile: undefined })
);
export const putProfileSuccessAction = createAction<IProfileStateContext, IProfile>(
    ProfileActionEnums.PutProfileSuccess,
    (profile: IProfile) => ({ isPending: false, isSuccess: true, isError: false, profile })
);
export const putProfileErrorAction = createAction<IProfileStateContext>(
    ProfileActionEnums.PutProfileError,
    () => ({ isPending: false, isSuccess: false, isError: true, profile: undefined })
);

export const deleteProfileRequestAction = createAction<IProfileStateContext>(
    ProfileActionEnums.DeleteProfileRequest,
    () => ({ isPending: true, isSuccess: false, isError: false, profile: undefined })
);
export const deleteProfileSuccessAction = createAction<IProfileStateContext>(
    ProfileActionEnums.DeleteProfileSuccess,
    () => ({ isPending: false, isSuccess: true, isError: false })
);
export const deleteProfileErrorAction = createAction<IProfileStateContext>(
    ProfileActionEnums.DeleteProfileError,
    () => ({ isPending: false, isSuccess: false, isError: true, profile: undefined })
);

export const getProfilesRequestAction = createAction<IProfileStateContext>(
    ProfileActionEnums.GetProfilesRequest,
    () => ({ isPending: true, isSuccess: false, isError: false, profiles: undefined })
);
export const getProfilesSuccessAction = createAction<IProfileStateContext, IProfile[]>(
    ProfileActionEnums.GetProfilesSuccess,
    (profiles: IProfile[]) => ({ isPending: false, isSuccess: true, isError: false, profiles })
);
export const getProfilesErrorAction = createAction<IProfileStateContext>(
    ProfileActionEnums.GetProfilesError,
    () => ({ isPending: false, isSuccess: false, isError: true, profile: undefined })
);

export const clearProfileStateAction = createAction<IProfileStateContext>(
    ProfileActionEnums.ClearProfileState,
    () => ({ ...ProfileStateContext_Default })
);