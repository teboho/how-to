import { createContext } from "react";

export interface IReview {
    id?: string;
    creationTime?: string;
    creatorUserId?: number;
    lastModificationTime?: string;
    lastModifierUserId?: number;
    isDeleted?: boolean;
    deleterUserId?: number;
    deletionTime?: string;
    content: string;
    rating: number;
    taskId: string;
}

export interface IReviewStateContext {
    isPending: boolean;
    isError: boolean;
    isSuccess: boolean;
    review?: IReview;
    reviews?: IReview[];
    myReviews?: IReview[];
}

export const ReviewStateContext_Default: IReviewStateContext = {
    isPending: false,
    isError: false,
    isSuccess: false,
    review: undefined,
    reviews: undefined,
    myReviews: undefined
}

export interface IReviewActionsContext {
    getReview: (id: string) => void;
    getReviewByTaskId: (taskId: string) => void;
    postReview: (review: IReview) => void;
    putReview: (review: IReview) => void;
    deleteReview: (review: IReview) => void;
    getReviews: () => void;
    getMyReviews: () => void;
    getLocalReview: (id: string) => IReview | undefined;
}
export const ReviewActionsContext_Default: IReviewActionsContext = {
    getReview: () => {},
    getReviewByTaskId: () => {},
    postReview: () => {},
    putReview: () => {},
    deleteReview: () => {},
    getReviews: () => {},
    getMyReviews: () => {},
    getLocalReview: () => undefined
}

const ReviewStateContext = createContext<IReviewStateContext>(ReviewStateContext_Default);
const ReviewActionsContext = createContext<IReviewActionsContext>(ReviewActionsContext_Default);

export {
    ReviewActionsContext, ReviewStateContext
};
