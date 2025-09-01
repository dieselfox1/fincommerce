export default AttributeFilter;
declare function AttributeFilter(props: any): JSX.Element;
declare namespace AttributeFilter {
    namespace propTypes {
        let config: PropTypes.Validator<NonNullable<PropTypes.InferProps<{
            labels: PropTypes.Requireable<PropTypes.InferProps<{
                rule: PropTypes.Requireable<string>;
                title: PropTypes.Requireable<string>;
                filter: PropTypes.Requireable<string>;
            }>>;
            rules: PropTypes.Requireable<(object | null | undefined)[]>;
            input: PropTypes.Requireable<object>;
        }>>>;
        let filter: PropTypes.Validator<NonNullable<PropTypes.InferProps<{
            key: PropTypes.Requireable<string>;
            rule: PropTypes.Requireable<string>;
            value: PropTypes.Requireable<(NonNullable<string | number | null | undefined> | null | undefined)[]>;
        }>>>;
        let onFilterChange: PropTypes.Validator<(...args: any[]) => any>;
    }
}
import PropTypes from 'prop-types';
//# sourceMappingURL=attribute-filter.d.ts.map