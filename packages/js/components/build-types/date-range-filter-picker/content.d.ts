export default DatePickerContent;
declare class DatePickerContent extends Component<any, any, any> {
    constructor();
    onTabSelect(tab: any): void;
    controlsRef: import("react").RefObject<any>;
    isFutureDate(dateString: any): boolean;
    render(): JSX.Element;
}
declare namespace DatePickerContent {
    namespace propTypes {
        let period: PropTypes.Validator<string>;
        let compare: PropTypes.Validator<string>;
        let onUpdate: PropTypes.Validator<(...args: any[]) => any>;
        let onClose: PropTypes.Validator<(...args: any[]) => any>;
        let onSelect: PropTypes.Validator<(...args: any[]) => any>;
        let resetCustomValues: PropTypes.Validator<(...args: any[]) => any>;
        let focusedInput: PropTypes.Requireable<string>;
        let afterText: PropTypes.Requireable<string>;
        let beforeText: PropTypes.Requireable<string>;
        let afterError: PropTypes.Requireable<string>;
        let beforeError: PropTypes.Requireable<string>;
        let shortDateFormat: PropTypes.Validator<string>;
    }
}
import { Component } from '@wordpress/element';
import PropTypes from 'prop-types';
//# sourceMappingURL=content.d.ts.map