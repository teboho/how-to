import { createAction } from 'redux-actions';
import { IPortfolio, IPortfolioWithStoredFile } from './context';

export const PortfolioActionEnums = {
    GetPortfolioRequest: 'GET_PORTFOLIO_REQUEST',
    GetPortfolioSuccess: 'GET_PORTFOLIO_SUCCESS',
    GetPortfolioError: 'GET_PORTFOLIO_ERROR',

    GetPortfoliosRequest: 'GET_PORTFOLIOS_REQUEST',
    GetPortfoliosSuccess: 'GET_PORTFOLIOS_SUCCESS',
    GetPortfoliosError: 'GET_PORTFOLIOS_ERROR',

    GetPortfoliosWithStoredFilesRequest: 'GET_PORTFOLIOS_WITH_STORED_FILES_REQUEST',
    GetPortfoliosWithStoredFilesSuccess: 'GET_PORTFOLIOS_WITH_STORED_FILES_SUCCESS',
    GetPortfoliosWithStoredFilesError: 'GET_PORTFOLIOS_WITH_STORED_FILES_ERROR',

    PutPortfolioRequest: 'PUT_PORTFOLIO_REQUEST',
    PutPortfolioSuccess: 'PUT_PORTFOLIO_SUCCESS',
    PutPortfolioError: 'PUT_PORTFOLIO_ERROR',

    DeletePortfolioRequest: 'DELETE_PORTFOLIO_REQUEST',
    DeletePortfolioSuccess: 'DELETE_PORTFOLIO_SUCCESS',
    DeletePortfolioError: 'DELETE_PORTFOLIO_ERROR',

    PostPortfolioRequest: 'POST_PORTFOLIO_REQUEST',
    PostPortfolioSuccess: 'POST_PORTFOLIO_SUCCESS',
    PostPortfolioError: 'POST_PORTFOLIO_ERROR',

    PostPortfoliosRequest: 'POST_PORTFOLIOS_REQUEST',
    PostPortfoliosSuccess: 'POST_PORTFOLIOS_SUCCESS',
    PostPortfoliosError: 'POST_PORTFOLIOS_ERROR',
};

export const getPortfolioRequestAction = createAction(
    PortfolioActionEnums.GetPortfolioRequest,
    () => ({ isSuccess: false, isPending: true, isError: false, portfolio: undefined })
);
export const getPortfolioSuccessAction = createAction(
    PortfolioActionEnums.GetPortfolioSuccess,
    (portfolio: IPortfolio) => ({ isSuccess: true, isPending: false, isError: false, portfolio })
);
export const getPortfolioErrorAction = createAction(
    PortfolioActionEnums.GetPortfolioError,
    () => ({ isSuccess: false, isPending: false, isError: true, portfolio: undefined })
);

export const getPortfoliosWithStoredFilesRequestAction = createAction(
    PortfolioActionEnums.GetPortfoliosWithStoredFilesRequest,
    () => ({ isSuccess: false, isPending: true, isError: false, portfoliosWithStoredFiles: undefined })
);
export const getPortfoliosWithStoredFilesSuccessAction = createAction(
    PortfolioActionEnums.GetPortfoliosWithStoredFilesSuccess,
    (portfoliosWithStoredFiles: IPortfolioWithStoredFile[]) => ({ isSuccess: true, isPending: false, isError: false, portfoliosWithStoredFiles })
);
export const getPortfoliosWithStoredFilesErrorAction = createAction(
    PortfolioActionEnums.GetPortfoliosWithStoredFilesError,
    () => ({ isSuccess: false, isPending: false, isError: true, portfoliosWithStoredFiles: undefined })
);

export const putPortfolioRequestAction = createAction(
    PortfolioActionEnums.PutPortfolioRequest,
    () => ({ isSuccess: false, isPending: true, isError: false, portfolio: undefined })
);
export const putPortfolioSuccessAction = createAction(
    PortfolioActionEnums.PutPortfolioSuccess,
    (portfolio: IPortfolio) => ({ isSuccess: true, isPending: false, isError: false, portfolio })
);
export const putPortfolioErrorAction = createAction(
    PortfolioActionEnums.PutPortfolioError,
    () => ({ isSuccess: false, isPending: false, isError: true, portfolio: undefined })
);

export const postPortfolioRequestAction = createAction(
    PortfolioActionEnums.PostPortfolioRequest,
    () => ({ isSuccess: false, isPending: true, isError: false, portfolio: undefined })
);
export const postPortfolioSuccessAction = createAction(
    PortfolioActionEnums.PostPortfolioSuccess,
    (portfolio: IPortfolio) => ({ isSuccess: true, isPending: false, isError: false, portfolio })
);
export const postPortfolioErrorAction = createAction(
    PortfolioActionEnums.PostPortfolioError,
    () => ({ isSuccess: false, isPending: false, isError: true, portfolio: undefined })
);

export const postPortfolioItemsRequestAction = createAction(
    PortfolioActionEnums.PostPortfoliosRequest,
    () => ({ isSuccess: false, isPending: true, isError: false, portfolios: undefined })
);
export const postPortfolioItemsSuccessAction = createAction(
    PortfolioActionEnums.PostPortfoliosSuccess,
    (portfolioItems: IPortfolio[]) => ({ isSuccess: true, isPending: false, isError: false, portfolios: portfolioItems })
);
export const postPortfolioItemsErrorAction = createAction(
    PortfolioActionEnums.PostPortfoliosError,
    () => ({ isSuccess: false, isPending: false, isError: true, portfolios: undefined })
);

export const getPortfoliosRequestAction = createAction(
    PortfolioActionEnums.GetPortfoliosRequest,
    () => ({ isSuccess: false, isPending: true, isError: false, portfolios: [] })
);
export const getPortfoliosSuccessAction = createAction(
    PortfolioActionEnums.GetPortfoliosSuccess,
    (portfolios: IPortfolio[]) => ({ isSuccess: true, isPending: false, isError: false, portfolios })
);
export const getPortfoliosErrorAction = createAction(
    PortfolioActionEnums.GetPortfoliosError,
    () => ({ isSuccess: false, isPending: false, isError: true, portfolios: [] })
);

export const deletePortfolioRequestAction = createAction(
    PortfolioActionEnums.DeletePortfolioRequest,
    () => ({ isSuccess: false, isPending: true, isError: false, portfolio: undefined })
);
export const deletePortfolioSuccessAction = createAction(
    PortfolioActionEnums.DeletePortfolioSuccess,
    () => ({ isSuccess: true, isPending: false, isError: false, undefined })
);
export const deletePortfolioErrorAction = createAction(
    PortfolioActionEnums.DeletePortfolioError,
    () => ({ isSuccess: false, isPending: false, isError: true, portfolio: undefined })
);
