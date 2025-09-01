/**
 * External dependencies
 */
import { useCallback, useEffect, useRef } from '@wordpress/element';
export function useCallbackOnLinkClick(onClick) {
    const onNodeClick = useCallback((event) => {
        const target = event.target;
        if (target && 'href' in target) {
            const innerLink = target.href;
            if (innerLink && onClick) {
                onClick(innerLink);
            }
        }
    }, [onClick]);
    const nodeRef = useRef(null);
    useEffect(() => {
        const node = nodeRef.current;
        if (node) {
            node.addEventListener('click', onNodeClick);
        }
        return () => {
            if (node) {
                node.removeEventListener('click', onNodeClick);
            }
        };
    }, [onNodeClick]);
    return useCallback((node) => {
        nodeRef.current = node;
    }, []);
}
