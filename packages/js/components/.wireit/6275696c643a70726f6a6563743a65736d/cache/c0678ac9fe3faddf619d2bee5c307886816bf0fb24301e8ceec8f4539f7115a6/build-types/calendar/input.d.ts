export default DateInput;
declare function DateInput({ disabled, value, onChange, dateFormat, label, describedBy, error, onFocus, onBlur, onKeyDown, errorPosition, }: {
    disabled?: boolean | undefined;
    value: any;
    onChange: any;
    dateFormat: any;
    label: any;
    describedBy: any;
    error: any;
    onFocus?: (() => void) | undefined;
    onBlur?: (() => void) | undefined;
    onKeyDown?: ((...args: any[]) => void) | undefined;
    errorPosition?: string | undefined;
}): JSX.Element;
declare namespace DateInput {
    namespace propTypes {
        let disabled: PropTypes.Requireable<boolean>;
        let value: PropTypes.Requireable<string>;
        let onChange: PropTypes.Validator<(...args: any[]) => any>;
        let dateFormat: PropTypes.Validator<string>;
        let label: PropTypes.Validator<string>;
        let describedBy: PropTypes.Validator<string>;
        let error: PropTypes.Requireable<string>;
        let errorPosition: PropTypes.Requireable<string>;
        let onFocus: PropTypes.Requireable<(...args: any[]) => any>;
        let onBlur: PropTypes.Requireable<(...args: any[]) => any>;
        let onKeyDown: PropTypes.Requireable<(...args: any[]) => any>;
    }
}
import PropTypes from 'prop-types';
//# sourceMappingURL=input.d.ts.map