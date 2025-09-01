"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
const components_1 = require("@wordpress/components");
const clsx_1 = __importDefault(require("clsx"));
const element_1 = require("@wordpress/element");
const lodash_1 = require("lodash");
const keycodes_1 = require("@wordpress/keycodes");
const react_window_1 = require("react-window");
const VirtualOption = ({ index, style, data, }) => {
    const { options, selectedIndex, instanceId, onSelect, getOptionRef } = data;
    const option = options[index];
    return ((0, element_1.createElement)(components_1.Button, { ref: getOptionRef(index), key: option.key, id: `fincommerce-select-control__option-${instanceId}-${option.key}`, role: "option", "aria-selected": index === selectedIndex, "aria-setsize": options.length, "aria-posinset": index + 1, disabled: option.isDisabled, className: (0, clsx_1.default)('fincommerce-select-control__option', {
            'is-selected': index === selectedIndex,
        }), onClick: () => onSelect(option), tabIndex: -1, style: style }, option.label));
};
/**
 * A list box that displays filtered options after search.
 */
class List extends element_1.Component {
    optionRefs;
    listbox;
    listRef;
    constructor(props) {
        super(props);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.select = this.select.bind(this);
        this.optionRefs = {};
        this.listbox = (0, element_1.createRef)();
        this.listRef = (0, element_1.createRef)();
    }
    componentDidUpdate(prevProps) {
        const { options, selectedIndex, virtualScroll } = this.props;
        // Remove old option refs to avoid memory leaks.
        if (!(0, lodash_1.isEqual)(options, prevProps.options)) {
            this.optionRefs = {};
        }
        if (selectedIndex !== prevProps.selectedIndex &&
            (0, lodash_1.isNumber)(selectedIndex)) {
            if (virtualScroll && this.listRef.current) {
                this.listRef.current.scrollToItem(selectedIndex, 'smart');
            }
            else {
                this.scrollToOption(selectedIndex);
            }
        }
    }
    getOptionRef(index) {
        if (!this.optionRefs.hasOwnProperty(index)) {
            this.optionRefs[index] = (0, element_1.createRef)();
        }
        return this.optionRefs[index];
    }
    select(option) {
        const { onSelect } = this.props;
        if (option.isDisabled) {
            return;
        }
        onSelect(option);
    }
    scrollToOption(index) {
        const listbox = this.listbox.current;
        if (!listbox) {
            return;
        }
        if (listbox.scrollHeight <= listbox.clientHeight) {
            return;
        }
        if (!this.optionRefs[index]) {
            return;
        }
        const option = this.optionRefs[index].current;
        if (!option) {
            // eslint-disable-next-line no-console
            console.warn('Option not found, index:', index);
            return;
        }
        const scrollBottom = listbox.clientHeight + listbox.scrollTop;
        const elementBottom = option.offsetTop + option.offsetHeight;
        if (elementBottom > scrollBottom) {
            listbox.scrollTop = elementBottom - listbox.clientHeight;
        }
        else if (option.offsetTop < listbox.scrollTop) {
            listbox.scrollTop = option.offsetTop;
        }
    }
    handleKeyDown(event) {
        const { decrementSelectedIndex, incrementSelectedIndex, options, onSearch, selectedIndex, setExpanded, } = this.props;
        if (options.length === 0) {
            return;
        }
        switch (event.keyCode) {
            case keycodes_1.UP:
                decrementSelectedIndex();
                event.preventDefault();
                event.stopPropagation();
                break;
            case keycodes_1.DOWN:
                incrementSelectedIndex();
                event.preventDefault();
                event.stopPropagation();
                break;
            case keycodes_1.ENTER:
                if ((0, lodash_1.isNumber)(selectedIndex) && options[selectedIndex]) {
                    this.select(options[selectedIndex]);
                }
                event.preventDefault();
                event.stopPropagation();
                break;
            case keycodes_1.LEFT:
            case keycodes_1.RIGHT:
                setExpanded(false);
                break;
            case keycodes_1.ESCAPE:
                setExpanded(false);
                onSearch(null);
                return;
            case keycodes_1.TAB:
                if ((0, lodash_1.isNumber)(selectedIndex) && options[selectedIndex]) {
                    this.select(options[selectedIndex]);
                }
                setExpanded(false);
                break;
            default:
        }
    }
    toggleKeyEvents(isListening) {
        const { node } = this.props;
        if (!node) {
            // eslint-disable-next-line no-console
            console.warn('No node to bind events to.');
            return;
        }
        // This exists because we must capture ENTER key presses before RichText.
        // It seems that react fires the simulated capturing events after the
        // native browser event has already bubbled so we can't stopPropagation
        // and avoid RichText getting the event from TinyMCE, hence we must
        // register a native event handler.
        const handler = isListening
            ? 'addEventListener'
            : 'removeEventListener';
        node[handler]('keydown', this.handleKeyDown, true);
    }
    componentDidMount() {
        const { selectedIndex } = this.props;
        if ((0, lodash_1.isNumber)(selectedIndex) && selectedIndex > -1) {
            if (this.props.virtualScroll && this.listRef.current) {
                this.listRef.current.scrollToItem(selectedIndex, 'smart');
            }
            else {
                this.scrollToOption(selectedIndex);
            }
        }
        this.toggleKeyEvents(true);
    }
    componentWillUnmount() {
        this.toggleKeyEvents(false);
    }
    render() {
        const { instanceId, listboxId, options, selectedIndex, staticList, virtualScroll, virtualItemHeight = 35, virtualListHeight = 300, } = this.props;
        const listboxClasses = (0, clsx_1.default)('fincommerce-select-control__listbox', {
            'is-static': staticList,
            'is-virtual': virtualScroll,
        });
        if (virtualScroll) {
            return ((0, element_1.createElement)("div", { id: listboxId, role: "listbox", className: listboxClasses, tabIndex: -1 },
                (0, element_1.createElement)(react_window_1.FixedSizeList, { ref: this.listRef, height: Math.min(virtualListHeight, options.length * virtualItemHeight), width: "100%", itemCount: options.length, itemSize: virtualItemHeight, itemData: {
                        options,
                        selectedIndex,
                        instanceId,
                        onSelect: this.select,
                        getOptionRef: this.getOptionRef.bind(this),
                    } }, VirtualOption)));
        }
        return ((0, element_1.createElement)("div", { ref: this.listbox, id: listboxId, role: "listbox", className: listboxClasses, tabIndex: -1 }, options.map((option, index) => ((0, element_1.createElement)(components_1.Button, { ref: this.getOptionRef(index), key: option.key, id: `fincommerce-select-control__option-${instanceId}-${option.key}`, role: "option", "aria-selected": index === selectedIndex, disabled: option.isDisabled, className: (0, clsx_1.default)('fincommerce-select-control__option', {
                'is-selected': index === selectedIndex,
            }), onClick: () => this.select(option), tabIndex: -1 }, option.label)))));
    }
}
exports.default = List;
