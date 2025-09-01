"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAdminSidebarWidth = useAdminSidebarWidth;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
/**
 * the admin menu can have different widths in certain scenarios, like when using calypso
 * so we need to observe it and adjust the header width and position accordingly
 */
function useAdminSidebarWidth() {
    const [width, setWidth] = (0, element_1.useState)(0);
    (0, element_1.useEffect)(() => {
        const resizeObserver = new ResizeObserver((entries) => {
            setWidth(entries[0].contentRect.width);
        });
        const adminMenu = document.getElementById('adminmenu');
        if (adminMenu) {
            resizeObserver.observe(adminMenu);
        }
        return () => {
            if (adminMenu) {
                resizeObserver.unobserve(adminMenu);
            }
        };
    }, []);
    return width;
}
