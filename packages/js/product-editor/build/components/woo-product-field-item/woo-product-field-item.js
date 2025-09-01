"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WooProductFieldItem = void 0;
const components_1 = require("@wordpress/components");
const element_1 = require("@wordpress/element");
const components_2 = require("@fincommerce/components");
/**
 * Internal dependencies
 */
const utils_1 = require("../../utils");
const DEFAULT_FIELD_ORDER = 20;
const WooProductFieldFill = ({ fieldName, sectionName, order, children, }) => {
    const { registerFill, getFillHelpers } = (0, components_2.useSlotContext)();
    const fieldId = `product_field/${sectionName}/${fieldName}`;
    (0, element_1.useEffect)(() => {
        registerFill(fieldId);
    }, []);
    return ((0, element_1.createElement)(components_1.Fill, { name: `fincommerce_product_field_${sectionName}`, key: fieldId }, (fillProps) => (0, utils_1.createOrderedChildren)(children, order, {
        sectionName,
        ...fillProps,
        ...getFillHelpers(),
    }, { _id: fieldId })));
};
const WooProductFieldItem = ({ children, sections, id, }) => {
    return ((0, element_1.createElement)(element_1.Fragment, null, sections.map(({ name: sectionName, order = DEFAULT_FIELD_ORDER }) => ((0, element_1.createElement)(WooProductFieldFill, { fieldName: id, sectionName: sectionName, order: order, key: sectionName }, children)))));
};
exports.WooProductFieldItem = WooProductFieldItem;
exports.WooProductFieldItem.Slot = ({ fillProps, section, }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { filterRegisteredFills } = (0, components_2.useSlotContext)();
    return ((0, element_1.createElement)(components_1.Slot, { name: `fincommerce_product_field_${section}`, fillProps: fillProps }, (fills) => {
        if (!utils_1.sortFillsByOrder) {
            return null;
        }
        return element_1.Children.map(
        // @ts-expect-error The type definitions for Slot are incorrect.
        (0, utils_1.sortFillsByOrder)(filterRegisteredFills(fills))?.props
            .children, (child) => ((0, element_1.createElement)("div", { className: "fincommerce-product-form__field" }, child)));
    }));
};
