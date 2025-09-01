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
const icons_1 = require("@wordpress/icons");
const element_1 = require("@wordpress/element");
const lodash_1 = require("lodash");
/**
 * Internal dependencies
 */
const tag_1 = __importDefault(require("../tag"));
/**
 * A list of tags to display selected items.
 */
class Tags extends element_1.Component {
    constructor(props) {
        super(props);
        this.removeAll = this.removeAll.bind(this);
        this.removeResult = this.removeResult.bind(this);
    }
    removeAll() {
        const { onChange } = this.props;
        onChange([]);
    }
    removeResult(key) {
        return () => {
            const { selected, onChange } = this.props;
            if (!(0, lodash_1.isArray)(selected)) {
                return;
            }
            const i = (0, lodash_1.findIndex)(selected, { key });
            onChange([
                ...selected.slice(0, i),
                ...selected.slice(i + 1),
            ]);
        };
    }
    render() {
        const { selected, showClearButton } = this.props;
        if (!(0, lodash_1.isArray)(selected) || !selected.length) {
            return null;
        }
        return ((0, element_1.createElement)(element_1.Fragment, null,
            (0, element_1.createElement)("div", { className: "fincommerce-select-control__tags" }, selected.map((item, i) => {
                if (!item.label) {
                    return null;
                }
                const screenReaderLabel = (0, i18n_1.sprintf)(
                /* translators: %1$s: tag label, %2$s: tag number, %3$s: total number of tags */
                (0, i18n_1.__)('%1$s (%2$s of %3$s)', 'fincommerce'), item.label, i + 1, selected.length);
                return ((0, element_1.createElement)(tag_1.default, { key: item.key, id: item.key, label: item.label, 
                    // @ts-expect-error key is a string or undefined here
                    remove: this.removeResult, screenReaderLabel: screenReaderLabel }));
            })),
            showClearButton && ((0, element_1.createElement)(components_1.Button, { className: "fincommerce-select-control__clear", isLink: true, onClick: this.removeAll },
                (0, element_1.createElement)(icons_1.Icon, { icon: icons_1.cancelCircleFilled, className: "clear-icon" }),
                (0, element_1.createElement)("span", { className: "screen-reader-text" }, (0, i18n_1.__)('Clear all', 'fincommerce'))))));
    }
}
exports.default = Tags;
