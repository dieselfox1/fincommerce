"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariationQuickUpdateMenuItem = exports.getGroupName = void 0;
/**
 * External dependencies
 */
const components_1 = require("@wordpress/components");
const element_1 = require("@wordpress/element");
const components_2 = require("@fincommerce/components");
const constants_1 = require("./constants");
const DEFAULT_ORDER = 20;
const TOP_LEVEL_MENU = 'top-level';
const getGroupName = (group, isMultipleSelection) => {
    const nameSuffix = isMultipleSelection
        ? `_${constants_1.MULTIPLE_UPDATE}`
        : `_${constants_1.SINGLE_UPDATE}`;
    return group
        ? `${constants_1.VARIATION_ACTIONS_SLOT_NAME}_${group}${nameSuffix}`
        : constants_1.VARIATION_ACTIONS_SLOT_NAME;
};
exports.getGroupName = getGroupName;
const VariationQuickUpdateMenuItem = ({ children, order = DEFAULT_ORDER, group = TOP_LEVEL_MENU, supportsMultipleSelection, onClick = () => { }, ...props }) => {
    const createFill = (updateType) => ((0, element_1.createElement)(components_1.Fill, { key: updateType, name: (0, exports.getGroupName)(group, updateType === constants_1.MULTIPLE_UPDATE) }, (fillProps) => {
        return (0, components_2.createOrderedChildren)((0, element_1.createElement)(components_1.MenuItem, { ...props, onClick: () => {
                const { selection, onChange, onClose } = fillProps;
                onClick({
                    selection: Array.isArray(selection)
                        ? selection
                        : [selection],
                    onChange,
                    onClose,
                });
            } }, children), order, fillProps);
    }));
    const fills = supportsMultipleSelection
        ? [constants_1.MULTIPLE_UPDATE, constants_1.SINGLE_UPDATE].map(createFill)
        : createFill(constants_1.SINGLE_UPDATE);
    return (0, element_1.createElement)(element_1.Fragment, null, fills);
};
exports.VariationQuickUpdateMenuItem = VariationQuickUpdateMenuItem;
exports.VariationQuickUpdateMenuItem.Slot = ({ fillProps, group = TOP_LEVEL_MENU, onChange, onClose, selection, supportsMultipleSelection, }) => {
    return ((0, element_1.createElement)(components_1.Slot, { name: (0, exports.getGroupName)(group, supportsMultipleSelection), fillProps: { ...fillProps, onChange, onClose, selection } }, (fills) => {
        if (!components_2.sortFillsByOrder ||
            (fills && element_1.Children.count(fills) === 0)) {
            return null;
        }
        return (0, element_1.createElement)(components_1.MenuGroup, null, (0, components_2.sortFillsByOrder)(fills));
    }));
};
