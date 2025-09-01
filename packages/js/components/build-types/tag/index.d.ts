type Props = {
    /** The name for this item, displayed as the tag's text. */
    label: string;
    /** A unique ID for this item. This is used to identify the item when the remove button is clicked. */
    id?: number | string;
    /** Contents to display on click in a popover */
    popoverContents?: React.ReactNode;
    /** A function called when the remove X is clicked. If not used, no X icon will display.*/
    remove?: (id: number | string | undefined) => React.MouseEventHandler<HTMLButtonElement>;
    /** A more descriptive label for screen reader users. Defaults to the `name` prop. */
    screenReaderLabel?: string;
    /** Additional CSS classes. */
    className?: string;
};
declare const Tag: import("react").ForwardRefExoticComponent<Props & import("react").RefAttributes<HTMLButtonElement>>;
export default Tag;
//# sourceMappingURL=index.d.ts.map