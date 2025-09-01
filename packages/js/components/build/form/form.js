"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Form = void 0;
/**
 * External dependencies
 */
const clsx_1 = __importDefault(require("clsx"));
const element_1 = require("@wordpress/element");
const deprecated_1 = __importDefault(require("@wordpress/deprecated"));
const react_1 = require("react");
const setWith_1 = __importDefault(require("lodash/setWith"));
const get_1 = __importDefault(require("lodash/get"));
const clone_1 = __importDefault(require("lodash/clone"));
const isEqual_1 = __importDefault(require("lodash/isEqual"));
const omit_1 = __importDefault(require("lodash/omit"));
/**
 * Internal dependencies
 */
const form_context_1 = require("./form-context");
function isChangeEvent(value) {
    return value.target !== undefined;
}
/**
 * A form component to handle form state and provide input helper props.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function FormComponent({ children, onSubmit = () => { }, onChange = () => { }, onChanges = () => { }, ...props }, ref) {
    const initialValues = (0, react_1.useRef)(props.initialValues ?? {});
    const [values, setValuesInternal] = (0, element_1.useState)(props.initialValues ?? {});
    const [errors, setErrors] = (0, element_1.useState)(props.errors || {});
    const [touched, setTouched] = (0, element_1.useState)(props.touched || {});
    const validate = (0, element_1.useCallback)((newValues, onValidate = () => { }) => {
        const newErrors = props.validate ? props.validate(newValues) : {};
        setErrors(newErrors || {});
        onValidate(newErrors);
    }, [props.validate]);
    (0, element_1.useEffect)(() => {
        validate(values);
    }, []);
    const resetForm = (newInitialValues, newTouchedFields = {}, newErrors = {}) => {
        const newValues = newInitialValues ?? initialValues.current ?? {};
        initialValues.current = newValues;
        setValuesInternal(newValues);
        setTouched(newTouchedFields);
        setErrors(newErrors);
    };
    (0, element_1.useImperativeHandle)(ref, () => ({
        resetForm,
    }));
    const isValidForm = async () => {
        validate(values);
        return !Object.keys(errors).length;
    };
    const setValues = (0, element_1.useCallback)((valuesToSet) => {
        const newValues = { ...values, ...valuesToSet };
        setValuesInternal(newValues);
        validate(newValues, (newErrors) => {
            const { onChangeCallback } = props;
            // Note that onChange is a no-op by default so this will never be null
            const singleValueChangeCallback = onChangeCallback || onChange;
            if (onChangeCallback) {
                (0, deprecated_1.default)('onChangeCallback', {
                    version: '9.0.0',
                    alternative: 'onChange',
                    plugin: '@fincommerce/components',
                });
            }
            if (!singleValueChangeCallback && !onChanges) {
                return;
            }
            // onChange and onChanges keep track of validity, so needs to
            // happen after setting the error state.
            const isValid = !Object.keys(newErrors || {}).length;
            const nameValuePairs = [];
            for (const key in valuesToSet) {
                const nameValuePair = {
                    name: key,
                    value: valuesToSet[key],
                };
                nameValuePairs.push(nameValuePair);
                if (singleValueChangeCallback) {
                    singleValueChangeCallback(nameValuePair, newValues, isValid);
                }
            }
            if (onChanges) {
                onChanges(nameValuePairs, newValues, isValid);
            }
        });
    }, [values, validate, onChange, props.onChangeCallback]);
    const setValue = (0, element_1.useCallback)(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (name, value) => {
        setValues((0, setWith_1.default)({ ...values }, name, value, clone_1.default));
    }, [values, validate, onChange, props.onChangeCallback]);
    const handleChange = (0, element_1.useCallback)((name, value) => {
        // Handle native events.
        if (isChangeEvent(value) && value.target) {
            if (value.target.type === 'checkbox') {
                setValue(name, !(0, get_1.default)(values, name));
            }
            else {
                setValue(name, value.target.value);
            }
        }
        else {
            setValue(name, value);
        }
    }, [setValue]);
    const handleBlur = (0, element_1.useCallback)((name) => {
        setTouched({
            ...touched,
            [name]: true,
        });
    }, [touched]);
    const handleSubmit = async () => {
        const { onSubmitCallback } = props;
        const touchedFields = {};
        Object.keys(values).map((name) => (touchedFields[name] = true));
        setTouched(touchedFields);
        if (await isValidForm()) {
            // Note that onSubmit is a no-op by default so this will never be null
            const callback = onSubmitCallback || onSubmit;
            if (onSubmitCallback) {
                (0, deprecated_1.default)('onSubmitCallback', {
                    version: '9.0.0',
                    alternative: 'onSubmit',
                    plugin: '@fincommerce/components',
                });
            }
            if (callback) {
                return callback(values);
            }
        }
    };
    function getInputProps(name, inputProps = {}) {
        const inputValue = (0, get_1.default)(values, name);
        const isTouched = touched[name];
        const inputError = (0, get_1.default)(errors, name);
        const { className: classNameProp, onBlur: onBlurProp, onChange: onChangeProp, sanitize, ...additionalProps } = inputProps;
        return {
            value: inputValue,
            checked: Boolean(inputValue),
            selected: inputValue,
            onChange: (value) => {
                handleChange(name, value);
                if (onChangeProp) {
                    onChangeProp(value);
                }
            },
            onBlur: () => {
                if (sanitize) {
                    handleChange(name, sanitize(inputValue));
                }
                handleBlur(name);
                if (onBlurProp) {
                    onBlurProp();
                }
            },
            className: (0, clsx_1.default)(classNameProp, {
                'has-error': isTouched && inputError,
            }),
            help: isTouched ? inputError : null,
            ...additionalProps,
        };
    }
    function getCheckboxControlProps(name, inputProps = {}) {
        return (0, omit_1.default)(getInputProps(name, inputProps), [
            'selected',
            'value',
        ]);
    }
    function getSelectControlProps(name, inputProps = {}) {
        const selectControlProps = getInputProps(name, inputProps);
        return {
            ...selectControlProps,
            value: selectControlProps.value === undefined
                ? undefined
                : String(selectControlProps.value),
        };
    }
    const isDirty = (0, element_1.useMemo)(() => !(0, isEqual_1.default)(initialValues.current, values), [initialValues.current, values]);
    const getStateAndHelpers = () => {
        return {
            values,
            errors,
            touched,
            isDirty,
            setTouched,
            setValue,
            setValues,
            handleSubmit,
            getCheckboxControlProps,
            getInputProps,
            getSelectControlProps,
            isValidForm: !Object.keys(errors).length,
            resetForm,
        };
    };
    function getChildren() {
        if (typeof children === 'function') {
            return children(getStateAndHelpers());
        }
        return children;
    }
    return ((0, element_1.createElement)(form_context_1.FormContext.Provider, { value: getStateAndHelpers() }, getChildren()));
}
const Form = (0, element_1.forwardRef)(FormComponent);
exports.Form = Form;
