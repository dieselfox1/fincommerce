"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTagModal = void 0;
/**
 * External dependencies
 */
const i18n_1 = require("@wordpress/i18n");
const components_1 = require("@wordpress/components");
const element_1 = require("@wordpress/element");
const data_1 = require("@wordpress/data");
const tracks_1 = require("@fincommerce/tracks");
const data_2 = require("@fincommerce/data");
/**
 * Internal dependencies
 */
const constants_1 = require("../../constants");
const CreateTagModal = ({ initialTagName, onCancel, onCreate, }) => {
    const { createNotice } = (0, data_1.useDispatch)('core/notices');
    const [isCreating, setIsCreating] = (0, element_1.useState)(false);
    const { createProductTag, invalidateResolutionForStoreSelector } = (0, data_1.useDispatch)(data_2.experimentalProductTagsStore);
    const [tagName, setTagName] = (0, element_1.useState)(initialTagName || '');
    const onSave = async () => {
        (0, tracks_1.recordEvent)('product_tag_add', {
            source: constants_1.TRACKS_SOURCE,
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
            createNotice('error', (0, i18n_1.__)('Failed to create tag.', 'fincommerce'));
            setIsCreating(false);
            onCancel();
        }
    };
    return ((0, element_1.createElement)(components_1.Modal, { title: (0, i18n_1.__)('Create tag', 'fincommerce'), onRequestClose: () => onCancel(), className: "fincommerce-create-new-tag-modal" },
        (0, element_1.createElement)("div", { className: "fincommerce-create-new-tag-modal__wrapper" },
            (0, element_1.createElement)(components_1.TextControl, { label: (0, i18n_1.__)('Name', 'fincommerce'), name: "Tops", value: tagName, onChange: setTagName }),
            (0, element_1.createElement)("div", { className: "fincommerce-create-new-tag-modal__buttons" },
                (0, element_1.createElement)(components_1.Button, { isSecondary: true, onClick: () => onCancel(), disabled: isCreating }, (0, i18n_1.__)('Cancel', 'fincommerce')),
                (0, element_1.createElement)(components_1.Button, { isPrimary: true, disabled: tagName.length === 0 || isCreating, isBusy: isCreating, onClick: () => {
                        onSave();
                    } }, (0, i18n_1.__)('Save', 'fincommerce'))))));
};
exports.CreateTagModal = CreateTagModal;
