export default SegmentedSelection;
/**
 * Create a panel of styled selectable options rendering stylized checkboxes and labels
 */
declare class SegmentedSelection extends Component<any, any, any> {
    constructor(props: any);
    constructor(props: any, context: any);
    render(): JSX.Element;
}
declare namespace SegmentedSelection {
    namespace propTypes {
        let className: PropTypes.Requireable<string>;
        let options: PropTypes.Validator<(PropTypes.InferProps<{
            value: PropTypes.Validator<string>;
            label: PropTypes.Validator<string>;
        }> | null | undefined)[]>;
        let selected: PropTypes.Requireable<string>;
        let onSelect: PropTypes.Validator<(...args: any[]) => any>;
        let name: PropTypes.Validator<string>;
        let legend: PropTypes.Validator<string>;
    }
}
import { Component } from '@wordpress/element';
import PropTypes from 'prop-types';
//# sourceMappingURL=index.d.ts.map