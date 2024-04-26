import { handleActions } from 'redux-actions';
import { ProfileStateContext_Default } from './context';
import { ProfileActionEnums } from './actions';

const profileReducer = handleActions(
    {
        [ProfileActionEnums.GetProfileRequest]: (state) => {
            return { ...state, isPending: true, isSuccess: false, isError: false, profile: undefined };
        },
        [ProfileActionEnums.GetProfileSuccess]: (state, action) => {
            return { ...state, ...action.payload };
        },
        [ProfileActionEnums.GetProfileError]: (state) => {
            return { ...state, isPending: false, isSuccess: false, isError: true, profile: undefined };
        },

        [ProfileActionEnums.PostProfileRequest]: (state) => {
            return { ...state, isPending: true, isSuccess: false, isError: false, profile: undefined };
        },
        [ProfileActionEnums.PostProfileSuccess]: (state, action) => {
            return { ...state, ...action.payload };
        },
        [ProfileActionEnums.PostProfileError]: (state) => {
            return { ...state, isPending: false, isSuccess: false, isError: true, profile: undefined };
        },

        [ProfileActionEnums.PutProfileRequest]: (state) => {
            return { ...state, isPending: true, isSuccess: false, isError: false };
        },
        [ProfileActionEnums.PutProfileSuccess]: (state, action) => {
            return { ...state, ...action.payload };
        },
        [ProfileActionEnums.PutProfileError]: (state) => {
            return { ...state, isPending: false, isSuccess: false, isError: true, profile: undefined };
        },

        [ProfileActionEnums.DeleteProfileRequest]: (state) => {
            return { ...state, isPending: true, isSuccess: false, isError: false, profile: undefined };
        },
        [ProfileActionEnums.DeleteProfileSuccess]: (state, action) => {
            return { ...state, isPending: false, isSuccess: true, isError: false };
        },
        [ProfileActionEnums.DeleteProfileError]: (state, action) => {
            return { ...state, isPending: false, isSuccess: false, isError: true };
        },
        
        [ProfileActionEnums.GetProfilesRequest]: (state) => {
            return { ...state, isPending: true, isSuccess: false, isError: false, profiles: undefined };
        },
        [ProfileActionEnums.GetProfilesSuccess]: (state, action) => {
            return { ...state, ...action.payload };
        },
        [ProfileActionEnums.GetProfilesError]: (state, action) => {
            return { ...state, isPending: false, isSuccess: false, isError: true, profiles: undefined };
        }
    },
    ProfileStateContext_Default
);

export default profileReducer;