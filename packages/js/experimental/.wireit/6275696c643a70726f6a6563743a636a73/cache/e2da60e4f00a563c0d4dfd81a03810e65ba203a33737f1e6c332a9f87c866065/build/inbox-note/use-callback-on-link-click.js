"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCallbackOnLinkClick = useCallbackOnLinkClick;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
function useCallbackOnLinkClick(onClick) {
    const onNodeClick = (0, element_1.useCallback)((event) => {
        const target = event.target;
        if (target && 'href' in target) {
            const innerLink = target.href;
            if (innerLink && onClick) {
                onClick(innerLink);
            }
        }
    }, [onClick]);
    const nodeRef = (0, element_1.useRef)(null);
    (0, element_1.useEffect)(() => {
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
    return (0, element_1.useCallback)((node) => {
        nodeRef.current = node;
    }, []);
}
