import { handleActions } from 'redux-actions';
import { PortfolioActionEnums } from './actions';
import { PortfolioStateContext_Default } from './context';

const portfolioReducer = handleActions(
    {
        [PortfolioActionEnums.GetPortfolioRequest]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        [PortfolioActionEnums.GetPortfolioSuccess]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        [PortfolioActionEnums.GetPortfolioError]: (state, action) => ({
            ...state,
            ...action.payload
        }),

        [PortfolioActionEnums.GetPortfoliosWithStoredFilesRequest]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        [PortfolioActionEnums.GetPortfoliosWithStoredFilesSuccess]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        [PortfolioActionEnums.GetPortfoliosWithStoredFilesError]: (state, action) => ({
            ...state,
            ...action.payload
        }),

        [PortfolioActionEnums.PutPortfolioRequest]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        [PortfolioActionEnums.PutPortfolioSuccess]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        [PortfolioActionEnums.PutPortfolioError]: (state, action) => ({
            ...state,
            ...action.payload
        }),

        [PortfolioActionEnums.PostPortfolioRequest]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        [PortfolioActionEnums.PostPortfolioSuccess]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        [PortfolioActionEnums.PostPortfolioError]: (state, action) => ({
            ...state,
            ...action.payload
        }),

        [PortfolioActionEnums.PostPortfoliosRequest]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        [PortfolioActionEnums.PostPortfoliosSuccess]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        [PortfolioActionEnums.PostPortfoliosError]: (state, action) => ({
            ...state,
            ...action.payload
        }),

        [PortfolioActionEnums.GetPortfoliosRequest]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        [PortfolioActionEnums.GetPortfoliosSuccess]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        [PortfolioActionEnums.GetPortfoliosError]: (state, action) => ({
            ...state,
            ...action.payload
        }),

        [PortfolioActionEnums.DeletePortfolioRequest]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        [PortfolioActionEnums.DeletePortfolioSuccess]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        [PortfolioActionEnums.DeletePortfolioError]: (state, action) => ({
            ...state,
            ...action.payload
        }),

        [PortfolioActionEnums.ClearPortfolioState]: (state, action) => ({
            ...PortfolioStateContext_Default
        })
    },
    PortfolioStateContext_Default
);

export default portfolioReducer;