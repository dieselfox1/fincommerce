/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Button, Modal, TextControl } from '@wordpress/components';
import { useState, createElement } from '@wordpress/element';
import { useDispatch } from '@wordpress/data';
import { recordEvent } from '@fincommerce/tracks';
import { experimentalProductTagsStore } from '@fincommerce/data';
/**
 * Internal dependencies
 */
import { TRACKS_SOURCE } from '../../constants';
export const CreateTagModal = ({ initialTagName, onCancel, onCreate, }) => {
    const { createNotice } = useDispatch('core/notices');
    const [isCreating, setIsCreating] = useState(false);
    const { createProductTag, invalidateResolutionForStoreSelector } = useDispatch(experimentalProductTagsStore);
    const [tagName, setTagName] = useState(initialTagName || '');
    const onSave = async () => {
        recordEvent('product_tag_add', {
            source: TRACKS_SOURCE,
        });
        setIsCreating(true);
        try {
            const newTag = await createProductTag({
                name: tagName,
            });
            invalidateResolutionForStoreSelector('getProductTags');
            setIsCreating(false);
            onCreate(newTag);
        }
        catch (e) {
            createNotice('error', __('Failed to create tag.', 'fincommerce'));
            setIsCreating(false);
            onCancel();
        }
    };
    return (createElement(Modal, { title: __('Create tag', 'fincommerce'), onRequestClose: () => onCancel(), className: "fincommerce-create-new-tag-modal" },
        createElement("div", { className: "fincommerce-create-new-tag-modal__wrapper" },
            createElement(TextControl, { label: __('Name', 'fincommerce'), name: "Tops", value: tagName, onChange: setTagName }),
            createElement("div", { className: "fincommerce-create-new-tag-modal__buttons" },
                createElement(Button, { isSecondary: true, onClick: () => onCancel(), disabled: isCreating }, __('Cancel', 'fincommerce')),
                createElement(Button, { isPrimary: true, disabled: tagName.length === 0 || isCreating, isBusy: isCreating, onClick: () => {
                        onSave();
                    } }, __('Save', 'fincommerce'))))));
};
