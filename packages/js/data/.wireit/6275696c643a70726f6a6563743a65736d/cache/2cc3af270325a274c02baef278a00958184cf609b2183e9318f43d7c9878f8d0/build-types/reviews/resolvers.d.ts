import { ReviewObject, ReviewsQueryParams } from './types';
export declare function getReviews(query: ReviewsQueryParams): Generator<(import("redux").AnyAction & {
    options: import("@wordpress/api-fetch").APIFetchOptions;
}) | {
    type: "SET_ERROR";
    query: string;
    error: unknown;
} | {
    type: "UPDATE_REVIEWS";
    reviews: import("./types").ReviewObjectUpdate[];
    query: ReviewsQueryParams;
    totalCount: number;
}, void, {
    headers: Map<string, string>;
    data: Array<ReviewObject>;
}>;
export declare function getReview(id: number): Generator<(import("redux").AnyAction & {
    options: import("@wordpress/api-fetch").APIFetchOptions;
}) | {
    type: "SET_REVIEW";
    reviewId: number;
    reviewData: ReviewObject;
} | {
    type: "SET_ERROR";
    query: string;
    error: unknown;
}, void, {
    headers: Map<string, string>;
    data: ReviewObject;
}>;
export declare function getReviewsTotalCount(query: ReviewsQueryParams): Generator<Generator<(import("redux").AnyAction & {
    options: import("@wordpress/api-fetch").APIFetchOptions;
}) | {
    type: "SET_ERROR";
    query: string;
    error: unknown;
} | {
    type: "UPDATE_REVIEWS";
    reviews: import("./types").ReviewObjectUpdate[];
    query: ReviewsQueryParams;
    totalCount: number;
}, void, {
    headers: Map<string, string>;
    data: Array<ReviewObject>;
}>, void, unknown>;
//# sourceMappingURL=resolvers.d.ts.map