import { createAction } from "redux-actions";
import { IReview, IReviewStateContext, ReviewStateContext_Default } from "./context";

export const ReviewActionEnums = {
    GetReviewRequest: "GET_REVIEW_REQUEST",
    GetReviewSuccess: "GET_REVIEW_SUCCESS",
    GetReviewError: "GET_REVIEW_ERROR",

    PostReviewRequest: "POST_REVIEW_REQUEST",
    PostReviewSuccess: "POST_REVIEW_SUCCESS",
    PostReviewError: "POST_REVIEW_ERROR",

    PutReviewRequest: "PUT_REVIEW_REQUEST",
    PutReviewSuccess: "PUT_REVIEW_SUCCESS",
    PutReviewError: "PUT_REVIEW_ERROR",

    DeleteReviewRequest: "DELETE_REVIEW_REQUEST",
    DeleteReviewSuccess: "DELETE_REVIEW_SUCCESS",
    DeleteReviewError: "DELETE_REVIEW_ERROR",

    GetReviewsRequest: "GET_REVIEWS_REQUEST",
    GetReviewsSuccess: "GET_REVIEWS_SUCCESS",
    GetReviewsError: "GET_REVIEWS_ERROR",

    GetMyReviewsRequest: "GET_MY_REVIEWS_REQUEST",
    GetMyReviewsSuccess: "GET_MY_REVIEWS_SUCCESS",
    GetMyReviewsError: "GET_MY_REVIEWS_ERROR",

    ClearReviewState: "CLEAR_REVIEW_STATE"
}

export const getReviewRequestAction = createAction<IReviewStateContext>(
    ReviewActionEnums.GetReviewRequest,
    () => ({ isPending: true, isSuccess: false, isError: false, review: undefined })
);
export const getReviewSuccessAction = createAction<IReviewStateContext, IReview>(
    ReviewActionEnums.GetReviewSuccess,
    (review: IReview) => ({ isPending: false, isSuccess: true, isError: false, review })
);
export const getReviewErrorAction = createAction<IReviewStateContext>(
    ReviewActionEnums.GetReviewError,
    () => ({ isPending: false, isSuccess: false, isError: true, review: undefined })
);

export const postReviewRequestAction = createAction<IReviewStateContext>(
    ReviewActionEnums.PostReviewRequest,
    () => ({ isPending: true, isSuccess: false, isError: false, review: undefined })
);
export const postReviewSuccessAction = createAction<IReviewStateContext, IReview>(
    ReviewActionEnums.PostReviewSuccess,
    (review: IReview) => ({ isPending: false, isSuccess: true, isError: false, review })
);
export const postReviewErrorAction = createAction<IReviewStateContext>(
    ReviewActionEnums.PostReviewError,
    () => ({ isPending: false, isSuccess: false, isError: true, review: undefined })
);

export const putReviewRequestAction = createAction<IReviewStateContext>(
    ReviewActionEnums.PutReviewRequest,
    () => ({ isPending: true, isSuccess: false, isError: false, review: undefined })
);
export const putReviewSuccessAction = createAction<IReviewStateContext, IReview>(
    ReviewActionEnums.PutReviewSuccess,
    (review: IReview) => ({ isPending: false, isSuccess: true, isError: false, review })
);
export const putReviewErrorAction = createAction<IReviewStateContext>(
    ReviewActionEnums.PutReviewError,
    () => ({ isPending: false, isSuccess: false, isError: true, review: undefined })
);

export const deleteReviewRequestAction = createAction<IReviewStateContext>(
    ReviewActionEnums.DeleteReviewRequest,
    () => ({ isPending: true, isSuccess: false, isError: false, review: undefined })
);
export const deleteReviewSuccessAction = createAction<IReviewStateContext>(
    ReviewActionEnums.DeleteReviewSuccess,
    () => ({ isPending: false, isSuccess: true, isError: false })
);
export const deleteReviewErrorAction = createAction<IReviewStateContext>(
    ReviewActionEnums.DeleteReviewError,
    () => ({ isPending: false, isSuccess: false, isError: true, review: undefined })
);

export const getReviewsRequestAction = createAction<IReviewStateContext>(
    ReviewActionEnums.GetReviewsRequest,
    () => ({ isPending: true, isSuccess: false, isError: false, reviews: undefined })
);
export const getReviewsSuccessAction = createAction<IReviewStateContext, IReview[]>(
    ReviewActionEnums.GetReviewsSuccess,
    (reviews: IReview[]) => ({ isPending: false, isSuccess: true, isError: false, reviews })
);
export const getReviewsErrorAction = createAction<IReviewStateContext>(
    ReviewActionEnums.GetReviewsError,
    () => ({ isPending: false, isSuccess: false, isError: true, review: undefined })
);

export const getMyReviewsRequestAction = createAction<IReviewStateContext>(
    ReviewActionEnums.GetMyReviewsRequest,
    () => ({ ...ReviewStateContext_Default })
);

export const clearReviewStateAction = createAction<IReviewStateContext>(
    ReviewActionEnums.ClearReviewState,
    () => ({ ...ReviewStateContext_Default })
);