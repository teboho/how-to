import { createAction } from 'redux-actions';
import { ISupportingFile, ISupportingFileWithStoredFile } from './context';

export const SupportingFileActionEnums = {
    GetSupportingFileRequest: 'GET_SUPPORTING_FILE_REQUEST',
    GetSupportingFileSuccess: 'GET_SUPPORTING_FILE_SUCCESS',
    GetSupportingFileError: 'GET_SUPPORTING_FILE_ERROR',

    GetSupportingFilesRequest: 'GET_SUPPORTING_FILES_REQUEST',
    GetSupportingFilesSuccess: 'GET_SUPPORTING_FILES_SUCCESS',
    GetSupportingFilesError: 'GET_SUPPORTING_FILES_ERROR',

    GetSupportingFilesWithStoredFilesRequest: 'GET_SUPPORTING_FILES_WITH_STORED_FILES_REQUEST',
    GetSupportingFilesWithStoredFilesSuccess: 'GET_SUPPORTING_FILES_WITH_STORED_FILES_SUCCESS',
    GetSupportingFilesWithStoredFilesError: 'GET_SUPPORTING_FILES_WITH_STORED_FILES_ERROR',

    PutSupportingFileRequest: 'PUT_SUPPORTING_FILE_REQUEST',
    PutSupportingFileSuccess: 'PUT_SUPPORTING_FILE_SUCCESS',
    PutSupportingFileError: 'PUT_SUPPORTING_FILE_ERROR',

    DeleteSupportingFileRequest: 'DELETE_SUPPORTING_FILE_REQUEST',
    DeleteSupportingFileSuccess: 'DELETE_SUPPORTING_FILE_SUCCESS',
    DeleteSupportingFileError: 'DELETE_SUPPORTING_FILE_ERROR',

    PostSupportingFileRequest: 'POST_SUPPORTING_FILE_REQUEST',
    PostSupportingFileSuccess: 'POST_SUPPORTING_FILE_SUCCESS',
    PostSupportingFileError: 'POST_SUPPORTING_FILE_ERROR',

    PostSupportingFilesRequest: 'POST_SUPPORTING_FILES_REQUEST',
    PostSupportingFilesSuccess: 'POST_SUPPORTING_FILES_SUCCESS',
    PostSupportingFilesError: 'POST_SUPPORTING_FILES_ERROR',
};

export const getSupportingFileRequestAction = createAction(
    SupportingFileActionEnums.GetSupportingFileRequest,
    () => ({ isSuccess: false, isPending: true, isError: false, supportingFile: undefined })
);
export const getSupportingFileSuccessAction = createAction(
    SupportingFileActionEnums.GetSupportingFileSuccess,
    (supportingFile: ISupportingFile) => ({ isSuccess: true, isPending: false, isError: false, supportingFile })
);
export const getSupportingFileErrorAction = createAction(
    SupportingFileActionEnums.GetSupportingFileError,
    () => ({ isSuccess: false, isPending: false, isError: true, supportingFile: undefined })
);

export const getSupportingFilesWithStoredFilesRequestAction = createAction(
    SupportingFileActionEnums.GetSupportingFilesWithStoredFilesRequest,
    () => ({ isSuccess: false, isPending: true, isError: false, supportingFilesWithStoredFiles: undefined })
);
export const getSupportingFilesWithStoredFilesSuccessAction = createAction(
    SupportingFileActionEnums.GetSupportingFilesWithStoredFilesSuccess,
    (supportingFilesWithStoredFiles: ISupportingFileWithStoredFile[]) => ({ isSuccess: true, isPending: false, isError: false, supportingFilesWithStoredFiles })
);
export const getSupportingFilesWithStoredFilesErrorAction = createAction(
    SupportingFileActionEnums.GetSupportingFilesWithStoredFilesError,
    () => ({ isSuccess: false, isPending: false, isError: true, supportingFilesWithStoredFiles: undefined })
);

export const putSupportingFileRequestAction = createAction(
    SupportingFileActionEnums.PutSupportingFileRequest,
    () => ({ isSuccess: false, isPending: true, isError: false, supportingFile: undefined })
);
export const putSupportingFileSuccessAction = createAction(
    SupportingFileActionEnums.PutSupportingFileSuccess,
    (supportingFile: ISupportingFile) => ({ isSuccess: true, isPending: false, isError: false, supportingFile })
);
export const putSupportingFileErrorAction = createAction(
    SupportingFileActionEnums.PutSupportingFileError,
    () => ({ isSuccess: false, isPending: false, isError: true, supportingFile: undefined })
);

export const postSupportingFileRequestAction = createAction(
    SupportingFileActionEnums.PostSupportingFileRequest,
    () => ({ isSuccess: false, isPending: true, isError: false, supportingFile: undefined })
);
export const postSupportingFileSuccessAction = createAction(
    SupportingFileActionEnums.PostSupportingFileSuccess,
    (supportingFile: ISupportingFile) => ({ isSuccess: true, isPending: false, isError: false, supportingFile })
);
export const postSupportingFileErrorAction = createAction(
    SupportingFileActionEnums.PostSupportingFileError,
    () => ({ isSuccess: false, isPending: false, isError: true, supportingFile: undefined })
);

export const postSupportingFileItemsRequestAction = createAction(
    SupportingFileActionEnums.PostSupportingFilesRequest,
    () => ({ isSuccess: false, isPending: true, isError: false, supportingFiles: undefined })
);
export const postSupportingFileItemsSuccessAction = createAction(
    SupportingFileActionEnums.PostSupportingFilesSuccess,
    (supportingFileItems: ISupportingFile[]) => ({ isSuccess: true, isPending: false, isError: false, supportingFiles: supportingFileItems })
);
export const postSupportingFileItemsErrorAction = createAction(
    SupportingFileActionEnums.PostSupportingFilesError,
    () => ({ isSuccess: false, isPending: false, isError: true, supportingFiles: undefined })
);

export const getSupportingFilesRequestAction = createAction(
    SupportingFileActionEnums.GetSupportingFilesRequest,
    () => ({ isSuccess: false, isPending: true, isError: false, supportingFiles: [] })
);
export const getSupportingFilesSuccessAction = createAction(
    SupportingFileActionEnums.GetSupportingFilesSuccess,
    (supportingFiles: ISupportingFile[]) => ({ isSuccess: true, isPending: false, isError: false, supportingFiles })
);
export const getSupportingFilesErrorAction = createAction(
    SupportingFileActionEnums.GetSupportingFilesError,
    () => ({ isSuccess: false, isPending: false, isError: true, supportingFiles: [] })
);

export const deleteSupportingFileRequestAction = createAction(
    SupportingFileActionEnums.DeleteSupportingFileRequest,
    () => ({ isSuccess: false, isPending: true, isError: false, supportingFile: undefined })
);
export const deleteSupportingFileSuccessAction = createAction(
    SupportingFileActionEnums.DeleteSupportingFileSuccess,
    () => ({ isSuccess: true, isPending: false, isError: false, undefined })
);
export const deleteSupportingFileErrorAction = createAction(
    SupportingFileActionEnums.DeleteSupportingFileError,
    () => ({ isSuccess: false, isPending: false, isError: true, supportingFile: undefined })
);
