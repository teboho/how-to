"use client";
import { getAxiosInstace } from "@/utils";
import { message } from "antd";
import React, { useEffect, useMemo, useReducer } from "react";
import { useAuthState } from "../authProvider";
import * as reviewActions from "./actions";
import { IReview, ReviewActionsContext, ReviewStateContext, ReviewStateContext_Default } from "./context";
import reviewReducer from "./reducer";

const ReviewProvider = ({ children }: { children: React.ReactNode }) => {
    const [messageApi, contextHolder] = message.useMessage();
    const { loginObj } = useAuthState();
    const [state, dispatch] = useReducer(reviewReducer, ReviewStateContext_Default);

    useEffect(() => {
        if (loginObj && !state.reviews) {
            getReviews();
        }
    }, []);

    useEffect(() => {
        if (loginObj && !state.reviews) {
            getReviews();
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

    const getReview = (id: string) => {
        dispatch(reviewActions.getReviewRequestAction());
        const endpoint = "api/services/app/Review/Get?id=" + id;
        instance.get(endpoint)
            .then(response => {
                if (response.status > 199 && response.status < 300) {
                    dispatch(reviewActions.getReviewSuccessAction(response.data.result))
                } else {
                    dispatch(reviewActions.getReviewErrorAction())
                }
            })
            .catch(err =>
                dispatch(reviewActions.getReviewErrorAction())
            );
    }
    const postReview = (review: IReview) => {
        dispatch(reviewActions.postReviewRequestAction());
        const endpoint = "api/services/app/Review/Create"
        instance.post(endpoint, review)
            .then(response => {
                if (response.status > 199 && response.status < 300) {
                    dispatch(reviewActions.postReviewSuccessAction(response.data.result));
                    messageApi.success("Review created successfully");
                } else {
                    dispatch(reviewActions.postReviewErrorAction())
                }
            })
            .catch(err =>
                dispatch(reviewActions.postReviewErrorAction())
            );
    }
    const putReview = (review: IReview) => {
        dispatch(reviewActions.putReviewRequestAction());
        const endpoint = "api/services/app/Review/Update";
        instance.put(endpoint, review)
            .then(response => {
                if (response.status > 199 && response.status < 300) {
                    dispatch(reviewActions.putReviewSuccessAction(response.data.result));
                } else {
                    dispatch(reviewActions.putReviewErrorAction())
                }
            })
            .catch(err =>
                dispatch(reviewActions.putReviewErrorAction())
            );
    }
    const deleteReview = (review: IReview) => {
        dispatch(reviewActions.deleteReviewRequestAction());
        const endpoint = "api/services/app/Review/Delete";
        instance.delete(endpoint, { data: review })
            .then(response => {
                if (response.status > 199 && response.status < 300) {
                    dispatch(reviewActions.deleteReviewSuccessAction())
                } else {
                    dispatch(reviewActions.deleteReviewErrorAction())
                }
            })
            .catch(err =>
                dispatch(reviewActions.deleteReviewErrorAction())
            );
    }
    const getReviews = () => {
        dispatch(reviewActions.getReviewsRequestAction());
        const endpoint = "api/services/app/Review/GetAll";
        instance.get(endpoint)
            .then(response => {
                if (response.status > 199 && response.status < 300) {
                    dispatch(reviewActions.getReviewsSuccessAction(response.data.result.items))
                } else {
                    dispatch(reviewActions.getReviewsErrorAction())
                }
            })
            .catch(err =>
                dispatch(reviewActions.getReviewsErrorAction())
            );
    }
    const getMyReviews = () => {
        dispatch(reviewActions.getReviewsRequestAction());
        const endpoint = "api/services/app/Review/GetMyReviews";
        instance.get(endpoint)
            .then(response => {
                if (response.status > 199 && response.status < 300) {
                    dispatch(reviewActions.getReviewsSuccessAction(response.data.result))
                } else {
                    dispatch(reviewActions.getReviewsErrorAction())
                }
            })
            .catch(err =>
                dispatch(reviewActions.getReviewsErrorAction())
            );
    }

    const getLocalReview = (id?: string) => state.reviews?.find(r => r.id === id);

    return (
        <ReviewStateContext.Provider value={{ ...state }}>
            <ReviewActionsContext.Provider value={{
                getReview,
                postReview,
                putReview,
                deleteReview,
                getReviews,
                getMyReviews,
                getLocalReview
            }}>
                {contextHolder}
                {children}
            </ReviewActionsContext.Provider>
        </ReviewStateContext.Provider>
    );
}

export default ReviewProvider;

export const useReviewState = () => {
    const context = React.useContext(ReviewStateContext);
    if (!context) {
        throw new Error("useReviewState must be used as a descendant within a ReviewProvider");
    }
    return context;
}

export const useReviewActions = () => {
    const context = React.useContext(ReviewActionsContext);
    if (!context) {
        throw new Error("useReviewActions must be used as a descendant within a ReviewProvider");
    }
    return context;
}