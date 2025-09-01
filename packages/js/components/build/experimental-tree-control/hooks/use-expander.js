"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useExpander = useExpander;
/**
 * External dependencies
 */
const react_1 = require("react");
function useExpander({ shouldItemBeExpanded, item, }) {
    const [isExpanded, setExpanded] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        if (item.children?.length &&
            typeof shouldItemBeExpanded === 'function' &&
            !isExpanded) {
            setExpanded(shouldItemBeExpanded(item));
        }
    }, [item, shouldItemBeExpanded]);
    function onExpand() {
        setExpanded(true);
    }
    function onCollapse() {
        setExpanded(false);
    }
    function onToggleExpand() {
        setExpanded((prev) => !prev);
    }
    return { isExpanded, onExpand, onCollapse, onToggleExpand };
}
