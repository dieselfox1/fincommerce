"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
const i18n_1 = require("@wordpress/i18n");
const keycodes_1 = require("@wordpress/keycodes");
const element_1 = require("@wordpress/element");
const icons_1 = require("@wordpress/icons");
const clsx_1 = __importDefault(require("clsx"));
const lodash_1 = require("lodash");
/**
 * Internal dependencies
 */
const tags_1 = __importDefault(require("./tags"));
/**
 * A search control to allow user input to filter the options.
 */
class Control extends element_1.Component {
    input;
    constructor(props) {
        super(props);
        this.state = {
            isActive: false,
        };
        this.input = (0, element_1.createRef)();
        this.updateSearch = this.updateSearch.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
    }
    updateSearch(onSearch) {
        return (event) => {
            onSearch(event.target.value);
        };
    }
    onFocus(onSearch) {
        const { isSearchable, setExpanded, showAllOnFocus, updateSearchOptions, } = this.props;
        return (event) => {
            this.setState({ isActive: true });
            if (isSearchable && showAllOnFocus) {
                event.target.select();
                updateSearchOptions('');
            }
            else if (isSearchable) {
                onSearch(event.target.value);
            }
            else {
                setExpanded(true);
            }
        };
    }
    onBlur() {
        const { onBlur } = this.props;
        if (typeof onBlur === 'function') {
            onBlur();
        }
        this.setState({ isActive: false });
    }
    onKeyDown(event) {
        const { decrementSelectedIndex, incrementSelectedIndex, selected, onChange, query, setExpanded, } = this.props;
        if (keycodes_1.BACKSPACE === event.keyCode &&
            !query &&
            (0, lodash_1.isArray)(selected) &&
            selected.length) {
            onChange([...selected.slice(0, -1)]);
        }
        if (keycodes_1.DOWN === event.keyCode) {
            incrementSelectedIndex();
            setExpanded(true);
            event.preventDefault();
            event.stopPropagation();
        }
        if (keycodes_1.UP === event.keyCode) {
            decrementSelectedIndex();
            setExpanded(true);
            event.preventDefault();
            event.stopPropagation();
        }
    }
    renderButton() {
        const { multiple, selected } = this.props;
        if (multiple || !(0, lodash_1.isArray)(selected) || !selected.length) {
            return null;
        }
        return ((0, element_1.createElement)("div", { className: "fincommerce-select-control__control-value" }, selected[0].label));
    }
    renderInput() {
        const { activeId, disabled, hasTags, inlineTags, instanceId, isExpanded, isSearchable, listboxId, onSearch, placeholder, searchInputType, autoComplete, } = this.props;
        const { isActive } = this.state;
        return ((0, element_1.createElement)("input", { autoComplete: autoComplete || 'off', className: "fincommerce-select-control__control-input", id: `fincommerce-select-control-${instanceId}__control-input`, ref: this.input, type: isSearchable ? searchInputType : 'button', value: this.getInputValue(), placeholder: isActive ? placeholder : '', onChange: this.updateSearch(onSearch), onFocus: this.onFocus(onSearch), onBlur: this.onBlur, onKeyDown: this.onKeyDown, role: "combobox", "aria-autocomplete": "list", "aria-expanded": isExpanded, "aria-haspopup": "true", "aria-owns": listboxId, "aria-controls": listboxId, "aria-activedescendant": activeId, "aria-describedby": hasTags && inlineTags
                ? `search-inline-input-${instanceId}`
                : undefined, disabled: disabled, "aria-label": this.props.ariaLabel ?? this.props.label }));
    }
    getInputValue() {
        const { inlineTags, isFocused, isSearchable, multiple, query, selected, } = this.props;
        const selectedValue = (0, lodash_1.isArray)(selected) &&
            selected.length &&
            typeof selected[0].label === 'string'
            ? selected[0].label
            : '';
        // Show the selected value for simple select dropdowns.
        if (!multiple && !isFocused && !inlineTags) {
            return selectedValue;
        }
        // Show the search query when focused on searchable controls.
        if (isSearchable && isFocused && query) {
            return query;
        }
        return '';
    }
    render() {
        const { className, disabled, hasTags, help, inlineTags, instanceId, isSearchable, label, query, onChange, showClearButton, } = this.props;
        const { isActive } = this.state;
        return (
        // Disable reason: The div below visually simulates an input field. Its
        // child input is the actual input and responds accordingly to all keyboard
        // events, but click events need to be passed onto the child input. There
        // is no appropriate aria role for describing this situation, which is only
        // for the benefit of sighted users.
        /* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
        (0, element_1.createElement)("div", { className: (0, clsx_1.default)('components-base-control', 'fincommerce-select-control__control', className, {
                empty: !query || query.length === 0,
                'is-active': isActive,
                'has-tags': inlineTags && hasTags,
                'with-value': this.getInputValue()?.length,
                'has-error': !!help,
                'is-disabled': disabled,
            }), onClick: (event) => {
                // Don't focus the input if the click event is from the error message.
                if (
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore - event.target.className is not in the type definition.
                event.target.className !==
                    'components-base-control__help' &&
                    this.input.current) {
                    this.input.current.focus();
                }
            } },
            isSearchable && ((0, element_1.createElement)(icons_1.Icon, { className: "fincommerce-select-control__control-icon", icon: icons_1.search })),
            inlineTags && ((0, element_1.createElement)(tags_1.default, { onChange: onChange, showClearButton: showClearButton, selected: this.props.selected })),
            (0, element_1.createElement)("div", { className: "components-base-control__field" },
                !!label && ((0, element_1.createElement)("label", { htmlFor: `fincommerce-select-control-${instanceId}__control-input`, className: "components-base-control__label" }, label)),
                this.renderInput(),
                inlineTags && ((0, element_1.createElement)("span", { id: `search-inline-input-${instanceId}`, className: "screen-reader-text" }, (0, i18n_1.__)('Move backward for selected items', 'fincommerce'))),
                !!help && ((0, element_1.createElement)("p", { id: `fincommerce-select-control-${instanceId}__help`, className: "components-base-control__help" }, help))))
        /* eslint-enable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
        );
    }
}
exports.default = Control;
