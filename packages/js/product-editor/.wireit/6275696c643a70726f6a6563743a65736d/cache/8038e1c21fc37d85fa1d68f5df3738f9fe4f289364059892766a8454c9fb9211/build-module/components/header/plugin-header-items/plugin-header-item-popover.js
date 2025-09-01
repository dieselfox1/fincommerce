/**
 * External dependencies
 */
import { createElement, Fragment, useState } from '@wordpress/element';
import { Button, Popover } from '@wordpress/components';
import { plugins } from '@wordpress/icons';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore No types for this exist yet.
// eslint-disable-next-line @fincommerce/dependency-group
import PinnedItems from '@wordpress/interface/build-module/components/pinned-items';
/**
 * Internal dependencies
 */
import { HEADER_PINNED_ITEMS_SCOPE } from '../../../constants';
export const PluginHeaderItemPopover = ({ children, label, icon, }) => {
    const [isVisible, setVisible] = useState(false);
    const childrenToRender = typeof children === 'function'
        ? children({ isVisible, setVisible })
        : children;
    return (createElement(PinnedItems, { scope: HEADER_PINNED_ITEMS_SCOPE },
        createElement(Fragment, null,
            createElement(Button, { variant: "tertiary", icon: icon ?? plugins, label: label, onClick: () => setVisible(!isVisible) }),
            isVisible && (createElement(Popover, { focusOnMount: true, onFocusOutside: () => setVisible(false), onClose: () => setVisible(false) }, childrenToRender)))));
};
