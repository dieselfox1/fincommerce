type MenuItemProps = {
    /**
     * Whether the menu item is checked or not. Only relevant for menu items with `isCheckbox`.
     */
    checked?: boolean;
    /**
     * A renderable component (or string) which will be displayed as the content of this item. Generally a `ToggleControl`.
     */
    children?: React.ReactNode;
    /**
     * Whether the menu item is a checkbox (will render a FormToggle and use the `menuitemcheckbox` role).
     */
    isCheckbox?: boolean;
    /**
     * Boolean to control whether the MenuItem should handle the click event. Defaults to false, assuming your child component
     * handles the click event.
     */
    isClickable?: boolean;
    /**
     * A function called when this item is activated via keyboard ENTER or SPACE; or when the item is clicked
     * (only if `isClickable` is set).
     */
    onInvoke: (() => void) | undefined;
};
declare const MenuItem: ({ checked, children, isCheckbox, isClickable, onInvoke, }: MenuItemProps) => JSX.Element;
export default MenuItem;
//# sourceMappingURL=menu-item.d.ts.map