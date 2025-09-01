import { createElement } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { customLink, keyboardReturn } from '@wordpress/icons';
import { Button, Dropdown, MenuItem, __experimentalInputControl as InputControl, } from '@wordpress/components';
function validateInput(input) {
    input.required = true;
    input.setCustomValidity('');
    if (input.validity.valueMissing) {
        input.setCustomValidity(__('The URL is required', 'fincommerce'));
    }
    if (input.validity.typeMismatch) {
        input.setCustomValidity(__('Insert a valid URL', 'fincommerce'));
    }
}
export function InsertUrlMenuItem({ onLinkSuccess, onLinkError, }) {
    function handleSubmit(event) {
        event.preventDefault();
        const form = event.currentTarget;
        const urlInput = form.url;
        validateInput(urlInput);
        if (form.checkValidity()) {
            const url = form.url.value;
            const mediaItem = {
                url,
            };
            onLinkSuccess([mediaItem]);
        }
        else {
            onLinkError(urlInput.validationMessage);
        }
    }
    function handleInput(event) {
        const urlInput = event.target;
        validateInput(urlInput);
    }
    function handleBlur(event) {
        const urlInput = event.target;
        validateInput(urlInput);
    }
    return (createElement(Dropdown, { popoverProps: {
            placement: 'left',
        }, renderToggle: ({ isOpen, onToggle }) => (createElement(MenuItem, { "aria-expanded": isOpen, icon: customLink, iconPosition: "left", onClick: onToggle, info: __('Link to a file hosted elsewhere', 'fincommerce') }, __('Insert from URL', 'fincommerce'))), renderContent: () => (createElement("form", { className: "components-dropdown-menu__menu", noValidate: true, onSubmit: handleSubmit },
            createElement(InputControl, { name: "url", type: "url", placeholder: __('Insert URL', 'fincommerce'), suffix: createElement(Button, { icon: keyboardReturn, type: "submit" }), className: "fincommerce-inert-url-menu-item__input", "aria-label": __('Insert URL', 'fincommerce'), onInput: handleInput, onBlur: handleBlur }))) }));
}
