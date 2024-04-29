import { createContext } from "react";

export interface IPayment {
    id?: string;
    creationTime?: string;
    creatorUserId?: number;
    lastModificationTime?: string;
    lastModifierUserId?: number;
    isDeleted?: boolean;
    deleterUserId?: number;
    deletionTime?: string;
    beneficiaryId?: number;
    reference: string;
    bank: string;
    transaction: string;
    amount: number;
    taskId: string;
}
/**
 * 
 * {
  "reference": "T315443039853370",
  "trans": "3752300875",
  "status": "success",
  "message": "Approved",
  "transaction": "3752300875",
  "trxref": "T315443039853370",
  "bank": "STANDARD BANK SOUTH AFRICA",
  "return": "{\"redirecturl\":\"?trxref=T315443039853370&reference=T315443039853370\",\"trans\":\"3752300875\",\"trxref\":\"T315443039853370\",\"reference\":\"T315443039853370\",\"status\":\"success\",\"message\":\"Success\",\"response\":\"Approved\",\"bank\":\"STANDARD BANK SOUTH AFRICA\"}",
  "redirecturl": "?trxref=T315443039853370&reference=T315443039853370"
}
 */
export interface IPayfastResponse {
    reference: string;
    trans: string;
    status: string; 
    message: string;
    transaction: string;
    trxref: string;
    bank: string;
    return: string;
    redirecturl: string;
}

export interface IPaymentStateContext {
    isPending: boolean;
    isError: boolean;
    isSuccess: boolean;
    payment?: IPayment;
    payments?: IPayment[];
}
export const PaymentStateContext_Default: IPaymentStateContext = {
    isPending: false,
    isError: false,
    isSuccess: false,
    payment: undefined,
    payments: undefined
}

export interface IPaymentActionsContext {
    getPayment: (id: string) => void;
    postPayment: (payment: IPayment) => void;
    putPayment: (payment: IPayment) => void;
    getPayments: () => void;
    getMyPayments: () => void;
}
export const PaymentActionsContext_Default: IPaymentActionsContext = {
    getPayment: () => {},
    postPayment: () => {},
    putPayment: () => {},
    getPayments: () => {},
    getMyPayments: () => {},
}

const PaymentStateContext = createContext<IPaymentStateContext>(PaymentStateContext_Default);
const PaymentActionsContext = createContext<IPaymentActionsContext>(PaymentActionsContext_Default);

export {
    PaymentActionsContext, PaymentStateContext
};
