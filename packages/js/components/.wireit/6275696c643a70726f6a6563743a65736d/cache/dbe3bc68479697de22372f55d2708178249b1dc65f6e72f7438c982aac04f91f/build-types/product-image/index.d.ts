type Image = {
    src?: string;
    alt?: string;
};
type ProductImageProps = {
    /**
     * Product or variation object. The image to display will be pulled from
     * `product.images` or `variation.image`.
     * See https://fincommerce.github.io/fincommerce-rest-api-docs/#product-properties
     * and https://fincommerce.github.io/fincommerce-rest-api-docs/#product-variation-properties
     */
    product?: {
        images?: Array<Image>;
        image?: Image;
    } & Record<string, any>;
    /** The width of image to display. */
    width?: number | string;
    /** The height of image to display. */
    height?: number | string;
    /** Additional CSS classes. */
    className?: string;
    /** Text to use as the image alt attribute. */
    alt?: string;
    /** Additional style attributes. */
    style?: React.CSSProperties;
};
/**
 * Use `ProductImage` to display a product's or variation's featured image.
 * If no image can be found, a placeholder matching the front-end image
 * placeholder will be displayed.
 */
declare const ProductImage: React.VFC<ProductImageProps>;
export default ProductImage;
//# sourceMappingURL=index.d.ts.map