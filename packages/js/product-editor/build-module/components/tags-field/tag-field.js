/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { useEffect, useState, createElement, Fragment, } from '@wordpress/element';
import { __experimentalSelectTreeControl as SelectTree, } from '@fincommerce/components';
import { recordEvent } from '@fincommerce/tracks';
import { experimentalProductTagsStore } from '@fincommerce/data';
import { useDispatch } from '@wordpress/data';
import { useDebounce } from '@wordpress/compose';
/**
 * Internal dependencies
 */
import { useTagSearch } from './use-tag-search';
import { TRACKS_SOURCE } from '../../constants';
import { CreateTagModal } from './create-tag-modal';
export function mapFromTagToTreeItem(val) {
    return {
        value: String(val.id),
        label: val.name,
    };
}
export function mapFromTreeItemToTag(val) {
    return {
        id: +val.value,
        name: val.label,
    };
}
export function mapFromTagsToTreeItems(tags) {
    return tags.map(mapFromTagToTreeItem);
}
export function mapFromTreeItemsToTags(tags) {
    return tags.map(mapFromTreeItemToTag);
}
export const TagField = ({ id, isVisible = false, label, placeholder, value = [], onChange, }) => {
    const { tagsSelectList, searchTags } = useTagSearch();
    const [searchValue, setSearchValue] = useState('');
    const [isCreating, setIsCreating] = useState(false);
    const [showCreateNewModal, setShowCreateNewModal] = useState(false);
    const [newInputValue, setNewInputValue] = useState();
    const { createProductTag, invalidateResolutionForStoreSelector } = useDispatch(experimentalProductTagsStore);
    const { createNotice } = useDispatch('core/notices');
    const onInputChange = (searchString) => {
        setSearchValue(searchString || '');
        searchTags(searchString || '');
        setNewInputValue(searchString);
    };
    useEffect(() => {
        if (isVisible) {
            searchTags();
        }
    }, [isVisible]);
    const searchDelayed = useDebounce(onInputChange, 150);
    const onSave = async () => {
        recordEvent('product_tag_add', {
            source: TRACKS_SOURCE,
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
            createNotice('error', __('Failed to create tag.', 'fincommerce'));
            setIsCreating(false);
        }
    };
    return (createElement(Fragment, null,
        createElement(SelectTree, { id: id, multiple: true, shouldNotRecursivelySelect: true, createValue: searchValue, label: label, isLoading: isCreating, onInputChange: searchDelayed, placeholder: value.length === 0 ? placeholder : '', initialInputValue: newInputValue, onCreateNew: searchValue.length === 0
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
        showCreateNewModal && (createElement(CreateTagModal, { initialTagName: searchValue, onCancel: () => setShowCreateNewModal(false), onCreate: (newTag) => {
                onChange([...value, newTag]);
                setShowCreateNewModal(false);
                onInputChange('');
            } }))));
};
