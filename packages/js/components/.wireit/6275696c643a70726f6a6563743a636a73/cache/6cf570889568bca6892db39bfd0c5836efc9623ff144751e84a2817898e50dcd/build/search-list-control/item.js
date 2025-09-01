"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const lodash_1 = require("lodash");
const prop_types_1 = __importDefault(require("prop-types"));
function getHighlightedName(name, search) {
    if (!search) {
        return name;
    }
    const re = new RegExp((0, lodash_1.escapeRegExp)(search), 'ig');
    const nameParts = name.split(re);
    return nameParts.map((part, i) => {
        if (i === 0) {
            return part;
        }
        return ((0, element_1.createElement)(element_1.Fragment, { key: i },
            (0, element_1.createElement)("strong", null, search),
            part));
    });
}
function getBreadcrumbsForDisplay(breadcrumbs) {
    if (breadcrumbs.length === 1) {
        return (0, lodash_1.first)(breadcrumbs);
    }
    if (breadcrumbs.length === 2) {
        return (0, lodash_1.first)(breadcrumbs) + ' › ' + (0, lodash_1.last)(breadcrumbs);
    }
    return (0, lodash_1.first)(breadcrumbs) + ' … ' + (0, lodash_1.last)(breadcrumbs);
}
const SearchListItem = ({ countLabel, className, depth = 0, controlId = '', item, isSelected, isSingle, onSelect, search = '', ...props }) => {
    const showCount = !(0, lodash_1.isNil)(countLabel) || !(0, lodash_1.isNil)(item.count);
    const classes = [className, 'fincommerce-search-list__item'];
    classes.push(`depth-${depth}`);
    if (isSingle) {
        classes.push('is-radio-button');
    }
    if (showCount) {
        classes.push('has-count');
    }
    const hasBreadcrumbs = item.breadcrumbs && item.breadcrumbs.length;
    const name = props.name || `search-list-item-${controlId}`;
    const id = `${name}-${item.id}`;
    return ((0, element_1.createElement)("label", { htmlFor: id, className: classes.join(' ') },
        isSingle ? ((0, element_1.createElement)("input", { type: "radio", id: id, name: name, value: item.value, onChange: onSelect(item), checked: isSelected, className: "fincommerce-search-list__item-input", ...props })) : ((0, element_1.createElement)("input", { type: "checkbox", id: id, name: name, value: item.value, onChange: onSelect(item), checked: isSelected, className: "fincommerce-search-list__item-input", ...props })),
        (0, element_1.createElement)("span", { className: "fincommerce-search-list__item-label" },
            hasBreadcrumbs ? ((0, element_1.createElement)("span", { className: "fincommerce-search-list__item-prefix" }, getBreadcrumbsForDisplay(item.breadcrumbs))) : null,
            (0, element_1.createElement)("span", { className: "fincommerce-search-list__item-name" }, getHighlightedName(item.name, search))),
        !!showCount && ((0, element_1.createElement)("span", { className: "fincommerce-search-list__item-count" }, countLabel || item.count))));
};
SearchListItem.propTypes = {
    /**
     * Additional CSS classes.
     */
    className: prop_types_1.default.string,
    /**
     * Label to display in the count bubble. Takes preference over `item.count`.
     */
    countLabel: prop_types_1.default.node,
    /**
     * Unique id of the parent control.
     */
    controlId: prop_types_1.default.node,
    /**
     * Depth, non-zero if the list is hierarchical.
     */
    depth: prop_types_1.default.number,
    /**
     * Current item to display.
     */
    item: prop_types_1.default.object,
    /**
     * Name of the inputs. Used to group input controls together. See:
     * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-name
     * If not provided, a default name will be generated using the controlId.
     */
    name: prop_types_1.default.string,
    /**
     * Whether this item is selected.
     */
    isSelected: prop_types_1.default.bool,
    /**
     * Whether this should only display a single item (controls radio vs checkbox icon).
     */
    isSingle: prop_types_1.default.bool,
    /**
     * Callback for selecting the item.
     */
    onSelect: prop_types_1.default.func,
    /**
     * Search string, used to highlight the substring in the item name.
     */
    search: prop_types_1.default.string,
};
exports.default = SearchListItem;
