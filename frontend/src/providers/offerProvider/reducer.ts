import { handleActions } from 'redux-actions';
import { OfferActionEnums } from './actions';
import { OfferStateContext_Default } from './context';

const offerReducer = handleActions(
    {
        [OfferActionEnums.GetOfferRequest]: (state) => {
            return { ...state, isPending: true, isSuccess: false, isError: false, offer: undefined };
        },
        [OfferActionEnums.GetOfferSuccess]: (state, action) => {
            return { ...state, ...action.payload };
        },
        [OfferActionEnums.GetOfferError]: (state) => {
            return { ...state, isPending: false, isSuccess: false, isError: true, offer: undefined };
        },

        [OfferActionEnums.PostOfferRequest]: (state) => {
            return { ...state, isPending: true, isSuccess: false, isError: false, offer: undefined };
        },
        [OfferActionEnums.PostOfferSuccess]: (state, action) => {
            return { ...state, ...action.payload };
        },
        [OfferActionEnums.PostOfferError]: (state) => {
            return { ...state, isPending: false, isSuccess: false, isError: true, offer: undefined };
        },

        [OfferActionEnums.PutOfferRequest]: (state) => {
            return { ...state, isPending: true, isSuccess: false, isError: false };
        },
        [OfferActionEnums.PutOfferSuccess]: (state, action) => {
            return { ...state, ...action.payload };
        },
        [OfferActionEnums.PutOfferError]: (state) => {
            return { ...state, isPending: false, isSuccess: false, isError: true, offer: undefined };
        },

        [OfferActionEnums.DeleteOfferRequest]: (state) => {
            return { ...state, isPending: true, isSuccess: false, isError: false, offer: undefined };
        },
        [OfferActionEnums.DeleteOfferSuccess]: (state, action) => {
            return { ...state, isPending: false, isSuccess: true, isError: false };
        },
        [OfferActionEnums.DeleteOfferError]: (state, action) => {
            return { ...state, isPending: false, isSuccess: false, isError: true };
        },
        
        [OfferActionEnums.GetOffersRequest]: (state) => {
            return { ...state, isPending: true, isSuccess: false, isError: false, offers: undefined };
        },
        [OfferActionEnums.GetOffersSuccess]: (state, action) => {
            return { ...state, ...action.payload };
        },
        [OfferActionEnums.GetOffersError]: (state, action) => {
            return { ...state, isPending: false, isSuccess: false, isError: true, offers: undefined };
        },

        [OfferActionEnums.ClearOfferState]: (state) => {
            return { ...OfferStateContext_Default };
        }
    },
    OfferStateContext_Default
);

export default offerReducer;