"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComboboxControl = void 0;
const components_1 = require("@wordpress/components");
const compose_1 = require("@wordpress/compose");
const element_1 = require("@wordpress/element");
const clsx_1 = __importDefault(require("clsx"));
/*
 * Create an alias for the ComboboxControl core component,
 * but with the custom ComboboxControlProps interface.
 */
const Combobox = components_1.ComboboxControl;
/**
 * This is a wrapper + a work around the Combobox to
 * expose important properties and events from the
 * internal input element that are required when
 * validating the field in the context of a form
 */
exports.ComboboxControl = (0, element_1.forwardRef)(function ForwardedComboboxControl({ id, name, allowReset, className, help, hideLabelFromVision, label, messages, value, options, onFilterValueChange, onChange, onBlur, __experimentalRenderItem, }, ref) {
    const inputElementRef = (0, element_1.useRef)();
    const generatedId = (0, compose_1.useInstanceId)(exports.ComboboxControl, 'fincommerce-combobox-control');
    const currentId = id ?? generatedId;
    (0, element_1.useLayoutEffect)(
    /**
     * The Combobox component does not expose the ref to the
     * internal native input element removing the ability to
     * focus the element when validating it in the context
     * of a form
     */
    function initializeRefs() {
        inputElementRef.current = document.querySelector(`.${currentId} [role="combobox"]`);
        if (name) {
            inputElementRef.current?.setAttribute('name', name);
        }
        if (ref) {
            if (typeof ref === 'function') {
                ref(inputElementRef.current);
            }
            else {
                ref.current = inputElementRef.current;
            }
        }
    }, [currentId, name, ref]);
    (0, element_1.useEffect)(function overrideBlur() {
        /**
         * The Combobox component clear the value of its internal
         * input control when losing the focus, even when the
         * selected value is set, affecting the validation behavior
         * on bluring
         */
        function handleBlur(event) {
            onBlur?.({
                ...event,
                target: {
                    ...event.target,
                    value,
                },
            });
        }
        inputElementRef.current?.addEventListener('blur', handleBlur);
        return () => {
            inputElementRef.current?.removeEventListener('blur', handleBlur);
        };
    }, [value, onBlur]);
    return ((0, element_1.createElement)(Combobox, { allowReset: allowReset, help: help, hideLabelFromVision: hideLabelFromVision, label: label, messages: messages, value: value, options: options, onChange: onChange, onFilterValueChange: onFilterValueChange, className: (0, clsx_1.default)('fincommerce-combobox-control', currentId, className), __experimentalRenderItem: __experimentalRenderItem }));
});
