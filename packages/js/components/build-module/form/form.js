/**
 * External dependencies
 */
import clsx from 'clsx';
import { useState, createElement, useCallback, useEffect, useMemo, forwardRef, useImperativeHandle, } from '@wordpress/element';
import deprecated from '@wordpress/deprecated';
import { useRef } from 'react';
import _setWith from 'lodash/setWith';
import _get from 'lodash/get';
import _clone from 'lodash/clone';
import _isEqual from 'lodash/isEqual';
import _omit from 'lodash/omit';
/**
 * Internal dependencies
 */
import { FormContext } from './form-context';
function isChangeEvent(value) {
    return value.target !== undefined;
}
/**
 * A form component to handle form state and provide input helper props.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function FormComponent({ children, onSubmit = () => { }, onChange = () => { }, onChanges = () => { }, ...props }, ref) {
    const initialValues = useRef(props.initialValues ?? {});
    const [values, setValuesInternal] = useState(props.initialValues ?? {});
    const [errors, setErrors] = useState(props.errors || {});
    const [touched, setTouched] = useState(props.touched || {});
    const validate = useCallback((newValues, onValidate = () => { }) => {
        const newErrors = props.validate ? props.validate(newValues) : {};
        setErrors(newErrors || {});
        onValidate(newErrors);
    }, [props.validate]);
    useEffect(() => {
        validate(values);
    }, []);
    const resetForm = (newInitialValues, newTouchedFields = {}, newErrors = {}) => {
        const newValues = newInitialValues ?? initialValues.current ?? {};
        initialValues.current = newValues;
        setValuesInternal(newValues);
        setTouched(newTouchedFields);
        setErrors(newErrors);
    };
    useImperativeHandle(ref, () => ({
        resetForm,
    }));
    const isValidForm = async () => {
        validate(values);
        return !Object.keys(errors).length;
    };
    const setValues = useCallback((valuesToSet) => {
        const newValues = { ...values, ...valuesToSet };
        setValuesInternal(newValues);
        validate(newValues, (newErrors) => {
            const { onChangeCallback } = props;
            // Note that onChange is a no-op by default so this will never be null
            const singleValueChangeCallback = onChangeCallback || onChange;
            if (onChangeCallback) {
                deprecated('onChangeCallback', {
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
    const setValue = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (name, value) => {
        setValues(_setWith({ ...values }, name, value, _clone));
    }, [values, validate, onChange, props.onChangeCallback]);
    const handleChange = useCallback((name, value) => {
        // Handle native events.
        if (isChangeEvent(value) && value.target) {
            if (value.target.type === 'checkbox') {
                setValue(name, !_get(values, name));
            }
            else {
                setValue(name, value.target.value);
            }
        }
        else {
            setValue(name, value);
        }
    }, [setValue]);
    const handleBlur = useCallback((name) => {
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
                deprecated('onSubmitCallback', {
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
        const inputValue = _get(values, name);
        const isTouched = touched[name];
        const inputError = _get(errors, name);
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
            className: clsx(classNameProp, {
                'has-error': isTouched && inputError,
            }),
            help: isTouched ? inputError : null,
            ...additionalProps,
        };
    }
    function getCheckboxControlProps(name, inputProps = {}) {
        return _omit(getInputProps(name, inputProps), [
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
    const isDirty = useMemo(() => !_isEqual(initialValues.current, values), [initialValues.current, values]);
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
    return (createElement(FormContext.Provider, { value: getStateAndHelpers() }, getChildren()));
}
const Form = forwardRef(FormComponent);
export { Form };
