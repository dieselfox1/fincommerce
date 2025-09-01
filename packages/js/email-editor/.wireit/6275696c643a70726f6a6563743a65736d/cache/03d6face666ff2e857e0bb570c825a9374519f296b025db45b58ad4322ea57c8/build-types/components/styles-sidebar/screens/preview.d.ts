type Props = {
    label?: string;
    isFocused?: boolean;
    withHoverView?: boolean;
};
/**
 * Component to render the styles preview based on the component from the site editor:
 * https://github.com/WordPress/gutenberg/blob/5c7c4e7751df5e05fc70a354cd0d81414ac9c7e7/packages/edit-site/src/components/global-styles/preview-styles.js
 *
 * @param root0
 * @param root0.label
 * @param root0.isFocused
 * @param root0.withHoverView
 */
export declare function Preview({ label, isFocused, withHoverView, }: Props): JSX.Element;
export {};
