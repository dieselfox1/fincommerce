/**
 * Internal dependencies
 */
import { ReviewsQueryParams, ReviewsState } from './types';
export declare const getReviews: (state: ReviewsState, query: ReviewsQueryParams) => Partial<import("./types").ReviewObject>[];
export declare const getReview: (state: ReviewsState, id: number) => Partial<import("./types").ReviewObject>;
export declare const getReviewsTotalCount: (state: ReviewsState, query: ReviewsQueryParams) => number;
export declare const getReviewsError: (state: ReviewsState, query: ReviewsQueryParams) => unknown;
export declare const getReviewError: (state: ReviewsState, id: number) => unknown;
//# sourceMappingURL=selectors.d.ts.map