"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributeTermInputField = void 0;
/**
 * External dependencies
 */
const i18n_1 = require("@wordpress/i18n");
const components_1 = require("@wordpress/components");
const data_1 = require("@wordpress/data");
const element_1 = require("@wordpress/element");
const tracks_1 = require("@fincommerce/tracks");
const compose_1 = require("@wordpress/compose");
const icons_1 = require("@wordpress/icons");
const data_2 = require("@fincommerce/data");
const components_2 = require("@fincommerce/components");
const url_1 = require("@wordpress/url");
/**
 * Internal dependencies
 */
const create_attribute_term_modal_1 = require("./create-attribute-term-modal");
const constants_1 = require("../../constants");
let uniqueId = 0;
const AttributeTermInputField = ({ value = [], onChange, placeholder, disabled, attributeId, label = '', autoCreateOnSelect = true, readOnlyWhenClosed = false, }) => {
    const attributeTermInputId = (0, element_1.useRef)(`fincommerce-attribute-term-field-${++uniqueId}`);
    const [fetchedItems, setFetchedItems] = (0, element_1.useState)([]);
    const [isFetching, setIsFetching] = (0, element_1.useState)(false);
    const [isCreatingTerm, setIsCreatingTerm] = (0, element_1.useState)(false);
    const [addNewAttributeTermName, setAddNewAttributeTermName] = (0, element_1.useState)();
    const { createNotice } = (0, data_1.useDispatch)('core/notices');
    const { createProductAttributeTerm, invalidateResolutionForStoreSelector } = (0, data_1.useDispatch)(data_2.experimentalProductAttributeTermsStore);
    const fetchItems = (0, element_1.useCallback)((searchString) => {
        setIsFetching(true);
        return (0, data_1.resolveSelect)(data_2.experimentalProductAttributeTermsStore)
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
    const debouncedSearch = (0, compose_1.useDebounce)(fetchItems, 250);
    (0, element_1.useEffect)(() => {
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
        (0, tracks_1.recordEvent)('product_attribute_term_add', {
            source: constants_1.TRACKS_SOURCE,
        });
        setIsCreatingTerm(true);
        try {
            const newAttribute = await createProductAttributeTerm({
                ...attribute,
                attribute_id: attributeId,
            });
            (0, tracks_1.recordEvent)('product_attribute_term_add_success', {
                source: constants_1.TRACKS_SOURCE,
            });
            onChange([...value, newAttribute]);
            invalidateResolutionForStoreSelector('getProductAttributeTerms');
            setIsCreatingTerm(false);
        }
        catch (err) {
            let error = {
                source: constants_1.TRACKS_SOURCE,
                code: 'Unknown error.',
                message: 'An unknown error occurred.',
            };
            let noticeMessage = (0, i18n_1.__)('Failed to create attribute term.', 'fincommerce');
            const errorResponse = err;
            if (errorResponse?.code && errorResponse?.message) {
                error = {
                    ...error,
                    code: errorResponse.code,
                    message: errorResponse.message,
                };
                if (errorResponse.code === 'term_exists') {
                    noticeMessage = (0, i18n_1.__)('Attribute term already exists.', 'fincommerce');
                }
            }
            (0, tracks_1.recordEvent)('product_attribute_term_add_failed', error);
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
                    slug: (0, url_1.cleanForSlug)(item.name),
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
    return ((0, element_1.createElement)(element_1.Fragment, null,
        (0, element_1.createElement)(components_2.__experimentalSelectControl, { items: fetchedItems, multiple: true, disabled: disabled || !attributeId, label: label, getFilteredItems: (allItems, inputValue) => {
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
                    case components_2.selectControlStateChangeTypes.ControlledPropUpdatedSelectedItem:
                        const listIsOpen = isCreatingTerm
                            ? { isOpen: isCreatingTerm }
                            : {};
                        return {
                            ...changes,
                            ...listIsOpen,
                            inputValue: state.inputValue,
                        };
                    case components_2.selectControlStateChangeTypes.ItemClick:
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
            return ((0, element_1.createElement)(components_2.__experimentalSelectControlMenu, { isOpen: isOpen, getMenuProps: getMenuProps }, [
                isFetching || isCreatingTerm ? ((0, element_1.createElement)("div", { key: "loading-spinner", className: "fincommerce-attribute-term-field__loading-spinner" },
                    (0, element_1.createElement)(components_1.Spinner, null))) : null,
                ...items.map((item, menuIndex) => {
                    const isSelected = selectedTermSlugs.includes(item.slug);
                    return ((0, element_1.createElement)(components_2.__experimentalSelectControlMenuItem, { key: `${item.slug}`, index: menuIndex, isActive: highlightedIndex === menuIndex, item: item, getItemProps: getItemProps }, item.id !== -99 ? ((0, element_1.createElement)(components_1.CheckboxControl, { onChange: () => null, checked: isSelected, 
                        // @ts-expect-error The label prop can be a string, however, the final consumer of this prop accepts ReactNode.
                        label: (0, element_1.createElement)("span", null, item.name) })) : ((0, element_1.createElement)("div", { className: "fincommerce-attribute-term-field__add-new" },
                        (0, element_1.createElement)(components_1.Icon, { icon: icons_1.plus, size: 20, className: "fincommerce-attribute-term-field__add-new-icon" }),
                        (0, element_1.createElement)("span", null, (0, i18n_1.sprintf)(
                        /* translators: The name of the new attribute term to be created */
                        (0, i18n_1.__)('Create "%s"', 'fincommerce'), item.name))))));
                }),
            ].filter((child) => child !== null)));
        }),
        !autoCreateOnSelect &&
            addNewAttributeTermName &&
            attributeId !== undefined && ((0, element_1.createElement)(create_attribute_term_modal_1.CreateAttributeTermModal, { initialAttributeTermName: addNewAttributeTermName, onCancel: () => {
                setAddNewAttributeTermName(undefined);
                focusSelectControl();
            }, attributeId: attributeId, onCreated: (newAttribute) => {
                onSelect(newAttribute);
                setAddNewAttributeTermName(undefined);
                invalidateResolutionForStoreSelector('getProductAttributeTerms');
                focusSelectControl();
            } }))));
};
exports.AttributeTermInputField = AttributeTermInputField;
