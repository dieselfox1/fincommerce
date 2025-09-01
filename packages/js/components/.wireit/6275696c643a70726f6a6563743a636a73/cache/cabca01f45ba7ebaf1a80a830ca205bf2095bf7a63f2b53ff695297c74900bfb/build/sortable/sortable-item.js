"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SortableItem = void 0;
/**
 * External dependencies
 */
const i18n_1 = require("@wordpress/i18n");
const react_1 = require("react");
const clsx_1 = __importDefault(require("clsx"));
const element_1 = require("@wordpress/element");
const components_1 = require("@wordpress/components");
/**
 * Internal dependencies
 */
const sortable_1 = require("./sortable");
const SortableItem = ({ id, children, className, isDragging = false, isSelected = false, onDragStart = () => null, onDragEnd = () => null, role = 'listitem', ...props }) => {
    const ref = (0, element_1.useRef)(null);
    const sortableContext = (0, element_1.useContext)(sortable_1.SortableContext);
    const handleDragStart = (event) => {
        onDragStart(event);
    };
    const handleDragEnd = (event) => {
        event.preventDefault();
        onDragEnd(event);
    };
    (0, react_1.useEffect)(() => {
        if (isSelected && ref.current) {
            ref.current.focus();
        }
    }, [isSelected]);
    return ((0, element_1.createElement)("div", { ...props, "aria-selected": isSelected, className: (0, clsx_1.default)('fincommerce-sortable__item', className, {
            'is-dragging': isDragging,
            'is-selected': isSelected,
        }), id: `fincommerce-sortable__item-${id}`, role: role, onDrop: (event) => event.preventDefault(), ref: ref, tabIndex: isSelected ? 0 : -1, "aria-description": (0, i18n_1.__)('Press spacebar to reorder', 'fincommerce') },
        (0, element_1.createElement)(components_1.Draggable, { elementId: `fincommerce-sortable__item-${id}`, transferData: {}, onDragStart: handleDragStart, onDragEnd: handleDragEnd }, ({ onDraggableStart, onDraggableEnd }) => {
            return ((0, element_1.createElement)(sortable_1.SortableContext.Provider, { value: {
                    ...sortableContext,
                    onDragStart: onDraggableStart,
                    onDragEnd: onDraggableEnd,
                } }, children));
        })));
};
exports.SortableItem = SortableItem;
