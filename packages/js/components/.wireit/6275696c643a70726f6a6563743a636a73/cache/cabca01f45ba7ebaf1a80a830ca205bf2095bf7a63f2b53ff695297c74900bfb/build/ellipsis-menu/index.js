"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const element_1 = require("@wordpress/element");
const clsx_1 = __importDefault(require("clsx"));
const components_1 = require("@wordpress/components");
const icons_1 = require("@wordpress/icons");
const ellipsis_1 = __importDefault(require("gridicons/dist/ellipsis"));
/**
 * This is a dropdown menu hidden behind a vertical ellipsis icon. When clicked, the inner MenuItems are displayed.
 */
const EllipsisMenu = ({ label, renderContent, className, onToggle, 
// if set bottom-start, it will fallback to bottom-end / top-end / top-start
// if it's bottom, it will fallback to only top
placement = 'bottom-start', focusOnMount = 'firstElement', }) => {
    if (!renderContent) {
        return null;
    }
    const renderEllipsis = ({ onToggle: toggleHandlerOverride, isOpen, }) => {
        const toggleClassname = (0, clsx_1.default)('fincommerce-ellipsis-menu__toggle', {
            'is-opened': isOpen,
        });
        return ((0, element_1.createElement)(components_1.Button, { className: toggleClassname, onClick: (e) => {
                if (onToggle) {
                    onToggle(e);
                }
                if (toggleHandlerOverride) {
                    toggleHandlerOverride();
                }
            }, title: label, "aria-expanded": isOpen },
            (0, element_1.createElement)(icons_1.Icon, { icon: (0, element_1.createElement)(ellipsis_1.default, null) })));
    };
    const renderMenu = (renderContentArgs) => ((0, element_1.createElement)(components_1.NavigableMenu, { className: "fincommerce-ellipsis-menu__content" }, renderContent(renderContentArgs)));
    return ((0, element_1.createElement)("div", { className: (0, clsx_1.default)(className, 'fincommerce-ellipsis-menu') },
        (0, element_1.createElement)(components_1.Dropdown, { contentClassName: "fincommerce-ellipsis-menu__popover", popoverProps: { placement, focusOnMount }, renderToggle: renderEllipsis, renderContent: renderMenu })));
};
exports.default = EllipsisMenu;
