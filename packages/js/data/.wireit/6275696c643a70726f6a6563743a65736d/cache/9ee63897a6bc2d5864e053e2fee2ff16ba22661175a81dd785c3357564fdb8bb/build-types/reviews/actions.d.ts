import { ReviewObject, ReviewObjectUpdate, ReviewsQueryParams } from './types';
export declare function setReviewIsUpdating(reviewId: number, isUpdating: boolean): {
    type: "SET_REVIEW_IS_UPDATING";
    reviewId: number;
    isUpdating: boolean;
};
export declare function setReview(reviewId: number, reviewData: ReviewObject): {
    type: "SET_REVIEW";
    reviewId: number;
    reviewData: ReviewObject;
};
export declare function setError(query: string, error: unknown): {
    type: "SET_ERROR";
    query: string;
    error: unknown;
};
export declare function updateReviews(query: ReviewsQueryParams, reviews: Array<ReviewObjectUpdate>, totalCount: number): {
    type: "UPDATE_REVIEWS";
    reviews: ReviewObjectUpdate[];
    query: ReviewsQueryParams;
    totalCount: number;
};
export declare function updateReview(reviewId: number, reviewFields: ReviewObjectUpdate, query: ReviewsQueryParams): Generator<{
    type: string;
    request: import("@wordpress/api-fetch/build-types/types").APIFetchOptions;
} | {
    type: "SET_REVIEW_IS_UPDATING";
    reviewId: number;
    isUpdating: boolean;
} | {
    type: "SET_REVIEW";
    reviewId: number;
    reviewData: ReviewObject;
} | {
    type: "SET_ERROR";
    query: string;
    error: unknown;
}, void, ReviewObject>;
export declare function deleteReview(reviewId: number): Generator<{
    type: string;
    request: import("@wordpress/api-fetch/build-types/types").APIFetchOptions;
} | {
    type: "SET_REVIEW_IS_UPDATING";
    reviewId: number;
    isUpdating: boolean;
} | {
    type: "SET_REVIEW";
    reviewId: number;
    reviewData: ReviewObject;
} | {
    type: "SET_ERROR";
    query: string;
    error: unknown;
}, ReviewObject, ReviewObject>;
export type Action = ReturnType<typeof updateReviews | typeof setReviewIsUpdating | typeof setReview | typeof setError>;
//# sourceMappingURL=actions.d.ts.map