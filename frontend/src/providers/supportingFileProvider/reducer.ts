import { handleActions } from 'redux-actions';
import { SupportingFileActionEnums } from './actions';
import { SupportingFileStateContext_Default } from './context';

const supportingFileReducer = handleActions(
    {
        [SupportingFileActionEnums.GetSupportingFileRequest]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        [SupportingFileActionEnums.GetSupportingFileSuccess]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        [SupportingFileActionEnums.GetSupportingFileError]: (state, action) => ({
            ...state,
            ...action.payload
        }),

        [SupportingFileActionEnums.GetSupportingFilesWithStoredFilesRequest]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        [SupportingFileActionEnums.GetSupportingFilesWithStoredFilesSuccess]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        [SupportingFileActionEnums.GetSupportingFilesWithStoredFilesError]: (state, action) => ({
            ...state,
            ...action.payload
        }),

        [SupportingFileActionEnums.PutSupportingFileRequest]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        [SupportingFileActionEnums.PutSupportingFileSuccess]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        [SupportingFileActionEnums.PutSupportingFileError]: (state, action) => ({
            ...state,
            ...action.payload
        }),

        [SupportingFileActionEnums.PostSupportingFileRequest]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        [SupportingFileActionEnums.PostSupportingFileSuccess]: (state, action) => {
            let { supportingFiles } = state;
            let { supportingFile } = action.payload;
            if (!supportingFiles) { 
                supportingFiles = [];
            }
            if (supportingFile) supportingFiles.push(supportingFile);
            return {
                ...state,
                ...action.payload,
                supportingFiles
            };
        },
        [SupportingFileActionEnums.PostSupportingFileError]: (state, action) => ({
            ...state,
            ...action.payload
        }),

        [SupportingFileActionEnums.PostSupportingFilesRequest]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        [SupportingFileActionEnums.PostSupportingFilesSuccess]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        [SupportingFileActionEnums.PostSupportingFilesError]: (state, action) => ({
            ...state,
            ...action.payload
        }),

        [SupportingFileActionEnums.GetSupportingFilesRequest]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        [SupportingFileActionEnums.GetSupportingFilesSuccess]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        [SupportingFileActionEnums.GetSupportingFilesError]: (state, action) => ({
            ...state,
            ...action.payload
        }),

        [SupportingFileActionEnums.DeleteSupportingFileRequest]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        [SupportingFileActionEnums.DeleteSupportingFileSuccess]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        [SupportingFileActionEnums.DeleteSupportingFileError]: (state, action) => ({
            ...state,
            ...action.payload
        }),
    },
    SupportingFileStateContext_Default
);

export default supportingFileReducer;