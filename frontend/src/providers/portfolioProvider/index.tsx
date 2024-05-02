"use client";
import { getAxiosInstace, getFormDataAxiosInstace } from '@/utils';
import React, { useContext, useEffect, useMemo, useReducer } from 'react';
import { useAuthState } from '../authProvider';
import {
    deletePortfolioErrorAction, deletePortfolioSuccessAction,
    getPortfolioErrorAction, getPortfolioRequestAction,
    getPortfoliosErrorAction, getPortfoliosRequestAction,
    getPortfoliosSuccessAction, getPortfolioSuccessAction,
    getPortfoliosWithStoredFilesErrorAction,
    getPortfoliosWithStoredFilesRequestAction,
    getPortfoliosWithStoredFilesSuccessAction,
    postPortfolioErrorAction, postPortfolioRequestAction,
    postPortfolioSuccessAction, putPortfolioErrorAction,
    putPortfolioRequestAction, putPortfolioSuccessAction
} from './actions';
import { IPortfolio, PortfolioActionContext, PortfolioStateContext, PortfolioStateContext_Default } from './context';
import portfolioReducer from './reducer';

const PortfolioProvider = ({ children }: { children: React.ReactNode }): React.ReactNode => {
    const [state, dispatch] = useReducer(portfolioReducer, PortfolioStateContext_Default);
    const { loginObj } = useAuthState();

    let accessToken = useMemo(() => loginObj?.accessToken, []);
    accessToken = useMemo(() => loginObj?.accessToken, [loginObj]);
    let instance = getAxiosInstace(accessToken || "");
    let formDataInstance = useMemo(() => {
        return getFormDataAxiosInstace(loginObj?.accessToken || "");
    }, [loginObj]);

    useEffect(() => {
        if (accessToken) {
            console.log("found the accesss token", accessToken);
            instance = getAxiosInstace(accessToken);
        }
    }, []);

    const getPortfolio = (id: string) => {
        const endpoint = 'api/services/app/Portfolio/Get';
        dispatch(getPortfolioRequestAction());
        instance.get(`${endpoint}?Id=${id}`)
            .then(res => {
                const data = res.data;
                if (data.success) {
                    dispatch(getPortfolioSuccessAction(data.result));
                } else {
                    dispatch(getPortfolioErrorAction());
                }
            })
            .catch(err =>
                dispatch(getPortfolioErrorAction())
            );
    };
    const getPortfolios = () => {
        const endpoint = 'api/services/app/Portfolio/GetAll';
        dispatch(getPortfoliosRequestAction());
        instance.get(endpoint)
            .then(res => {
                const data = res.data;
                if (data.success) {
                    dispatch(getPortfoliosSuccessAction(data.result.items));
                } else {
                    dispatch(getPortfolioErrorAction());
                }
            })
            .catch(err =>
                dispatch(getPortfoliosErrorAction())
            );
    };
    const getMyPortfolio = () => {
        const endpoint = 'api/services/app/Portfolio/GetMyPortfolio';
        dispatch(getPortfoliosWithStoredFilesRequestAction());
        instance.get(endpoint)
            .then(res => {
                const data = res.data;
                if (data.success) {
                    dispatch(getPortfoliosWithStoredFilesSuccessAction(data.result));
                } else {
                    dispatch(getPortfoliosWithStoredFilesErrorAction());
                }
            })
            .catch(err =>
                dispatch(getPortfoliosWithStoredFilesErrorAction())
            );
    };
    const putPortfolio = (file: IPortfolio) => {
        const endpoint = 'api/services/app/Portfolio/Update';
        dispatch(putPortfolioRequestAction());
        instance.get(endpoint)
            .then(res => {
                const data = res.data;
                if (data.success) {
                    dispatch(putPortfolioSuccessAction(data.result));
                } else {
                    dispatch(putPortfolioErrorAction());
                }
            })
            .catch(err =>
                dispatch(putPortfolioErrorAction())
            );
    };
    const deletePortfolio = (id: string) => {
        const endpoint = 'api/services/app/Portfolio/Delete';
        dispatch(deletePortfolioErrorAction())
        instance.delete(`${endpoint}?Id=${id}`)
            .then(res => {
                const data = res.data;
                if (data.success) {
                    dispatch(deletePortfolioSuccessAction());
                } else {
                    dispatch(deletePortfolioErrorAction());
                }
            })
            .catch(err =>
                dispatch(deletePortfolioErrorAction())
            );
    };
    const postPortfolio = (file: IPortfolio) => {
        const endpoint = 'api/services/app/Portfolio/Create';
        instance.post(endpoint, file)
            .then(res => {
                const data = res.data;
                if (data.success) {
                    dispatch(putPortfolioSuccessAction(data.result));
                } else {
                    dispatch(putPortfolioErrorAction());
                }
            })
            .catch(err =>
                dispatch(putPortfolioErrorAction())
            );
    }
    const upload = (formData: FormData) => {
        const endpoint = 'api/services/app/Portfolio/UploadFiles';
        dispatch(postPortfolioRequestAction())
        return formDataInstance.post(endpoint, formData)
            .then(res => res.data)
            .then(data => {
                if (data.success) {
                    dispatch(postPortfolioSuccessAction(data.result));
                } else {
                    dispatch(postPortfolioErrorAction());
                }
            })
            .catch(err =>
                dispatch(putPortfolioErrorAction())
            );
    }
    const uploadProfilePicture = (formData: FormData) => {
        const endpoint = 'UploadProfilePicture';
        dispatch(postPortfolioRequestAction())
        return formDataInstance.post(endpoint, formData)
            .then(res => res.data)
            .then(data => {
                if (data.success) {
                    dispatch(postPortfolioSuccessAction(data.result));
                } else {
                    dispatch(postPortfolioErrorAction());
                }
            })
            .catch(err =>
                dispatch(putPortfolioErrorAction())
            );
    }

    return (
        <PortfolioStateContext.Provider value={state}>
            <PortfolioActionContext.Provider value={{
                getPortfolio,
                getMyPortfolio,
                getPortfolios,
                putPortfolio,
                deletePortfolio,
                postPortfolio,
                upload,
            }}>
                {children}
            </PortfolioActionContext.Provider>
        </PortfolioStateContext.Provider>
    );
}

export default PortfolioProvider;
export const usePortfolioState = () => {
    const context = useContext(PortfolioStateContext);
    if (!context) {
        throw new Error('usePortfolioState must be used within a PortfolioProvider, i.e. the PortfolioProvider must be an ancestor of the component using this hook.');
    }
    return context;
}
export const usePortfolioActions = () => {
    const context = useContext(PortfolioActionContext);
    if (!context) {
        throw new Error('usePortfolioActions must be used within a PortfolioProvider, i.e. the PortfolioProvider must be an ancestor of the component using this hook.');
    }
    return context;
};
