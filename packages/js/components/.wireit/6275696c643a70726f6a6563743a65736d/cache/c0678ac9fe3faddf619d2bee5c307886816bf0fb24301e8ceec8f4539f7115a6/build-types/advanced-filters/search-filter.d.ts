export default SearchFilter;
declare class SearchFilter extends Component<any, any, any> {
    constructor({ filter, config, query }: {
        filter: any;
        config: any;
        query: any;
    }, ...args: any[]);
    onSearchChange(values: any): void;
    state: {
        selected: never[];
    };
    updateLabels(selected: any): void;
    componentDidUpdate(prevProps: any): void;
    getScreenReaderText(filter: any, config: any): string;
    render(): JSX.Element;
}
declare namespace SearchFilter {
    namespace propTypes {
        let config: PropTypes.Validator<NonNullable<PropTypes.InferProps<{
            labels: PropTypes.Requireable<PropTypes.InferProps<{
                placeholder: PropTypes.Requireable<string>;
                rule: PropTypes.Requireable<string>;
                title: PropTypes.Requireable<string>;
            }>>;
            rules: PropTypes.Requireable<(object | null | undefined)[]>;
            input: PropTypes.Requireable<object>;
        }>>>;
        let filter: PropTypes.Validator<NonNullable<PropTypes.InferProps<{
            key: PropTypes.Requireable<string>;
            rule: PropTypes.Requireable<string>;
            value: PropTypes.Requireable<string>;
        }>>>;
        let onFilterChange: PropTypes.Validator<(...args: any[]) => any>;
        let query: PropTypes.Requireable<object>;
    }
}
import { Component } from '@wordpress/element';
import PropTypes from 'prop-types';
//# sourceMappingURL=search-filter.d.ts.map