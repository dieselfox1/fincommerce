/**
 * External dependencies
 */
import { DropdownMenu } from '@wordpress/components';
import { createElement } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { moreVertical } from '@wordpress/icons';
import { recordEvent } from '@fincommerce/tracks';
import { TRACKS_SOURCE } from '../../../constants';
import { VariationActions } from './variation-actions';
export function SingleUpdateMenu({ selection, onChange, onDelete, }) {
    if (!selection || selection.length !== 1) {
        return null;
    }
    return (createElement(DropdownMenu, { popoverProps: {
            placement: 'left-start',
        }, icon: moreVertical, label: __('Actions', 'fincommerce'), toggleProps: {
            onClick() {
                recordEvent('product_variations_menu_view', {
                    source: TRACKS_SOURCE,
                    variation_id: selection[0].id,
                });
            },
        } }, ({ onClose }) => (createElement(VariationActions, { selection: selection, onClose: onClose, onChange: onChange, onDelete: onDelete, supportsMultipleSelection: false }))));
}
