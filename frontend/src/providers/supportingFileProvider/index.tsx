"use client";
import { getAxiosInstace, getFormDataAxiosInstace } from '@/utils';
import { message } from 'antd';
import React, { useContext, useEffect, useMemo, useReducer } from 'react';
import { useAuthState } from '../authProvider';
import {
    clearSupportingFileStateAction,
    deleteSupportingFileErrorAction, deleteSupportingFileSuccessAction,
    getSupportingFileErrorAction, getSupportingFileRequestAction,
    getSupportingFilesErrorAction, getSupportingFilesRequestAction,
    getSupportingFilesSuccessAction, getSupportingFileSuccessAction,
    getSupportingFilesWithStoredFilesErrorAction,
    getSupportingFilesWithStoredFilesRequestAction,
    getSupportingFilesWithStoredFilesSuccessAction,
    postSupportingFileErrorAction, postSupportingFileRequestAction,
    postSupportingFileSuccessAction, putSupportingFileErrorAction,
    putSupportingFileRequestAction, putSupportingFileSuccessAction
} from './actions';
import { ISupportingFile, SupportingFileActionContext, SupportingFileStateContext, SupportingFileStateContext_Default } from './context';
import supportingFileReducer from './reducer';

const SupportingFileProvider = ({ children }: { children: React.ReactNode }): React.ReactNode => {
    const [state, dispatch] = useReducer(supportingFileReducer, SupportingFileStateContext_Default);
    const { loginObj } = useAuthState();
    const [messageApi, contextHolder] = message.useMessage();

    let accessToken = useMemo(() => loginObj?.accessToken, []);
    accessToken = useMemo(() => loginObj?.accessToken, [loginObj]);
    let instance = getAxiosInstace(accessToken || "");

    let formDataInstance = useMemo(() => {
        return getFormDataAxiosInstace(loginObj?.accessToken || "");
    }, [loginObj]);

    useEffect(() => {
        if (!loginObj) {
            clearSupportingFileState();
        }
    }, [loginObj]);

    useEffect(() => {
        if (accessToken) {
            instance = getAxiosInstace(accessToken);
        }
    }, []);

    const getSupportingFile = (id: string) => {
        const endpoint = 'api/services/app/SupportingFile/Get';
        dispatch(getSupportingFileRequestAction());
        instance.get(`${endpoint}?Id=${id}`)
            .then(res => {
                const data = res.data;
                if (data.success) {
                    dispatch(getSupportingFileSuccessAction(data.result));
                } else {
                    dispatch(getSupportingFileErrorAction());
                }
            })
            .catch(err =>
                dispatch(getSupportingFileErrorAction())
            );
    };
    const getSupportingFiles = () => {
        const endpoint = 'api/services/app/SupportingFile/GetAll';
        dispatch(getSupportingFilesRequestAction());
        instance.get(endpoint)
            .then(res => {
                const data = res.data;
                if (data.success) {
                    dispatch(getSupportingFilesSuccessAction(data.result.items));
                } else {
                    dispatch(getSupportingFileErrorAction());
                }
            })
            .catch(err =>
                dispatch(getSupportingFilesErrorAction())
            );
    };
    const getMySupportingFile = () => {
        const endpoint = 'api/services/app/SupportingFile/GetMySupportingFile';
        dispatch(getSupportingFilesWithStoredFilesRequestAction());
        instance.get(endpoint)
            .then(res => {
                const data = res.data;
                if (data.success) {
                    dispatch(getSupportingFilesWithStoredFilesSuccessAction(data.result));
                } else {
                    dispatch(getSupportingFilesWithStoredFilesErrorAction());
                }
            })
            .catch(err =>
                dispatch(getSupportingFilesWithStoredFilesErrorAction())
            );
    };
    const getAllSupportingFiles = () => {
        const endpoint = 'api/services/app/SupportingFile/GetAllSupportingFiles';
        dispatch(getSupportingFilesWithStoredFilesRequestAction());
        instance.get(endpoint)
            .then(res => {
                const data = res.data;
                if (data.success) {
                    dispatch(getSupportingFilesWithStoredFilesSuccessAction(data.result));
                } else {
                    dispatch(getSupportingFilesWithStoredFilesErrorAction());
                }
            })
            .catch(err =>
                dispatch(getSupportingFilesWithStoredFilesErrorAction())
            );
    };
    const getByTaskId = (taskId: string) => {
        const endpoint = `api/services/app/SupportingFile/GetByTaskId?taskId=${taskId}`;
        dispatch(getSupportingFilesRequestAction());
        instance.get(endpoint)
            .then(res => {
                const data = res.data;
                if (data.success) {
                    dispatch(getSupportingFilesSuccessAction(data.result));
                } else {
                    dispatch(getSupportingFilesErrorAction());
                }
            })
            .catch(err =>
                dispatch(getSupportingFilesErrorAction())
            );
    };
    const putSupportingFile = (file: ISupportingFile) => {
        const endpoint = 'api/services/app/SupportingFile/Update';
        dispatch(putSupportingFileRequestAction());
        instance.get(endpoint)
            .then(res => {
                const data = res.data;
                if (data.success) {
                    dispatch(putSupportingFileSuccessAction(data.result));
                } else {
                    dispatch(putSupportingFileErrorAction());
                }
            })
            .catch(err =>
                dispatch(putSupportingFileErrorAction())
            );
    };
    const deleteSupportingFile = (id: string) => {
        const endpoint = 'api/services/app/SupportingFile/Delete';
        dispatch(deleteSupportingFileErrorAction())
        instance.delete(`${endpoint}?Id=${id}`)
            .then(res => {
                const data = res.data;
                if (data.success) {
                    dispatch(deleteSupportingFileSuccessAction());
                } else {
                    dispatch(deleteSupportingFileErrorAction());
                }
            })
            .catch(err =>
                dispatch(deleteSupportingFileErrorAction())
            );
    };
    const postSupportingFile = (file: ISupportingFile) => {
        const endpoint = 'api/services/app/SupportingFile/Create';
        instance.post(endpoint, file)
            .then(res => {
                const data = res.data;
                if (data.success) {
                    dispatch(putSupportingFileSuccessAction(data.result));
                } else {
                    dispatch(putSupportingFileErrorAction());
                }
            })
            .catch(err =>
                dispatch(putSupportingFileErrorAction())
            );
    }
    const upload = (formData: FormData) => {
        const endpoint = 'api/services/app/SupportingFile/UploadFiles';
        dispatch(postSupportingFileRequestAction())
        return formDataInstance.post(endpoint, formData)
            .then(res => res.data)
            .then(data => {
                if (data.success) {
                    dispatch(postSupportingFileSuccessAction(data.result));
                    messageApi.success('File uploaded successfully');
                } else {
                    dispatch(postSupportingFileErrorAction());
                    messageApi.error('File upload failed');
                }
            })
            .catch(err => {
                dispatch(putSupportingFileErrorAction());
                messageApi.error('File upload failed');
            });
    }
    const clearSupportingFileState = () => {
        dispatch(clearSupportingFileStateAction());
    }

    return (
        <SupportingFileStateContext.Provider value={state}>
            <SupportingFileActionContext.Provider value={{
                getSupportingFile,
                getMySupportingFile,
                getSupportingFiles,
                putSupportingFile,
                deleteSupportingFile,
                postSupportingFile,
                upload,
                getAllSupportingFiles,
                getByTaskId
            }}>
                {contextHolder}
                {children}
            </SupportingFileActionContext.Provider>
        </SupportingFileStateContext.Provider>
    );
}

export default SupportingFileProvider;
export const useSupportingFileState = () => {
    const context = useContext(SupportingFileStateContext);
    if (!context) {
        throw new Error('useSupportingFileState must be used within a SupportingFileProvider, i.e. the SupportingFileProvider must be an ancestor of the component using this hook.');
    }
    return context;
}
export const useSupportingFileActions = () => {
    const context = useContext(SupportingFileActionContext);
    if (!context) {
        throw new Error('useSupportingFileActions must be used within a SupportingFileProvider, i.e. the SupportingFileProvider must be an ancestor of the component using this hook.');
    }
    return context;
};
