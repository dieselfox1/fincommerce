"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
const i18n_1 = require("@wordpress/i18n");
const components_1 = require("@wordpress/components");
const element_1 = require("@wordpress/element");
const clsx_1 = __importDefault(require("clsx"));
/*
 * Create an alias for the ComboboxControl core component,
 * but with the custom ComboboxControlProps interface.
 */
const ComboboxControl = components_1.ComboboxControl;
/**
 * Map the product attribute item to the Combobox core option.
 *
 * @param {AttributesComboboxControlItem} attr - Product attribute item.
 * @return {ComboboxControlOption}               Combobox option.
 */
function mapItemToOption(attr) {
    return {
        label: attr.name,
        value: `attr-${attr.id}`,
        disabled: !!attr.isDisabled,
    };
}
const createNewAttributeOptionDefault = {
    label: '',
    value: '',
    state: 'draft',
};
/**
 * ComboboxControlOption component.
 *
 * @param {ComboboxControlOptionProps} props - props.
 * @return {JSX.Element}                       Component item.
 */
function ComboboxControlOption(props) {
    const { item } = props;
    if (item.disabled) {
        return (0, element_1.createElement)("div", { className: "item-wrapper is-disabled" }, item.label);
    }
    return (0, element_1.createElement)("div", { className: "item-wrapper" }, item.label);
}
const AttributesComboboxControl = ({ label, help, current = null, items = [], instanceNumber = 0, isLoading = false, onAddNew, onChange, }) => {
    const [createNewAttributeOption, updateCreateNewAttributeOption] = (0, element_1.useState)(createNewAttributeOptionDefault);
    /**
     * Map the items to the Combobox options.
     * Each option is an object with a label and value.
     * Both are strings.
     */
    const attributeOptions = items?.map(mapItemToOption);
    const options = (0, element_1.useMemo)(() => {
        if (!createNewAttributeOption.label.length) {
            return attributeOptions;
        }
        return [
            ...attributeOptions,
            {
                label: createNewAttributeOption.state === 'draft'
                    ? (0, i18n_1.sprintf)(
                    /* translators: The name of the new attribute term to be created */
                    (0, i18n_1.__)('Create "%s"', 'fincommerce'), createNewAttributeOption.label)
                    : createNewAttributeOption.label,
                value: createNewAttributeOption.value,
            },
        ];
    }, [attributeOptions, createNewAttributeOption]);
    // Get current of the selected item.
    let currentValue = current ? `attr-${current.id}` : '';
    if (createNewAttributeOption.state === 'creating') {
        currentValue = 'create-attribute';
    }
    const comboRef = (0, element_1.useRef)(null);
    // Label to link the input with the label.
    const [labelFor, setLabelFor] = (0, element_1.useState)('');
    (0, element_1.useEffect)(() => {
        if (!comboRef?.current) {
            return;
        }
        /*
         * Hack to set the base control ID,
         * to link the label with the input,
         * picking the input ID from the ComboboxControl.
         */
        const inputElement = comboRef.current.querySelector('input.components-combobox-control__input');
        const id = inputElement?.getAttribute('id');
        if (inputElement && typeof id === 'string') {
            setLabelFor(id);
        }
        /*
         * Hack to handle AttributesComboboxControl instances z index,
         * avoiding to overlap the dropdown instances list.
         * Todo: this is a temporary/not-ideal solution.
         * It should be handled by the core ComboboxControl component.
         */
        const listContainerElement = comboRef.current.querySelector('.components-combobox-control__suggestions-container');
        const style = { zIndex: 1000 - instanceNumber };
        if (listContainerElement) {
            Object.assign(listContainerElement.style, style);
        }
    }, [instanceNumber]);
    if (!help) {
        help = ((0, element_1.createElement)("div", { className: "fincommerce-attributes-combobox-help" }, (0, i18n_1.__)('Select an attribute or type to create.', 'fincommerce')));
        if (isLoading) {
            help = ((0, element_1.createElement)("div", { className: "fincommerce-attributes-combobox-help" },
                (0, element_1.createElement)(components_1.Spinner, null),
                (0, i18n_1.__)('Loading…', 'fincommerce')));
        }
        else if (!items.length) {
            help = ((0, element_1.createElement)("div", { className: "fincommerce-attributes-combobox-help" }, (0, i18n_1.__)('No attributes yet. Type to create.', 'fincommerce')));
        }
    }
    return ((0, element_1.createElement)("div", { className: (0, clsx_1.default)('fincommerce-attributes-combobox-container', {
            'no-items': !options.length,
        }), ref: comboRef },
        (0, element_1.createElement)(components_1.BaseControl, { label: label, help: help, id: labelFor },
            (0, element_1.createElement)(ComboboxControl, { className: "fincommerce-attributes-combobox", allowReset: false, options: options, value: currentValue, onChange: (newValue) => {
                    if (!newValue) {
                        return;
                    }
                    if (newValue === 'create-attribute') {
                        updateCreateNewAttributeOption({
                            ...createNewAttributeOption,
                            state: 'creating',
                        });
                        return onAddNew?.(createNewAttributeOption.label);
                    }
                    const selectedAttribute = items?.find((item) => item.id ===
                        Number(newValue.replace('attr-', '')));
                    /*
                     * Do not select when it is disabled.
                     * `disabled` item option should be
                     * handled by the core ComboboxControl component.
                     */
                    if (!selectedAttribute ||
                        selectedAttribute.isDisabled) {
                        return;
                    }
                    onChange(selectedAttribute);
                }, onFilterValueChange: (filterValue) => {
                    updateCreateNewAttributeOption({
                        label: filterValue,
                        value: 'create-attribute',
                        state: 'draft',
                    });
                }, __experimentalRenderItem: ComboboxControlOption }))));
};
exports.default = AttributesComboboxControl;
