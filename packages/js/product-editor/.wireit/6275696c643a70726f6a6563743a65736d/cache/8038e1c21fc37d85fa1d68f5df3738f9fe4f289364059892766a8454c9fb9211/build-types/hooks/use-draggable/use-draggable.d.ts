/**
 * External dependencies
 */
import { DragEvent, MouseEvent } from 'react';
/**
 * Internal dependencies
 */
import { DraggableProps } from './types';
export declare function useDraggable<T>({ onSort }: DraggableProps<T>): {
    container: {
        'data-draggable': string;
        className: string;
    };
    draggable: {
        'data-draggable': string;
        onDragStart: (event: DragEvent<HTMLElement>) => void;
        onDragEnter: (event: DragEvent<HTMLElement>) => void;
        onDragOver: (event: DragEvent<HTMLElement>) => boolean;
        onDragLeave: (event: DragEvent<HTMLElement>) => void;
        onDragEnd: (event: DragEvent<HTMLElement>) => void;
        onDrop: (event: DragEvent<HTMLElement>) => void;
    };
    handler: {
        'data-draggable': string;
        onMouseDown: (event: MouseEvent<HTMLElement>) => void;
        onMouseUp: (event: MouseEvent<HTMLElement>) => void;
        onMouseLeave: (event: MouseEvent<HTMLElement>) => void;
    };
};
//# sourceMappingURL=use-draggable.d.ts.map