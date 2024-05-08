"use client";

import { getAxiosInstace } from "@/utils";
import { message } from "antd";
import React, { useEffect, useMemo, useReducer } from "react";
import { useAuthState } from "../authProvider";
import * as offerActions from "./actions";
import { IOffer, OfferActionsContext, OfferStateContext, OfferStateContext_Default } from "./context";
import offerReducer from "./reducer";

const OfferProvider = ({ children }: { children: React.ReactNode }) => {
    const { loginObj } = useAuthState();
    const [state, dispatch] = useReducer(offerReducer, OfferStateContext_Default);
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        if (!loginObj && localStorage.getItem("accessToken") === null) {
            clearOfferState();
        }
    }, [loginObj]);

    const instance = useMemo(() => {
        const accessToken = loginObj?.accessToken;
        if (accessToken) {
            return getAxiosInstace(accessToken)
        } else {
            return getAxiosInstace("");
        }
    }, [loginObj]);

    const getOffer = () => {
        dispatch(offerActions.getOfferRequestAction());
        const endpoint = "api/services/app/Offer/Get";
        instance.get(endpoint)
            .then(response => {
                if (response.status > 199 && response.status < 300) {
                    dispatch(offerActions.getOfferSuccessAction(response.data.result))
                } else {
                    dispatch(offerActions.getOfferErrorAction())
                }
            })
            .catch(err =>
                dispatch(offerActions.getOfferErrorAction())
            );
    }
    const postOffer = (offer: IOffer) => {
        dispatch(offerActions.postOfferRequestAction());
        const endpoint = "api/services/app/Offer/Create"
        instance.post(endpoint, offer)
            .then(response => {
                if (response.status > 199 && response.status < 300) {
                    dispatch(offerActions.postOfferSuccessAction(response.data.result));
                    messageApi.success("Offer created successfully");
                } else {
                    dispatch(offerActions.postOfferErrorAction())
                }
            })
            .catch(err =>
                dispatch(offerActions.postOfferErrorAction())
            );
    }
    const putOffer = (offer: IOffer) => {
        dispatch(offerActions.putOfferRequestAction());
        const endpoint = "api/services/app/Offer/Update";
        instance.put(endpoint, offer)
            .then(response => {
                if (response.status > 199 && response.status < 300) {
                    dispatch(offerActions.putOfferSuccessAction(response.data.result));
                    messageApi.success("Offer updated successfully");
                } else {
                    dispatch(offerActions.putOfferErrorAction())
                }
            })
            .catch(err =>
                dispatch(offerActions.putOfferErrorAction())
            );
    }
    const acceptOffer = (offerId: string) => {
        dispatch(offerActions.putOfferRequestAction());
        const endpoint = "api/services/app/Offer/Accept?offerId=" + offerId;
        instance.put(endpoint)
            .then(response => {
                if (response.status > 199 && response.status < 300) {
                    dispatch(offerActions.putOfferSuccessAction(response.data.result));
                    messageApi.success("Offer accepted successfully");
                } else {
                    dispatch(offerActions.putOfferErrorAction());
                }
            })
            .catch(err =>
                dispatch(offerActions.putOfferErrorAction())
            );
    }
    const deleteOffer = (offer: IOffer) => {
        dispatch(offerActions.deleteOfferRequestAction());
        const endpoint = "api/services/app/Offer/Delete";
        instance.delete(endpoint, { data: offer })
            .then(response => {
                if (response.status > 199 && response.status < 300) {
                    dispatch(offerActions.deleteOfferSuccessAction())
                } else {
                    dispatch(offerActions.deleteOfferErrorAction())
                }
            })
            .catch(err =>
                dispatch(offerActions.deleteOfferErrorAction())
            );
    }
    const getOffers = () => {
        dispatch(offerActions.getOffersRequestAction());
        const endpoint = "api/services/app/Offer/GetAll";
        instance.get(endpoint)
            .then(response => {
                if (response.status > 199 && response.status < 300) {
                    dispatch(offerActions.getOffersSuccessAction(response.data.result.items))
                } else {
                    dispatch(offerActions.getOffersErrorAction())
                }
            })
            .catch(err =>
                dispatch(offerActions.getOffersErrorAction())
            );
    }
    const getTaskOffers = (taskId: string) => {
        dispatch(offerActions.getOffersRequestAction());
        const endpoint = `api/services/app/Offer/GetOffers?taskId=${taskId}`;
        instance.get(endpoint)
            .then(response => {
                if (response.status > 199 && response.status < 300) {
                    dispatch(offerActions.getOffersSuccessAction(response.data.result))
                } else {
                    dispatch(offerActions.getOffersErrorAction())
                }
            })
            .catch(err =>
                dispatch(offerActions.getOffersErrorAction())
            );
    }
    const getMyOffer = (taskId: string) => {
        dispatch(offerActions.getOfferRequestAction());
        const endpoint = `api/services/app/Offer/GetMyOffer?taskId=${taskId}`;
        instance.get(endpoint)
            .then(response => {
                if (response.status > 199 && response.status < 300) {
                    dispatch(offerActions.getOfferSuccessAction(response.data.result))
                } else {
                    dispatch(offerActions.getOfferErrorAction())
                }
            })
            .catch(err =>
                dispatch(offerActions.getOfferErrorAction())
            );
    }

    const clearOfferState = () => {
        dispatch(offerActions.clearOfferStateAction());
    }

    return (
        <OfferStateContext.Provider value={{ ...state }}>
            <OfferActionsContext.Provider value={{
                getOffer,
                getMyOffer,
                postOffer,
                putOffer,
                deleteOffer,
                getOffers,
                getTaskOffers,
                acceptOffer
            }}>
                {contextHolder}
                {children}
            </OfferActionsContext.Provider>
        </OfferStateContext.Provider>
    );
}

export default OfferProvider;

export const useOfferState = () => {
    const context = React.useContext(OfferStateContext);
    if (!context) {
        throw new Error("useOfferState must be used as a descendant within a OfferProvider");
    }
    return context;
}

export const useOfferActions = () => {
    const context = React.useContext(OfferActionsContext);
    if (!context) {
        throw new Error("useOfferActions must be used as a descendant within a OfferProvider");
    }
    return context;
}