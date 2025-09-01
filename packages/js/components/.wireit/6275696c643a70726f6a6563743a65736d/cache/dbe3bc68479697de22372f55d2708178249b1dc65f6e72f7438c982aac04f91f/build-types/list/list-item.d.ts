export function handleKeyDown(event: any, onClick: any): void;
export default ListItem;
/**
 * List component to display a list of items.
 *
 * @param {Object} props props for list item
 */
declare function ListItem(props: Object): JSX.Element;
declare namespace ListItem {
    namespace propTypes {
        let item: PropTypes.Validator<NonNullable<PropTypes.InferProps<{
            /**
             * Content displayed after the list item text.
             */
            after: PropTypes.Requireable<PropTypes.ReactNodeLike>;
            /**
             * Content displayed before the list item text.
             */
            before: PropTypes.Requireable<PropTypes.ReactNodeLike>;
            /**
             * Additional class name to style the list item.
             */
            className: PropTypes.Requireable<string>;
            /**
             * Content displayed beneath the list item title.
             */
            content: PropTypes.Requireable<NonNullable<PropTypes.ReactNodeLike>>;
            /**
             * Href attribute used in a Link wrapped around the item.
             */
            href: PropTypes.Requireable<string>;
            /**
             * Called when the list item is clicked.
             */
            onClick: PropTypes.Requireable<(...args: any[]) => any>;
            /**
             * Target attribute used for Link wrapper.
             */
            target: PropTypes.Requireable<string>;
            /**
             * Title displayed for the list item.
             */
            title: PropTypes.Requireable<NonNullable<PropTypes.ReactNodeLike>>;
        }>>>;
    }
}
import PropTypes from 'prop-types';
//# sourceMappingURL=list-item.d.ts.map