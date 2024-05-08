import { handleActions } from 'redux-actions';
import { PaymentActionEnums } from './actions';
import { PaymentStateContext_Default } from './context';

const paymentReducer = handleActions(
    {
        [PaymentActionEnums.GetPaymentRequest]: (state) => {
            return { ...state, isPending: true, isSuccess: false, isError: false, payment: undefined };
        },
        [PaymentActionEnums.GetPaymentSuccess]: (state, action) => {
            return { ...state, ...action.payload };
        },
        [PaymentActionEnums.GetPaymentError]: (state) => {
            return { ...state, isPending: false, isSuccess: false, isError: true, payment: undefined };
        },

        [PaymentActionEnums.PostPaymentRequest]: (state) => {
            return { ...state, isPending: true, isSuccess: false, isError: false, payment: undefined };
        },
        [PaymentActionEnums.PostPaymentSuccess]: (state, action) => {
            return { ...state, ...action.payload };
        },
        [PaymentActionEnums.PostPaymentError]: (state) => {
            return { ...state, isPending: false, isSuccess: false, isError: true, payment: undefined };
        },

        [PaymentActionEnums.PutPaymentRequest]: (state) => {
            return { ...state, isPending: true, isSuccess: false, isError: false };
        },
        [PaymentActionEnums.PutPaymentSuccess]: (state, action) => {
            return { ...state, ...action.payload };
        },
        [PaymentActionEnums.PutPaymentError]: (state) => {
            return { ...state, isPending: false, isSuccess: false, isError: true, payment: undefined };
        },
        
        [PaymentActionEnums.GetPaymentsRequest]: (state) => {
            return { ...state, isPending: true, isSuccess: false, isError: false, payments: undefined };
        },
        [PaymentActionEnums.GetPaymentsSuccess]: (state, action) => {
            return { ...state, ...action.payload };
        },
        [PaymentActionEnums.GetPaymentsError]: (state, action) => {
            return { ...state, isPending: false, isSuccess: false, isError: true, payments: undefined };
        },

        [PaymentActionEnums.ClearPaymentState]: (state) => {
            return { ...PaymentStateContext_Default };
        }
    },
    PaymentStateContext_Default
);

export default paymentReducer;