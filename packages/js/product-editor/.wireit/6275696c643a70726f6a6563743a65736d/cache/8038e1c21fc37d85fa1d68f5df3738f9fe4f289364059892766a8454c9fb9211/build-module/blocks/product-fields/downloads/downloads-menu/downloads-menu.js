/**
 * External dependencies
 */
import { Button, Dropdown, MenuGroup } from '@wordpress/components';
import { createElement } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { chevronDown, chevronUp } from '@wordpress/icons';
import { InsertUrlMenuItem } from '../insert-url-menu-item';
import { UploadFilesMenuItem } from '../upload-files-menu-item';
export function DownloadsMenu({ allowedTypes, maxUploadFileSize, onUploadSuccess, onUploadError, onLinkError, }) {
    return (createElement(Dropdown, { popoverProps: {
            placement: 'bottom-end',
        }, contentClassName: "fincommerce-downloads-menu__menu-content", renderToggle: ({ isOpen, onToggle }) => (createElement(Button, { "aria-expanded": isOpen, icon: isOpen ? chevronUp : chevronDown, variant: "secondary", onClick: onToggle, className: "fincommerce-downloads-menu__toggle" },
            createElement("span", null, __('Add new', 'fincommerce')))), renderContent: ({ onClose }) => (createElement("div", { className: "components-dropdown-menu__menu" },
            createElement(MenuGroup, null,
                createElement(UploadFilesMenuItem, { allowedTypes: allowedTypes, maxUploadFileSize: maxUploadFileSize, onUploadSuccess: (files) => {
                        onUploadSuccess(files);
                        onClose();
                    }, onUploadError: (error) => {
                        onUploadError(error);
                        onClose();
                    } }),
                createElement(InsertUrlMenuItem, { onLinkSuccess: (files) => {
                        onUploadSuccess(files);
                        onClose();
                    }, onLinkError: (error) => {
                        onLinkError(error);
                        onClose();
                    } })))) }));
}
