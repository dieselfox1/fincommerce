/**
 * External dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { Icon, cancelCircleFilled } from '@wordpress/icons';
import { createElement, Component, Fragment } from '@wordpress/element';
import { findIndex, isArray } from 'lodash';
/**
 * Internal dependencies
 */
import Tag from '../tag';
/**
 * A list of tags to display selected items.
 */
class Tags extends Component {
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
            if (!isArray(selected)) {
                return;
            }
            const i = findIndex(selected, { key });
            onChange([
                ...selected.slice(0, i),
                ...selected.slice(i + 1),
            ]);
        };
    }
    render() {
        const { selected, showClearButton } = this.props;
        if (!isArray(selected) || !selected.length) {
            return null;
        }
        return (createElement(Fragment, null,
            createElement("div", { className: "fincommerce-select-control__tags" }, selected.map((item, i) => {
                if (!item.label) {
                    return null;
                }
                const screenReaderLabel = sprintf(
                /* translators: %1$s: tag label, %2$s: tag number, %3$s: total number of tags */
                __('%1$s (%2$s of %3$s)', 'fincommerce'), item.label, i + 1, selected.length);
                return (createElement(Tag, { key: item.key, id: item.key, label: item.label, 
                    // @ts-expect-error key is a string or undefined here
                    remove: this.removeResult, screenReaderLabel: screenReaderLabel }));
            })),
            showClearButton && (createElement(Button, { className: "fincommerce-select-control__clear", isLink: true, onClick: this.removeAll },
                createElement(Icon, { icon: cancelCircleFilled, className: "clear-icon" }),
                createElement("span", { className: "screen-reader-text" }, __('Clear all', 'fincommerce'))))));
    }
}
export default Tags;
