export default DatePicker;
declare class DatePicker extends Component<any, any, any> {
    constructor(props: any);
    onDateChange(onToggle: any, dateString: any): void;
    onInputChange(event: any): void;
    handleFocus(isOpen: any, onToggle: any): void;
    handleBlur(isOpen: any, onToggle: any, event: any): void;
    render(): JSX.Element;
}
declare namespace DatePicker {
    namespace propTypes {
        let date: PropTypes.Requireable<object>;
        let disabled: PropTypes.Requireable<boolean>;
        let text: PropTypes.Requireable<string>;
        let error: PropTypes.Requireable<string>;
        let onUpdate: PropTypes.Validator<(...args: any[]) => any>;
        let dateFormat: PropTypes.Validator<string>;
        let isInvalidDate: PropTypes.Requireable<(...args: any[]) => any>;
    }
}
import { Component } from '@wordpress/element';
import PropTypes from 'prop-types';
//# sourceMappingURL=date-picker.d.ts.map