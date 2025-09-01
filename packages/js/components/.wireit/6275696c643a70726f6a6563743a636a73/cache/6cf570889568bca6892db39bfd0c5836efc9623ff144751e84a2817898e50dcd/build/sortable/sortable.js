"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sortable = exports.SortableContext = void 0;
/**
 * External dependencies
 */
const i18n_1 = require("@wordpress/i18n");
const clsx_1 = __importDefault(require("clsx"));
const element_1 = require("@wordpress/element");
const a11y_1 = require("@wordpress/a11y");
const lodash_1 = require("lodash");
const uuid_1 = require("uuid");
/**
 * Internal dependencies
 */
const utils_1 = require("./utils");
const THROTTLE_TIME = 16;
exports.SortableContext = (0, element_1.createContext)({});
const Sortable = ({ children, isHorizontal = false, onDragEnd = () => null, onDragOver = () => null, onDragStart = () => null, onOrderChange = () => null, className, role = 'listbox', ...props }) => {
    const ref = (0, element_1.useRef)(null);
    const [items, setItems] = (0, element_1.useState)([]);
    const [selectedIndex, setSelectedIndex] = (0, element_1.useState)(-1);
    const [dragIndex, setDragIndex] = (0, element_1.useState)(null);
    const [dropIndex, setDropIndex] = (0, element_1.useState)(null);
    (0, element_1.useEffect)(() => {
        if (!children) {
            return;
        }
        setItems(Array.isArray(children) ? children : [children]);
    }, [children]);
    const resetIndexes = () => {
        setTimeout(() => {
            setDragIndex(null);
            setDropIndex(null);
        }, THROTTLE_TIME);
    };
    const persistItemOrder = () => {
        if (dropIndex !== null &&
            dragIndex !== null &&
            dropIndex !== dragIndex) {
            const nextItems = (0, utils_1.moveIndex)(dragIndex, dropIndex, items);
            setItems(nextItems);
            onOrderChange(nextItems);
        }
        resetIndexes();
    };
    const handleDragStart = (event, index) => {
        setDropIndex(index);
        setDragIndex(index);
        onDragStart(event);
    };
    const handleDragEnd = (event) => {
        persistItemOrder();
        onDragEnd(event);
    };
    const handleDragOver = (event, index) => {
        if (dragIndex === null) {
            return;
        }
        // Items before the current item cause a one off error when
        // removed from the old array and spliced into the new array.
        // TODO: Issue with dragging into same position having to do with isBefore returning true initially.
        let targetIndex = dragIndex < index ? index : index + 1;
        if ((0, utils_1.isBefore)(event, isHorizontal)) {
            targetIndex--;
        }
        setDropIndex(targetIndex);
        onDragOver(event);
    };
    const throttledHandleDragOver = (0, element_1.useCallback)((0, lodash_1.throttle)(handleDragOver, THROTTLE_TIME), [dragIndex]);
    const handleKeyDown = (event) => {
        const { key } = event;
        const isSelecting = dragIndex === null || dropIndex === null;
        const selectedLabel = (0, utils_1.getItemName)(ref.current, selectedIndex);
        // Select or drop on spacebar press.
        if (key === ' ') {
            if (isSelecting) {
                (0, a11y_1.speak)((0, i18n_1.sprintf)(
                /** Translators: Selected item label */
                (0, i18n_1.__)('%s selected, use up and down arrow keys to reorder', 'fincommerce'), selectedLabel), 'assertive');
                setDragIndex(selectedIndex);
                setDropIndex(selectedIndex);
                return;
            }
            setSelectedIndex(dropIndex);
            (0, a11y_1.speak)((0, i18n_1.sprintf)(
            /* translators: %1$s: Selected item label, %2$d: Current position in list, %3$d: List total length */
            (0, i18n_1.__)('%1$s dropped, position in list: %2$d of %3$d', 'fincommerce'), selectedLabel, dropIndex + 1, items.length), 'assertive');
            persistItemOrder();
            return;
        }
        if (key === 'ArrowUp') {
            if (isSelecting) {
                setSelectedIndex((0, utils_1.getPreviousIndex)(selectedIndex, items.length));
                return;
            }
            const previousDropIndex = (0, utils_1.getPreviousIndex)(dropIndex, items.length);
            setDropIndex(previousDropIndex);
            (0, a11y_1.speak)((0, i18n_1.sprintf)(
            /* translators: %1$s: Selected item label, %2$d: Current position in list, %3$d: List total length */
            (0, i18n_1.__)('%1$s, position in list: %2$d of %3$d', 'fincommerce'), selectedLabel, previousDropIndex + 1, items.length), 'assertive');
            return;
        }
        if (key === 'ArrowDown') {
            if (isSelecting) {
                setSelectedIndex((0, utils_1.getNextIndex)(selectedIndex, items.length));
                return;
            }
            const nextDropIndex = (0, utils_1.getNextIndex)(dropIndex, items.length);
            setDropIndex(nextDropIndex);
            (0, a11y_1.speak)((0, i18n_1.sprintf)(
            /* translators: %1$s: Selected item label, %2$d: Current position in list, %3$d: List total length */
            (0, i18n_1.__)('%1$s, position in list: %2$d of %3$d', 'fincommerce'), selectedLabel, nextDropIndex + 1, items.length), 'assertive');
            return;
        }
        if (key === 'Escape') {
            resetIndexes();
            (0, a11y_1.speak)((0, i18n_1.__)('Reordering cancelled. Restoring the original list order', 'fincommerce'), 'assertive');
        }
    };
    return ((0, element_1.createElement)(exports.SortableContext.Provider, { value: {} },
        (0, element_1.createElement)("div", { ...props, className: (0, clsx_1.default)('fincommerce-sortable', className, {
                'is-dragging': dragIndex !== null,
                'is-horizontal': isHorizontal,
            }), ref: ref, role: role }, items.map((child, index) => {
            const isDragging = index === dragIndex;
            if (child.props.className &&
                child.props.className.indexOf('non-sortable-item') !==
                    -1) {
                return child;
            }
            const itemClasses = (0, clsx_1.default)(child.props.className, {
                'is-dragging-over-after': (0, utils_1.isDraggingOverAfter)(index, dragIndex, dropIndex),
                'is-dragging-over-before': (0, utils_1.isDraggingOverBefore)(index, dragIndex, dropIndex),
                'is-last-droppable': (0, utils_1.isLastDroppable)(index, dragIndex, items.length),
            });
            return (0, element_1.cloneElement)(child, {
                key: child.key || index,
                className: itemClasses,
                id: `${index}-${(0, uuid_1.v4)()}`,
                index,
                isDragging,
                isSelected: selectedIndex === index,
                onDragEnd: handleDragEnd,
                onDragStart: (event) => handleDragStart(event, index),
                onDragOver: (event) => {
                    event.preventDefault();
                    throttledHandleDragOver(event, index);
                },
                onKeyDown: (event) => handleKeyDown(event),
            });
        }))));
};
exports.Sortable = Sortable;
