import { useRef } from '@wordpress/element';
import { findDraggableIndex, sort } from './utils';
export function useDraggable({ onSort }) {
    const dragIndexRef = useRef(-1);
    const dropIndexRef = useRef(-1);
    const draggableElementsRef = useRef([]);
    function onDragStart(event) {
        const element = event.target;
        if (element.dataset.draggable !== 'target') {
            event.preventDefault();
            return;
        }
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.dropEffect = 'move';
        element.classList.add('is-dragging');
        const parent = element.closest('[data-draggable=parent]');
        draggableElementsRef.current = Array.from(parent
            ?.querySelectorAll('[data-draggable=target]')
            ?.values() ?? []);
        dragIndexRef.current = draggableElementsRef.current.indexOf(element);
    }
    function onDragEnd(event) {
        const element = event.target;
        if (element.dataset.draggable !== 'target') {
            event.preventDefault();
            return;
        }
        element.classList.remove('is-dragging');
    }
    function onDragEnter(event) {
        const element = event.target;
        const relatedTarget = event.relatedTarget;
        if (element.dataset.draggable !== 'target' ||
            element.contains(relatedTarget)) {
            event.preventDefault();
            return;
        }
        const { draggable, index } = findDraggableIndex(draggableElementsRef.current, element);
        dropIndexRef.current = index;
        if (dragIndexRef.current === dropIndexRef.current)
            return;
        if (dragIndexRef.current < dropIndexRef.current) {
            draggable?.classList.add('is-dragging-after');
        }
        else {
            draggable?.classList.add('is-dragging-before');
        }
    }
    function onDragLeave(event) {
        const element = event.target;
        const relatedTarget = event.relatedTarget;
        if (element.dataset.draggable !== 'target' ||
            element.contains(relatedTarget)) {
            event.preventDefault();
            return;
        }
        element.classList.remove('is-dragging-before');
        element.classList.remove('is-dragging-after');
    }
    function onDrop(event) {
        event.preventDefault();
        const element = event.target;
        const draggable = element.dataset.draggable === 'target'
            ? element
            : element.closest('[data-draggable=parent] [data-draggable=target]');
        draggable?.removeAttribute('draggable');
        draggable?.classList.remove('is-dragging-before');
        draggable?.classList.remove('is-dragging-after');
        if (dragIndexRef.current !== -1 &&
            dropIndexRef.current !== -1 &&
            dragIndexRef.current !== dropIndexRef.current) {
            const drapIndex = dragIndexRef.current;
            const dropIndex = dropIndexRef.current;
            onSort((items) => sort(items, drapIndex, dropIndex + Number(drapIndex < dropIndex)));
        }
        dragIndexRef.current = -1;
        dropIndexRef.current = -1;
    }
    function onDragOver(event) {
        event.preventDefault();
        return false;
    }
    function onMouseDown(event) {
        const element = event.target;
        element
            .closest('[data-draggable=parent] [data-draggable=target]')
            ?.setAttribute('draggable', 'true');
    }
    function onMouseUp(event) {
        const element = event.target;
        element
            .closest('[data-draggable=parent] [data-draggable=target]')
            ?.removeAttribute('draggable');
    }
    return {
        container: {
            'data-draggable': 'parent',
            className: 'fincommerce-draggable__container',
        },
        draggable: {
            'data-draggable': 'target',
            onDragStart,
            onDragEnter,
            onDragOver,
            onDragLeave,
            onDragEnd,
            onDrop,
        },
        handler: {
            'data-draggable': 'handler',
            onMouseDown,
            onMouseUp,
            onMouseLeave: onMouseUp,
        },
    };
}
