export default AdvancedFilters;
/**
 * Displays a configurable set of filters which can modify query parameters.
 */
declare class AdvancedFilters extends Component<any, any, any> {
    constructor({ query, config }: {
        query: any;
        config: any;
    }, ...args: any[]);
    instanceCounts: {};
    state: {
        match: any;
        activeFilters: any[];
    };
    filterListRef: import("react").RefObject<any>;
    onMatchChange(match: any): void;
    onFilterChange(index: any, { property, value, shouldResetValue }: {
        property: any;
        value: any;
        shouldResetValue?: boolean | undefined;
    }): void;
    getAvailableFilters(): any[];
    addFilter(key: any, onClose: any): void;
    removeFilter(index: any): void;
    clearFilters(): void;
    getUpdateHref(activeFilters: any, matchValue: any): string;
    onFilter(): void;
    componentDidUpdate(prevProps: any): void;
    getInstanceNumber(key: any): number;
    getTitle(): Element;
    isEnglish(): boolean;
    orderFilters(a: any, b: any): number;
    render(): JSX.Element;
}
declare namespace AdvancedFilters {
    namespace propTypes {
        let config: PropTypes.Validator<NonNullable<PropTypes.InferProps<{
            title: PropTypes.Requireable<string>;
            filters: PropTypes.Requireable<{
                [x: string]: PropTypes.InferProps<{
                    labels: PropTypes.Requireable<PropTypes.InferProps<{
                        add: PropTypes.Requireable<string>;
                        remove: PropTypes.Requireable<string>;
                        rule: PropTypes.Requireable<string>;
                        title: PropTypes.Requireable<string>;
                        filter: PropTypes.Requireable<string>;
                    }>>;
                    rules: PropTypes.Requireable<(object | null | undefined)[]>;
                    input: PropTypes.Requireable<object>;
                }> | null | undefined;
            }>;
        }>>>;
        let path: PropTypes.Validator<string>;
        let query: PropTypes.Requireable<object>;
        let onAdvancedFilterAction: PropTypes.Requireable<(...args: any[]) => any>;
        let siteLocale: PropTypes.Requireable<string>;
        let currency: PropTypes.Validator<object>;
    }
    namespace defaultProps {
        let query_1: {};
        export { query_1 as query };
        export function onAdvancedFilterAction_1(): void;
        export { onAdvancedFilterAction_1 as onAdvancedFilterAction };
        let siteLocale_1: string;
        export { siteLocale_1 as siteLocale };
    }
}
import { Component } from '@wordpress/element';
import PropTypes from 'prop-types';
//# sourceMappingURL=index.d.ts.map