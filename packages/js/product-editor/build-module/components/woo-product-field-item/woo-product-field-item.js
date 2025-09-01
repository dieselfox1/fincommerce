import { Slot, Fill } from '@wordpress/components';
import { createElement, Children, Fragment, useEffect, } from '@wordpress/element';
import { useSlotContext, } from '@fincommerce/components';
/**
 * Internal dependencies
 */
import { createOrderedChildren, sortFillsByOrder } from '../../utils';
const DEFAULT_FIELD_ORDER = 20;
const WooProductFieldFill = ({ fieldName, sectionName, order, children, }) => {
    const { registerFill, getFillHelpers } = useSlotContext();
    const fieldId = `product_field/${sectionName}/${fieldName}`;
    useEffect(() => {
        registerFill(fieldId);
    }, []);
    return (createElement(Fill, { name: `fincommerce_product_field_${sectionName}`, key: fieldId }, (fillProps) => createOrderedChildren(children, order, {
        sectionName,
        ...fillProps,
        ...getFillHelpers(),
    }, { _id: fieldId })));
};
export const WooProductFieldItem = ({ children, sections, id, }) => {
    return (createElement(Fragment, null, sections.map(({ name: sectionName, order = DEFAULT_FIELD_ORDER }) => (createElement(WooProductFieldFill, { fieldName: id, sectionName: sectionName, order: order, key: sectionName }, children)))));
};
WooProductFieldItem.Slot = ({ fillProps, section, }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { filterRegisteredFills } = useSlotContext();
    return (createElement(Slot, { name: `fincommerce_product_field_${section}`, fillProps: fillProps }, (fills) => {
        if (!sortFillsByOrder) {
            return null;
        }
        return Children.map(
        // @ts-expect-error The type definitions for Slot are incorrect.
        sortFillsByOrder(filterRegisteredFills(fills))?.props
            .children, (child) => (createElement("div", { className: "fincommerce-product-form__field" }, child)));
    }));
};
