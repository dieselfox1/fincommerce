type ReviewRatingProps = {
    /**
     * A review object containing a `rating`.
     * See https://fincommerce.github.io/fincommerce-rest-api-docs/#retrieve-product-reviews.
     */
    review: {
        rating?: number;
    };
};
/**
 * Display a set of stars representing the review's rating.
 */
export default function ReviewRating({ review, ...props }: ReviewRatingProps): JSX.Element;
export {};
//# sourceMappingURL=review.d.ts.map