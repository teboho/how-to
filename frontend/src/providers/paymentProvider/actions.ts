import { createAction } from "redux-actions";
import { IPaymentStateContext, IPayment } from "./context";

export const PaymentActionEnums = {
    GetPaymentRequest: "GET_PAYMENT_REQUEST",
    GetPaymentSuccess: "GET_PAYMENT_SUCCESS",
    GetPaymentError: "GET_PAYMENT_ERROR",

    PostPaymentRequest: "POST_PAYMENT_REQUEST",
    PostPaymentSuccess: "POST_PAYMENT_SUCCESS",
    PostPaymentError: "POST_PAYMENT_ERROR",

    PutPaymentRequest: "PUT_PAYMENT_REQUEST",
    PutPaymentSuccess: "PUT_PAYMENT_SUCCESS",
    PutPaymentError: "PUT_PAYMENT_ERROR",

    GetPaymentsRequest: "GET_PAYMENTS_REQUEST",
    GetPaymentsSuccess: "GET_PAYMENTS_SUCCESS",
    GetPaymentsError: "GET_PAYMENTS_ERROR"
}

export const getPaymentRequestAction = createAction<IPaymentStateContext>(
    PaymentActionEnums.GetPaymentRequest,
    () => ({ isPending: true, isSuccess: false, isError: false, payment: undefined })
);

export const getPaymentSuccessAction = createAction<IPaymentStateContext, IPayment>(
    PaymentActionEnums.GetPaymentSuccess,
    (payment: IPayment) => ({ isPending: false, isSuccess: true, isError: false, payment })
);

export const getPaymentErrorAction = createAction<IPaymentStateContext>(
    PaymentActionEnums.GetPaymentError,
    () => ({ isPending: false, isSuccess: false, isError: true, payment: undefined })
);

export const postPaymentRequestAction = createAction<IPaymentStateContext>(
    PaymentActionEnums.PostPaymentRequest,
    () => ({ isPending: true, isSuccess: false, isError: false, payment: undefined })
);

export const postPaymentSuccessAction = createAction<IPaymentStateContext, IPayment>(
    PaymentActionEnums.PostPaymentSuccess,
    (payment: IPayment) => ({ isPending: false, isSuccess: true, isError: false, payment })
);

export const postPaymentErrorAction = createAction<IPaymentStateContext>(
    PaymentActionEnums.PostPaymentError,
    () => ({ isPending: false, isSuccess: false, isError: true, payment: undefined })
);

export const putPaymentRequestAction = createAction<IPaymentStateContext>(
    PaymentActionEnums.PutPaymentRequest,
    () => ({ isPending: true, isSuccess: false, isError: false, payment: undefined })
);

export const putPaymentSuccessAction = createAction<IPaymentStateContext, IPayment>(
    PaymentActionEnums.PutPaymentSuccess,
    (payment: IPayment) => ({ isPending: false, isSuccess: true, isError: false, payment })
);

export const putPaymentErrorAction = createAction<IPaymentStateContext>(
    PaymentActionEnums.PutPaymentError,
    () => ({ isPending: false, isSuccess: false, isError: true, payment: undefined })
);

export const getPaymentsRequestAction = createAction<IPaymentStateContext>(
    PaymentActionEnums.GetPaymentsRequest,
    () => ({ isPending: true, isSuccess: false, isError: false, payments: undefined })
);

export const getPaymentsSuccessAction = createAction<IPaymentStateContext, IPayment[]>(
    PaymentActionEnums.GetPaymentsSuccess,
    (payments: IPayment[]) => ({ isPending: false, isSuccess: true, isError: false, payments })
);

export const getPaymentsErrorAction = createAction<IPaymentStateContext>(
    PaymentActionEnums.GetPaymentsError,
    () => ({ isPending: false, isSuccess: false, isError: true, payment: undefined })
);
