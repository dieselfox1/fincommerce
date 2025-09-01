/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { useEffect } from 'react';
import clsx from 'clsx';
import { createElement, useRef, useContext } from '@wordpress/element';
import { Draggable } from '@wordpress/components';
/**
 * Internal dependencies
 */
import { SortableContext } from './sortable';
export const SortableItem = ({ id, children, className, isDragging = false, isSelected = false, onDragStart = () => null, onDragEnd = () => null, role = 'listitem', ...props }) => {
    const ref = useRef(null);
    const sortableContext = useContext(SortableContext);
    const handleDragStart = (event) => {
        onDragStart(event);
    };
    const handleDragEnd = (event) => {
        event.preventDefault();
        onDragEnd(event);
    };
    useEffect(() => {
        if (isSelected && ref.current) {
            ref.current.focus();
        }
    }, [isSelected]);
    return (createElement("div", { ...props, "aria-selected": isSelected, className: clsx('fincommerce-sortable__item', className, {
            'is-dragging': isDragging,
            'is-selected': isSelected,
        }), id: `fincommerce-sortable__item-${id}`, role: role, onDrop: (event) => event.preventDefault(), ref: ref, tabIndex: isSelected ? 0 : -1, "aria-description": __('Press spacebar to reorder', 'fincommerce') },
        createElement(Draggable, { elementId: `fincommerce-sortable__item-${id}`, transferData: {}, onDragStart: handleDragStart, onDragEnd: handleDragEnd }, ({ onDraggableStart, onDraggableEnd }) => {
            return (createElement(SortableContext.Provider, { value: {
                    ...sortableContext,
                    onDragStart: onDraggableStart,
                    onDragEnd: onDraggableEnd,
                } }, children));
        })));
};
