import { createElement } from '@wordpress/element';
import clsx from 'clsx';
import { Button, Dropdown, NavigableMenu } from '@wordpress/components';
import { Icon } from '@wordpress/icons';
import Ellipsis from 'gridicons/dist/ellipsis';
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
        const toggleClassname = clsx('fincommerce-ellipsis-menu__toggle', {
            'is-opened': isOpen,
        });
        return (createElement(Button, { className: toggleClassname, onClick: (e) => {
                if (onToggle) {
                    onToggle(e);
                }
                if (toggleHandlerOverride) {
                    toggleHandlerOverride();
                }
            }, title: label, "aria-expanded": isOpen },
            createElement(Icon, { icon: createElement(Ellipsis, null) })));
    };
    const renderMenu = (renderContentArgs) => (createElement(NavigableMenu, { className: "fincommerce-ellipsis-menu__content" }, renderContent(renderContentArgs)));
    return (createElement("div", { className: clsx(className, 'fincommerce-ellipsis-menu') },
        createElement(Dropdown, { contentClassName: "fincommerce-ellipsis-menu__popover", popoverProps: { placement, focusOnMount }, renderToggle: renderEllipsis, renderContent: renderMenu })));
};
export default EllipsisMenu;
