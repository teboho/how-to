import { createAction } from "redux-actions";
import { IOffer, IOfferStateContext } from "./context";

export const OfferActionEnums = {
    GetOfferRequest: "GET_OFFER_REQUEST",
    GetOfferSuccess: "GET_OFFER_SUCCESS",
    GetOfferError: "GET_OFFER_ERROR",

    PostOfferRequest: "POST_OFFER_REQUEST",
    PostOfferSuccess: "POST_OFFER_SUCCESS",
    PostOfferError: "POST_OFFER_ERROR",

    PutOfferRequest: "PUT_OFFER_REQUEST",
    PutOfferSuccess: "PUT_OFFER_SUCCESS",
    PutOfferError: "PUT_OFFER_ERROR",

    DeleteOfferRequest: "DELETE_OFFER_REQUEST",
    DeleteOfferSuccess: "DELETE_OFFER_SUCCESS",
    DeleteOfferError: "DELETE_OFFER_ERROR",

    GetOffersRequest: "GET_OFFERS_REQUEST",
    GetOffersSuccess: "GET_OFFERS_SUCCESS",
    GetOffersError: "GET_OFFERS_ERROR"
}

export const getOfferRequestAction = createAction<IOfferStateContext>(
    OfferActionEnums.GetOfferRequest,
    () => ({ isPending: true, isSuccess: false, isError: false, offer: undefined })
);
export const getOfferSuccessAction = createAction<IOfferStateContext, IOffer>(
    OfferActionEnums.GetOfferSuccess,
    (offer: IOffer) => ({ isPending: false, isSuccess: true, isError: false, offer })
);
export const getOfferErrorAction = createAction<IOfferStateContext>(
    OfferActionEnums.GetOfferError,
    () => ({ isPending: false, isSuccess: false, isError: true, offer: undefined })
);

export const postOfferRequestAction = createAction<IOfferStateContext>(
    OfferActionEnums.PostOfferRequest,
    () => ({ isPending: true, isSuccess: false, isError: false, offer: undefined })
);
export const postOfferSuccessAction = createAction<IOfferStateContext, IOffer>(
    OfferActionEnums.PostOfferSuccess,
    (offer: IOffer) => ({ isPending: false, isSuccess: true, isError: false, offer })
);
export const postOfferErrorAction = createAction<IOfferStateContext>(
    OfferActionEnums.PostOfferError,
    () => ({ isPending: false, isSuccess: false, isError: true, offer: undefined })
);

export const putOfferRequestAction = createAction<IOfferStateContext>(
    OfferActionEnums.PutOfferRequest,
    () => ({ isPending: true, isSuccess: false, isError: false, offer: undefined })
);
export const putOfferSuccessAction = createAction<IOfferStateContext, IOffer>(
    OfferActionEnums.PutOfferSuccess,
    (offer: IOffer) => ({ isPending: false, isSuccess: true, isError: false, offer })
);
export const putOfferErrorAction = createAction<IOfferStateContext>(
    OfferActionEnums.PutOfferError,
    () => ({ isPending: false, isSuccess: false, isError: true, offer: undefined })
);

export const deleteOfferRequestAction = createAction<IOfferStateContext>(
    OfferActionEnums.DeleteOfferRequest,
    () => ({ isPending: true, isSuccess: false, isError: false, offer: undefined })
);
export const deleteOfferSuccessAction = createAction<IOfferStateContext>(
    OfferActionEnums.DeleteOfferSuccess,
    () => ({ isPending: false, isSuccess: true, isError: false })
);
export const deleteOfferErrorAction = createAction<IOfferStateContext>(
    OfferActionEnums.DeleteOfferError,
    () => ({ isPending: false, isSuccess: false, isError: true, offer: undefined })
);

export const getOffersRequestAction = createAction<IOfferStateContext>(
    OfferActionEnums.GetOffersRequest,
    () => ({ isPending: true, isSuccess: false, isError: false, offers: undefined })
);
export const getOffersSuccessAction = createAction<IOfferStateContext, IOffer[]>(
    OfferActionEnums.GetOffersSuccess,
    (offers: IOffer[]) => ({ isPending: false, isSuccess: true, isError: false, offers })
);
export const getOffersErrorAction = createAction<IOfferStateContext>(
    OfferActionEnums.GetOffersError,
    () => ({ isPending: false, isSuccess: false, isError: true, offer: undefined })
);
