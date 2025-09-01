export default SearchListItem;
declare function SearchListItem({ countLabel, className, depth, controlId, item, isSelected, isSingle, onSelect, search, ...props }: {
    [x: string]: any;
    countLabel: any;
    className: any;
    depth?: number | undefined;
    controlId?: string | undefined;
    item: any;
    isSelected: any;
    isSingle: any;
    onSelect: any;
    search?: string | undefined;
}): JSX.Element;
declare namespace SearchListItem {
    namespace propTypes {
        let className: PropTypes.Requireable<string>;
        let countLabel: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        let controlId: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        let depth: PropTypes.Requireable<number>;
        let item: PropTypes.Requireable<object>;
        let name: PropTypes.Requireable<string>;
        let isSelected: PropTypes.Requireable<boolean>;
        let isSingle: PropTypes.Requireable<boolean>;
        let onSelect: PropTypes.Requireable<(...args: any[]) => any>;
        let search: PropTypes.Requireable<string>;
    }
}
import PropTypes from 'prop-types';
//# sourceMappingURL=item.d.ts.map