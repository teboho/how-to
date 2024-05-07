"use client";
import { getAxiosInstace, getFormDataAxiosInstace } from '@/utils';
import React, { useContext, useEffect, useMemo, useReducer } from 'react';
import { useAuthState } from '../authProvider';
import {
    deleteStoredFileErrorAction, deleteStoredFileSuccessAction,
    getStoredFileErrorAction, getStoredFileRequestAction,
    getStoredFilesErrorAction, getStoredFilesRequestAction,
    getStoredFilesSuccessAction, getStoredFileSuccessAction,
    postStoredFileErrorAction, postStoredFileRequestAction,
    postStoredFileSuccessAction, putStoredFileErrorAction,
    putStoredFileRequestAction, putStoredFileSuccessAction
} from './actions';
import { IStoredFile, StoredFileActionContext, StoredFileStateContext, StoredFileStateContext_InitState } from './context';
import storedFileReducer from './reducer';

const StoredFileProvider = ({ children }: { children: React.ReactNode }): React.ReactNode => {
    const [state, dispatch] = useReducer(storedFileReducer, StoredFileStateContext_InitState);
    const { loginObj } = useAuthState();

    let accessToken = useMemo(() => loginObj?.accessToken, []);
    accessToken = useMemo(() => loginObj?.accessToken, [loginObj]);
    let instance = getAxiosInstace(accessToken || "");
    let formDataInstance = useMemo(() => {
        return getFormDataAxiosInstace(loginObj?.accessToken || "");
    }, [loginObj]);


    useEffect(() => {
        if (loginObj && !state.storedFiles) {
            getStoredFiles();
        }
    }, []);

    useEffect(() => {
        if (loginObj && !state.storedFiles) {
            getStoredFiles();
        }
    }, [loginObj]);

    useEffect(() => {
        if (accessToken) {
            instance = getAxiosInstace(accessToken);
        }
    }, []);

    const getStoredFile = (id: string) => {
        const endpoint = 'api/services/app/StoredFile/Get';
        dispatch(getStoredFileRequestAction());
        instance.get(`${endpoint}?Id=${id}`)
            .then(res => {
                const data = res.data;
                if (data.success) {
                    dispatch(getStoredFileSuccessAction(data.result));
                } else {
                    dispatch(getStoredFileErrorAction());
                }
            })
            .catch(err =>
                dispatch(getStoredFileErrorAction())
            );
    };
    const getStoredFiles = () => {
        const endpoint = 'api/services/app/StoredFile/GetAll';
        dispatch(getStoredFilesRequestAction());
        instance.get(endpoint)
            .then(res => {
                const data = res.data;
                if (data.success) {
                    dispatch(getStoredFilesSuccessAction(data.result.items));
                } else {
                    dispatch(getStoredFileErrorAction());
                }
            })
            .catch(err =>
                dispatch(getStoredFilesErrorAction())
            );
    };
    const getMyStoredFiles = () => {
        const endpoint = 'api/services/app/StoredFile/GetMyStoredFiles';
        dispatch(getStoredFilesRequestAction());
        instance.get(endpoint)
            .then(res => {
                const data = res.data;
                if (data.success) {
                    dispatch(getStoredFilesSuccessAction(data.result.items));
                } else {
                    dispatch(getStoredFileErrorAction());
                }
            })
            .catch(err =>
                dispatch(getStoredFilesErrorAction())
            );
    };
    const putStoredFile = (file: IStoredFile) => {
        const endpoint = 'api/services/app/StoredFile/Update';
        dispatch(putStoredFileRequestAction());
        instance.get(endpoint)
            .then(res => {
                const data = res.data;
                if (data.success) {
                    dispatch(putStoredFileSuccessAction(data.result));
                } else {
                    dispatch(putStoredFileErrorAction());
                }
            })
            .catch(err =>
                dispatch(putStoredFileErrorAction())
            );
    };
    const deleteStoredFile = (id: string) => {
        const endpoint = 'api/services/app/StoredFile/Delete';
        dispatch(deleteStoredFileErrorAction())
        instance.delete(`${endpoint}?Id=${id}`)
            .then(res => {
                const data = res.data;
                if (data.success) {
                    dispatch(deleteStoredFileSuccessAction());
                } else {
                    dispatch(deleteStoredFileErrorAction());
                }
            })
            .catch(err =>
                dispatch(deleteStoredFileErrorAction())
            );
    };
    const postStoredFile = (file: IStoredFile) => {
        const endpoint = 'api/services/app/StoredFile/Create';
        instance.post(endpoint, file)
            .then(res => {
                const data = res.data;
                if (data.success) {
                    dispatch(putStoredFileSuccessAction(data.result));
                } else {
                    dispatch(putStoredFileErrorAction());
                }
            })
            .catch(err =>
                dispatch(putStoredFileErrorAction())
            );
    }
    const upload = (formData: FormData) => {
        const endpoint = 'Upload';
        dispatch(postStoredFileRequestAction())
        return formDataInstance.post(endpoint, formData)
            .then(res => res.data)
            .then(data => {
                if (data.success) {
                    dispatch(postStoredFileSuccessAction(data.result));
                } else {
                    dispatch(postStoredFileErrorAction());
                }
            })
            .catch(err =>
                dispatch(putStoredFileErrorAction())
            );
    }
    const uploadProfilePicture = (formData: FormData) => {
        const endpoint = 'UploadProfilePicture';
        dispatch(postStoredFileRequestAction())
        return formDataInstance.post(endpoint, formData)
            .then(res => res.data)
            .then(data => {
                if (data.success) {
                    dispatch(postStoredFileSuccessAction(data.result));
                } else {
                    dispatch(postStoredFileErrorAction());
                }
            })
            .catch(err =>
                dispatch(putStoredFileErrorAction())
            );
    }

    return (
        <StoredFileStateContext.Provider value={state}>
            <StoredFileActionContext.Provider value={{
                getStoredFile,
                getStoredFiles,
                getMyStoredFiles,
                putStoredFile,
                deleteStoredFile,
                postStoredFile,
                upload,
                uploadProfilePicture
            }}>
                {children}
            </StoredFileActionContext.Provider>
        </StoredFileStateContext.Provider>
    );
}

export default StoredFileProvider;
export const useStoredFileState = () => {
    const context = useContext(StoredFileStateContext);
    if (!context) {
        throw new Error('useStoredFileState must be used within a StoredFileProvider, i.e. the StoredFileProvider must be an ancestor of the component using this hook.');
    }
    return context;
}
export const useStoredFileActions = () => {
    const context = useContext(StoredFileActionContext);
    if (!context) {
        throw new Error('useStoredFileActions must be used within a StoredFileProvider, i.e. the StoredFileProvider must be an ancestor of the component using this hook.');
    }
    return context;
};
