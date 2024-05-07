"use client";
import { getAxiosInstace } from "@/utils";
import { message } from "antd";
import React, { useMemo, useReducer } from "react";
import { useAuthState } from "../authProvider";
import * as paymentActions from "./actions";
import { IPayment, PaymentActionsContext, PaymentStateContext, PaymentStateContext_Default } from "./context";
import paymentReducer from "./reducer";

const PaymentProvider = ({ children }: { children: React.ReactNode }) => {
    const [messageApi, contextHolder] = message.useMessage();
    const { loginObj } = useAuthState();
    const [state, dispatch] = useReducer(paymentReducer, PaymentStateContext_Default);

    const instance = useMemo(() => {
        const accessToken = loginObj?.accessToken;
        if (accessToken) {
            return getAxiosInstace(accessToken)
        } else {
            return getAxiosInstace("");
        }
    }, [loginObj]);

    const getPayment = (id: string) => {
        dispatch(paymentActions.getPaymentRequestAction());
        const endpoint = "api/services/app/Payment/Get?id=" + id;
        instance.get(endpoint)
            .then(response => {
                if (response.status > 199 && response.status < 300) {
                    dispatch(paymentActions.getPaymentSuccessAction(response.data.result))
                } else {
                    dispatch(paymentActions.getPaymentErrorAction())
                }
            })
            .catch(err =>
                dispatch(paymentActions.getPaymentErrorAction())
            );
    }
    const postPayment = (payment: IPayment) => {
        dispatch(paymentActions.postPaymentRequestAction());
        const endpoint = "api/services/app/Payment/Create"
        instance.post(endpoint, payment)
            .then(response => {
                if (response.status > 199 && response.status < 300) {
                    dispatch(paymentActions.postPaymentSuccessAction(response.data.result));
                    messageApi.success("Payment created successfully");
                } else {
                    dispatch(paymentActions.postPaymentErrorAction())
                }
            })
            .catch(err =>
                dispatch(paymentActions.postPaymentErrorAction())
            );
    }
    const putPayment = (payment: IPayment) => {
        dispatch(paymentActions.putPaymentRequestAction());
        const endpoint = "api/services/app/Payment/Update";
        instance.put(endpoint, payment)
            .then(response => {
                if (response.status > 199 && response.status < 300) {
                    dispatch(paymentActions.putPaymentSuccessAction(response.data.result));
                } else {
                    dispatch(paymentActions.putPaymentErrorAction())
                }
            })
            .catch(err =>
                dispatch(paymentActions.putPaymentErrorAction())
            );
    }
    const getPayments = () => {
        dispatch(paymentActions.getPaymentsRequestAction());
        const endpoint = "api/services/app/Payment/GetAll";
        instance.get(endpoint)
            .then(response => {
                if (response.status > 199 && response.status < 300) {
                    dispatch(paymentActions.getPaymentsSuccessAction(response.data.result.items))
                } else {
                    dispatch(paymentActions.getPaymentsErrorAction())
                }
            })
            .catch(err =>
                dispatch(paymentActions.getPaymentsErrorAction())
            );
    }
    const getMyPayments = () => {
        dispatch(paymentActions.getPaymentsRequestAction());
        const endpoint = "api/services/app/Payment/GetMyPayments";
        instance.get(endpoint)
            .then(response => {
                if (response.status > 199 && response.status < 300) {
                    dispatch(paymentActions.getPaymentsSuccessAction(response.data.result));
                } else {
                    dispatch(paymentActions.getPaymentsErrorAction())
                }
            })
            .catch(err =>
                dispatch(paymentActions.getPaymentsErrorAction())
            );
    }

    return (
        <PaymentStateContext.Provider value={{ ...state }}>
            <PaymentActionsContext.Provider value={{
                getPayment,
                postPayment,
                putPayment,
                getPayments,
                getMyPayments,
            }}>
                {contextHolder}
                {children}
            </PaymentActionsContext.Provider>
        </PaymentStateContext.Provider>
    );
}

export default PaymentProvider;

export const usePaymentState = () => {
    const context = React.useContext(PaymentStateContext);
    if (!context) {
        throw new Error("usePaymentState must be used as a descendant within a PaymentProvider");
    }
    return context;
}

export const usePaymentActions = () => {
    const context = React.useContext(PaymentActionsContext);
    if (!context) {
        throw new Error("usePaymentActions must be used as a descendant within a PaymentProvider");
    }
    return context;
}