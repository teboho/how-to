import { createContext } from "react";

export enum OfferStatus {
    NEW = "NEW",
    Accepted = "Accepted"
}

export interface IOffer {
    id?: string;
    creationTime?: string;
    creatorUserId?: number;
    lastModificationTime?: string;
    lastModifierUserId?: number;
    isDeleted?: boolean;
    deleterUserId?: number;
    deletionTime?: string;
    taskId: string;
    counterAmount: number;
    status: number;
}

export interface IOfferStateContext {
    isPending: boolean;
    isError: boolean;
    isSuccess: boolean;
    offer?: IOffer;
    offers?: IOffer[];
}
export const OfferStateContext_Default: IOfferStateContext = {
    isPending: false,
    isError: false,
    isSuccess: false,
    offer: undefined,
    offers: undefined
}

export interface IOfferActionsContext {
    getOffer: () => void;
    getMyOffer: (taskId: string) => void;
    postOffer: (offer: IOffer) => void;
    putOffer: (offer: IOffer) => void;
    deleteOffer: (offer: IOffer) => void;
    getOffers: () => void;
    getTaskOffers: (taskId: string) => void;
    acceptOffer: (offerId: string) => void;
}
export const OfferActionsContext_Default: IOfferActionsContext = {
    getOffer: () => {},
    getMyOffer: () => {},
    postOffer: () => {},
    putOffer: () => {},
    deleteOffer: () => {},
    getOffers: () => {},
    getTaskOffers: () => {},
    acceptOffer: () => {}
}

const OfferStateContext = createContext<IOfferStateContext>(OfferStateContext_Default);
const OfferActionsContext = createContext<IOfferActionsContext>(OfferActionsContext_Default);

export {
    OfferActionsContext, OfferStateContext
};
