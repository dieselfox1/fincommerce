/**
 * External dependencies
 */
import { sprintf, __ } from '@wordpress/i18n';
import { CheckboxControl, Icon, Spinner } from '@wordpress/components';
import { resolveSelect, useDispatch } from '@wordpress/data';
import { useCallback, useEffect, useRef, useState, createElement, Fragment, } from '@wordpress/element';
import { recordEvent } from '@fincommerce/tracks';
import { useDebounce } from '@wordpress/compose';
import { plus } from '@wordpress/icons';
import { experimentalProductAttributeTermsStore, } from '@fincommerce/data';
import { selectControlStateChangeTypes, __experimentalSelectControl as SelectControl, __experimentalSelectControlMenu as Menu, __experimentalSelectControlMenuItem as MenuItem, } from '@fincommerce/components';
import { cleanForSlug } from '@wordpress/url';
/**
 * Internal dependencies
 */
import { CreateAttributeTermModal } from './create-attribute-term-modal';
import { TRACKS_SOURCE } from '../../constants';
let uniqueId = 0;
export const AttributeTermInputField = ({ value = [], onChange, placeholder, disabled, attributeId, label = '', autoCreateOnSelect = true, readOnlyWhenClosed = false, }) => {
    const attributeTermInputId = useRef(`fincommerce-attribute-term-field-${++uniqueId}`);
    const [fetchedItems, setFetchedItems] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [isCreatingTerm, setIsCreatingTerm] = useState(false);
    const [addNewAttributeTermName, setAddNewAttributeTermName] = useState();
    const { createNotice } = useDispatch('core/notices');
    const { createProductAttributeTerm, invalidateResolutionForStoreSelector } = useDispatch(experimentalProductAttributeTermsStore);
    const fetchItems = useCallback((searchString) => {
        setIsFetching(true);
        return resolveSelect(experimentalProductAttributeTermsStore)
            .getProductAttributeTerms({
            search: searchString || '',
            attribute_id: attributeId,
        })
            .then((attributeTerms) => {
            setFetchedItems(attributeTerms || []);
            setIsFetching(false);
            return attributeTerms;
        }, (error) => {
            setIsFetching(false);
            return error;
        });
    }, [attributeId]);
    const debouncedSearch = useDebounce(fetchItems, 250);
    useEffect(() => {
        if (!disabled &&
            attributeId !== undefined &&
            !fetchedItems.length) {
            fetchItems();
        }
    }, [disabled, attributeId]);
    const onRemove = (item) => {
        onChange(value.filter((opt) => opt.slug !== item.slug));
    };
    const focusSelectControl = () => {
        const selectControlInputField = document.querySelector('.' +
            attributeTermInputId.current +
            ' .fincommerce-experimental-select-control__input');
        if (selectControlInputField) {
            setTimeout(() => {
                selectControlInputField.focus();
            }, 0);
        }
    };
    const createAttributeTerm = async (attribute) => {
        recordEvent('product_attribute_term_add', {
            source: TRACKS_SOURCE,
        });
        setIsCreatingTerm(true);
        try {
            const newAttribute = await createProductAttributeTerm({
                ...attribute,
                attribute_id: attributeId,
            });
            recordEvent('product_attribute_term_add_success', {
                source: TRACKS_SOURCE,
            });
            onChange([...value, newAttribute]);
            invalidateResolutionForStoreSelector('getProductAttributeTerms');
            setIsCreatingTerm(false);
        }
        catch (err) {
            let error = {
                source: TRACKS_SOURCE,
                code: 'Unknown error.',
                message: 'An unknown error occurred.',
            };
            let noticeMessage = __('Failed to create attribute term.', 'fincommerce');
            const errorResponse = err;
            if (errorResponse?.code && errorResponse?.message) {
                error = {
                    ...error,
                    code: errorResponse.code,
                    message: errorResponse.message,
                };
                if (errorResponse.code === 'term_exists') {
                    noticeMessage = __('Attribute term already exists.', 'fincommerce');
                }
            }
            recordEvent('product_attribute_term_add_failed', error);
            createNotice('error', noticeMessage);
            setIsCreatingTerm(false);
        }
    };
    const onSelect = (item) => {
        // Add new item.
        if (item.id === -99) {
            if (autoCreateOnSelect) {
                createAttributeTerm({
                    name: item.name,
                    slug: cleanForSlug(item.name),
                });
                focusSelectControl();
            }
            else {
                setAddNewAttributeTermName(item.name);
            }
            return;
        }
        const isSelected = value.find((i) => i.slug === item.slug);
        if (isSelected) {
            onRemove(item);
            return;
        }
        onChange([...value, item]);
    };
    const selectedTermSlugs = (value || []).map((term) => term.slug);
    return (createElement(Fragment, null,
        createElement(SelectControl, { items: fetchedItems, multiple: true, disabled: disabled || !attributeId, label: label, getFilteredItems: (allItems, inputValue) => {
                if (inputValue.length > 0 &&
                    !allItems.find((item) => item.name.toLowerCase() ===
                        inputValue.toLowerCase())) {
                    return [
                        ...allItems,
                        {
                            id: -99,
                            name: inputValue,
                        },
                    ];
                }
                return allItems;
            }, onInputChange: debouncedSearch, placeholder: placeholder || '', getItemLabel: (item) => item?.name || '', getItemValue: (item) => item?.slug || '', stateReducer: (state, actionAndChanges) => {
                const { changes, type } = actionAndChanges;
                switch (type) {
                    case selectControlStateChangeTypes.ControlledPropUpdatedSelectedItem:
                        const listIsOpen = isCreatingTerm
                            ? { isOpen: isCreatingTerm }
                            : {};
                        return {
                            ...changes,
                            ...listIsOpen,
                            inputValue: state.inputValue,
                        };
                    case selectControlStateChangeTypes.ItemClick:
                        if (changes.selectedItem &&
                            changes.selectedItem.id === -99) {
                            return changes;
                        }
                        return {
                            ...changes,
                            isOpen: true,
                            inputValue: state.inputValue,
                            highlightedIndex: state.highlightedIndex,
                        };
                    default:
                        return changes;
                }
            }, selected: value, onSelect: onSelect, onRemove: onRemove, readOnlyWhenClosed: readOnlyWhenClosed, className: 'fincommerce-attribute-term-field ' +
                attributeTermInputId.current, __experimentalOpenMenuOnFocus: true }, ({ items, highlightedIndex, getItemProps, getMenuProps, isOpen, }) => {
            return (createElement(Menu, { isOpen: isOpen, getMenuProps: getMenuProps }, [
                isFetching || isCreatingTerm ? (createElement("div", { key: "loading-spinner", className: "fincommerce-attribute-term-field__loading-spinner" },
                    createElement(Spinner, null))) : null,
                ...items.map((item, menuIndex) => {
                    const isSelected = selectedTermSlugs.includes(item.slug);
                    return (createElement(MenuItem, { key: `${item.slug}`, index: menuIndex, isActive: highlightedIndex === menuIndex, item: item, getItemProps: getItemProps }, item.id !== -99 ? (createElement(CheckboxControl, { onChange: () => null, checked: isSelected, 
                        // @ts-expect-error The label prop can be a string, however, the final consumer of this prop accepts ReactNode.
                        label: createElement("span", null, item.name) })) : (createElement("div", { className: "fincommerce-attribute-term-field__add-new" },
                        createElement(Icon, { icon: plus, size: 20, className: "fincommerce-attribute-term-field__add-new-icon" }),
                        createElement("span", null, sprintf(
                        /* translators: The name of the new attribute term to be created */
                        __('Create "%s"', 'fincommerce'), item.name))))));
                }),
            ].filter((child) => child !== null)));
        }),
        !autoCreateOnSelect &&
            addNewAttributeTermName &&
            attributeId !== undefined && (createElement(CreateAttributeTermModal, { initialAttributeTermName: addNewAttributeTermName, onCancel: () => {
                setAddNewAttributeTermName(undefined);
                focusSelectControl();
            }, attributeId: attributeId, onCreated: (newAttribute) => {
                onSelect(newAttribute);
                setAddNewAttributeTermName(undefined);
                invalidateResolutionForStoreSelector('getProductAttributeTerms');
                focusSelectControl();
            } }))));
};
