type PersonalizationTagsPopoverProps = {
    contentRef: React.RefObject<HTMLElement>;
    onUpdate: (originalValue: string, updatedValue: string) => void;
};
/**
 * Component to display a popover with a text control to update personalization tags.
 * The popover is displayed when a user clicks on a personalization tag in the editor.
 *
 * @param root0
 * @param root0.contentRef Reference to the container where the popover should be displayed
 * @param root0.onUpdate   Callback to update the personalization tag
 */
declare const PersonalizationTagsPopover: ({ contentRef, onUpdate, }: PersonalizationTagsPopoverProps) => import("react/jsx-runtime").JSX.Element;
export { PersonalizationTagsPopover };
