import { handleActions } from 'redux-actions';
import { ReviewActionEnums } from './actions';
import { ReviewStateContext_Default } from './context';

const reviewReducer = handleActions(
    {
        [ReviewActionEnums.GetReviewRequest]: (state) => {
            return { ...state, isPending: true, isSuccess: false, isError: false, review: undefined };
        },
        [ReviewActionEnums.GetReviewSuccess]: (state, action) => {
            return { ...state, ...action.payload };
        },
        [ReviewActionEnums.GetReviewError]: (state) => {
            return { ...state, isPending: false, isSuccess: false, isError: true, review: undefined };
        },

        [ReviewActionEnums.PostReviewRequest]: (state) => {
            return { ...state, isPending: true, isSuccess: false, isError: false, review: undefined };
        },
        [ReviewActionEnums.PostReviewSuccess]: (state, action) => {
            const newReview = action.payload.review;
            let reviews = state.reviews;
            if (reviews && newReview) {
                reviews = [...reviews, newReview];
            }
            return { ...state, ...action.payload, reviews };
        },
        [ReviewActionEnums.PostReviewError]: (state) => {
            return { ...state, isPending: false, isSuccess: false, isError: true, review: undefined };
        },

        [ReviewActionEnums.PutReviewRequest]: (state) => {
            return { ...state, isPending: true, isSuccess: false, isError: false };
        },
        [ReviewActionEnums.PutReviewSuccess]: (state, action) => {
            const newReview = action.payload.review;
            let reviews = state.reviews;
            if (reviews && newReview) {
                reviews = [...reviews, newReview];
            }
            return { ...state, ...action.payload, reviews };
        },
        [ReviewActionEnums.PutReviewError]: (state) => {
            return { ...state, isPending: false, isSuccess: false, isError: true, review: undefined };
        },

        [ReviewActionEnums.DeleteReviewRequest]: (state) => {
            return { ...state, isPending: true, isSuccess: false, isError: false, review: undefined };
        },
        [ReviewActionEnums.DeleteReviewSuccess]: (state, action) => {
            return { ...state, isPending: false, isSuccess: true, isError: false };
        },
        [ReviewActionEnums.DeleteReviewError]: (state, action) => {
            return { ...state, isPending: false, isSuccess: false, isError: true };
        },
        
        [ReviewActionEnums.GetReviewsRequest]: (state) => {
            return { ...state, isPending: true, isSuccess: false, isError: false, reviews: undefined };
        },
        [ReviewActionEnums.GetReviewsSuccess]: (state, action) => {
            return { ...state, ...action.payload };
        },
        [ReviewActionEnums.GetReviewsError]: (state, action) => {
            return { ...state, isPending: false, isSuccess: false, isError: true, reviews: undefined };
        },
        
        [ReviewActionEnums.GetMyReviewsRequest]: (state) => {
            return { ...state, isPending: true, isSuccess: false, isError: false, myReviews: undefined };
        },
        [ReviewActionEnums.GetMyReviewsSuccess]: (state, action) => {
            return { ...state, ...action.payload };
        },
        [ReviewActionEnums.GetMyReviewsError]: (state, action) => {
            return { ...state, isPending: false, isSuccess: false, isError: true, myReviews: undefined };
        },

        [ReviewActionEnums.ClearReviewState]: (state) => {
            return { ...ReviewStateContext_Default };
        }
    },
    ReviewStateContext_Default
);

export default reviewReducer;