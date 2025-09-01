export function SearchListControl(props: Object): JSX.Element;
export namespace SearchListControl {
    namespace propTypes {
        let className: PropTypes.Requireable<string>;
        let isCompact: PropTypes.Requireable<boolean>;
        let isHierarchical: PropTypes.Requireable<boolean>;
        let isLoading: PropTypes.Requireable<boolean>;
        let isSingle: PropTypes.Requireable<boolean>;
        let list: PropTypes.Requireable<(PropTypes.InferProps<{
            id: PropTypes.Requireable<number>;
            name: PropTypes.Requireable<string>;
        }> | null | undefined)[]>;
        let messages: PropTypes.Requireable<PropTypes.InferProps<{
            /**
             * A more detailed label for the "Clear all" button, read to screen reader users.
             */
            clear: PropTypes.Requireable<string>;
            /**
             * Message to display when the list is empty (implies nothing loaded from the server
             * or parent component).
             */
            noItems: PropTypes.Requireable<string>;
            /**
             * Message to display when no matching results are found. %s is the search term.
             */
            noResults: PropTypes.Requireable<string>;
            /**
             * Label for the search input
             */
            search: PropTypes.Requireable<string>;
            /**
             * Label for the selected items. This is actually a function, so that we can pass
             * through the count of currently selected items.
             */
            selected: PropTypes.Requireable<(...args: any[]) => any>;
            /**
             * Label indicating that search results have changed, read to screen reader users.
             */
            updated: PropTypes.Requireable<string>;
        }>>;
        let onChange: PropTypes.Validator<(...args: any[]) => any>;
        let onSearch: PropTypes.Requireable<(...args: any[]) => any>;
        let renderItem: PropTypes.Requireable<(...args: any[]) => any>;
        let selected: PropTypes.Validator<any[]>;
        let debouncedSpeak: PropTypes.Requireable<(...args: any[]) => any>;
        let instanceId: PropTypes.Requireable<number>;
    }
}
declare const _default: unknown;
export default _default;
import PropTypes from 'prop-types';
//# sourceMappingURL=index.d.ts.map