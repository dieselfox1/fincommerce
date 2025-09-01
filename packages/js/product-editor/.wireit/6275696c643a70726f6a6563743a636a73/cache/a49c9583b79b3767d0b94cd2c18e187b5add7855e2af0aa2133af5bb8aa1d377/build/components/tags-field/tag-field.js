"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagField = void 0;
exports.mapFromTagToTreeItem = mapFromTagToTreeItem;
exports.mapFromTreeItemToTag = mapFromTreeItemToTag;
exports.mapFromTagsToTreeItems = mapFromTagsToTreeItems;
exports.mapFromTreeItemsToTags = mapFromTreeItemsToTags;
/**
 * External dependencies
 */
const i18n_1 = require("@wordpress/i18n");
const element_1 = require("@wordpress/element");
const components_1 = require("@fincommerce/components");
const tracks_1 = require("@fincommerce/tracks");
const data_1 = require("@fincommerce/data");
const data_2 = require("@wordpress/data");
const compose_1 = require("@wordpress/compose");
/**
 * Internal dependencies
 */
const use_tag_search_1 = require("./use-tag-search");
const constants_1 = require("../../constants");
const create_tag_modal_1 = require("./create-tag-modal");
function mapFromTagToTreeItem(val) {
    return {
        value: String(val.id),
        label: val.name,
    };
}
function mapFromTreeItemToTag(val) {
    return {
        id: +val.value,
        name: val.label,
    };
}
function mapFromTagsToTreeItems(tags) {
    return tags.map(mapFromTagToTreeItem);
}
function mapFromTreeItemsToTags(tags) {
    return tags.map(mapFromTreeItemToTag);
}
const TagField = ({ id, isVisible = false, label, placeholder, value = [], onChange, }) => {
    const { tagsSelectList, searchTags } = (0, use_tag_search_1.useTagSearch)();
    const [searchValue, setSearchValue] = (0, element_1.useState)('');
    const [isCreating, setIsCreating] = (0, element_1.useState)(false);
    const [showCreateNewModal, setShowCreateNewModal] = (0, element_1.useState)(false);
    const [newInputValue, setNewInputValue] = (0, element_1.useState)();
    const { createProductTag, invalidateResolutionForStoreSelector } = (0, data_2.useDispatch)(data_1.experimentalProductTagsStore);
    const { createNotice } = (0, data_2.useDispatch)('core/notices');
    const onInputChange = (searchString) => {
        setSearchValue(searchString || '');
        searchTags(searchString || '');
        setNewInputValue(searchString);
    };
    (0, element_1.useEffect)(() => {
        if (isVisible) {
            searchTags();
        }
    }, [isVisible]);
    const searchDelayed = (0, compose_1.useDebounce)(onInputChange, 150);
    const onSave = async () => {
        (0, tracks_1.recordEvent)('product_tag_add', {
            source: constants_1.TRACKS_SOURCE,
        });
        setIsCreating(true);
        try {
            setNewInputValue('');
            const newTag = await createProductTag({
                name: searchValue,
            });
            invalidateResolutionForStoreSelector('getProductTags');
            setIsCreating(false);
            onChange([...value, newTag]);
            onInputChange('');
        }
        catch (e) {
            createNotice('error', (0, i18n_1.__)('Failed to create tag.', 'fincommerce'));
            setIsCreating(false);
        }
    };
    return ((0, element_1.createElement)(element_1.Fragment, null,
        (0, element_1.createElement)(components_1.__experimentalSelectTreeControl, { id: id, multiple: true, shouldNotRecursivelySelect: true, createValue: searchValue, label: label, isLoading: isCreating, onInputChange: searchDelayed, placeholder: value.length === 0 ? placeholder : '', initialInputValue: newInputValue, onCreateNew: searchValue.length === 0
                ? () => setShowCreateNewModal(true)
                : onSave, shouldShowCreateButton: (typedValue) => !typedValue ||
                tagsSelectList.findIndex((item) => item.name === typedValue) === -1, items: mapFromTagsToTreeItems(tagsSelectList), selected: mapFromTagsToTreeItems(value), onSelect: (selectedItems) => {
                if (Array.isArray(selectedItems)) {
                    const newItems = mapFromTreeItemsToTags(selectedItems.filter(({ value: selectedItemValue }) => !value.some((item) => item.id === +selectedItemValue)));
                    onChange([...value, ...newItems]);
                }
                else {
                    onChange([
                        ...value,
                        mapFromTreeItemToTag(selectedItems),
                    ]);
                }
            }, onRemove: (removedItems) => {
                const newValues = Array.isArray(removedItems)
                    ? value.filter((item) => !removedItems.some(({ value: removedValue }) => item.id === +removedValue))
                    : value.filter((item) => item.id !== +removedItems.value);
                onChange(newValues);
            } }),
        showCreateNewModal && ((0, element_1.createElement)(create_tag_modal_1.CreateTagModal, { initialTagName: searchValue, onCancel: () => setShowCreateNewModal(false), onCreate: (newTag) => {
                onChange([...value, newTag]);
                setShowCreateNewModal(false);
                onInputChange('');
            } }))));
};
exports.TagField = TagField;
