"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const components_1 = require("@wordpress/components");
const cross_small_1 = __importDefault(require("gridicons/dist/cross-small"));
const clsx_1 = __importDefault(require("clsx"));
/**
 * Internal dependencies
 */
const select_filter_1 = __importDefault(require("./select-filter"));
const search_filter_1 = __importDefault(require("./search-filter"));
const number_filter_1 = __importDefault(require("./number-filter"));
const date_filter_1 = __importDefault(require("./date-filter"));
const attribute_filter_1 = __importDefault(require("./attribute-filter"));
const AdvancedFilterItem = (props) => {
    const { config, currency, filter: filterValue, isEnglish, onFilterChange, query, removeFilter, } = props;
    const { key } = filterValue;
    let filterConfig = config.filters[key];
    const { input, labels } = filterConfig;
    const componentMap = {
        Currency: number_filter_1.default,
        Date: date_filter_1.default,
        Number: number_filter_1.default,
        ProductAttribute: attribute_filter_1.default,
        Search: search_filter_1.default,
        SelectControl: select_filter_1.default,
    };
    if (!componentMap.hasOwnProperty(input.component)) {
        return;
    }
    if (input.component === 'Currency') {
        filterConfig = {
            ...filterConfig,
            ...{
                input: {
                    type: 'currency',
                    component: 'Currency',
                },
            },
        };
    }
    const FilterComponent = componentMap[input.component];
    return ((0, element_1.createElement)("li", { className: "fincommerce-filters-advanced__list-item" },
        (0, element_1.createElement)(FilterComponent, { className: "fincommerce-filters-advanced__fieldset-item", currency: currency, filter: filterValue, config: filterConfig, onFilterChange: onFilterChange, isEnglish: isEnglish, query: query }),
        (0, element_1.createElement)(components_1.Button, { className: (0, clsx_1.default)('fincommerce-filters-advanced__line-item', 'fincommerce-filters-advanced__remove'), label: labels.remove, onClick: removeFilter },
            (0, element_1.createElement)(cross_small_1.default, null))));
};
exports.default = AdvancedFilterItem;
