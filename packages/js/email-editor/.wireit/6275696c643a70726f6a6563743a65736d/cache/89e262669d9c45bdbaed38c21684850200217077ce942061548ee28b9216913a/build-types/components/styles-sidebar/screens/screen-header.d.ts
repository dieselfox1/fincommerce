type Props = {
    title: string;
    description?: string;
    onBack?: () => void;
};
/**
 * Component for displaying the screen header and optional description based on site editor component:
 * https://github.com/WordPress/gutenberg/blob/7fa03fafeb421ab4c3604564211ce6007cc38e84/packages/edit-site/src/components/global-styles/header.js
 *
 * @param root0
 * @param root0.title
 * @param root0.description
 * @param root0.onBack
 */
export declare function ScreenHeader({ title, description, onBack }: Props): import("react/jsx-runtime").JSX.Element;
export default ScreenHeader;
