/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { BaseControl, Button, Modal, TextControl } from '@wordpress/components';
import { useState, useEffect, createElement, createInterpolateElement, useCallback, } from '@wordpress/element';
import { useDispatch } from '@wordpress/data';
import { __experimentalSelectTreeControl as SelectTree, } from '@fincommerce/components';
import { useDebounce, useInstanceId } from '@wordpress/compose';
import clsx from 'clsx';
import useTaxonomySearch from './use-taxonomy-search';
export const CreateTaxonomyModal = ({ onCancel, onCreate, initialName, slug, hierarchical, dialogNameHelpText, parentTaxonomyText, title, }) => {
    const [categoryParentTypedValue, setCategoryParentTypedValue] = useState('');
    const [allEntries, setAllEntries] = useState([]);
    const { searchEntity, isResolving } = useTaxonomySearch(slug);
    const searchDelayed = useDebounce(useCallback((val) => searchEntity(val || '').then(setAllEntries), []), 150);
    useEffect(() => {
        searchDelayed('');
    }, []);
    const { saveEntityRecord } = useDispatch('core');
    const [isCreating, setIsCreating] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [name, setName] = useState(initialName || '');
    const [parent, setParent] = useState(null);
    const onSave = async () => {
        setErrorMessage(null);
        setIsCreating(true);
        try {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const newTaxonomy = await saveEntityRecord('taxonomy', slug, {
                name,
                parent: parent ? parent.id : null,
            }, 
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            {
                throwOnError: true,
            });
            setIsCreating(false);
            onCreate(newTaxonomy);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }
        catch (e) {
            setIsCreating(false);
            if (e.message) {
                setErrorMessage(e.message);
            }
            else {
                setErrorMessage(__(`Failed to create taxonomy`, 'fincommerce'));
                throw e;
            }
        }
    };
    const id = useInstanceId(BaseControl, 'taxonomy_name');
    const selectId = useInstanceId(SelectTree, 'parent-taxonomy-select');
    return (createElement(Modal, { title: title, onRequestClose: onCancel, className: "fincommerce-create-new-taxonomy-modal" },
        createElement("div", { className: "fincommerce-create-new-taxonomy-modal__wrapper" },
            createElement(BaseControl, { id: id, label: __('Name', 'fincommerce'), help: errorMessage || dialogNameHelpText, className: clsx({
                    'has-error': errorMessage,
                }) },
                createElement(TextControl, { id: id, value: name, onChange: setName })),
            hierarchical && (createElement(SelectTree, { isLoading: isResolving, label: createInterpolateElement(`${parentTaxonomyText ||
                    __('Parent', 'fincommerce')} <optional/>`, {
                    optional: (createElement("span", { className: "fincommerce-create-new-taxonomy-modal__optional" }, __('(optional)', 'fincommerce'))),
                }), id: selectId, items: allEntries.map((taxonomy) => ({
                    label: taxonomy.name,
                    value: String(taxonomy.id),
                    parent: taxonomy.parent > 0
                        ? String(taxonomy.parent)
                        : undefined,
                })), shouldNotRecursivelySelect: true, selected: parent
                    ? {
                        value: String(parent.id),
                        label: parent.name,
                    }
                    : undefined, onSelect: (item) => item &&
                    setParent({
                        id: +item.value,
                        name: item.label,
                        parent: item.parent ? +item.parent : 0,
                    }), onRemove: () => setParent(null), onInputChange: (value) => {
                    searchDelayed(value);
                    setCategoryParentTypedValue(value || '');
                }, createValue: categoryParentTypedValue })),
            createElement("div", { className: "fincommerce-create-new-taxonomy-modal__buttons" },
                createElement(Button, { variant: "tertiary", onClick: onCancel, disabled: isCreating }, __('Cancel', 'fincommerce')),
                createElement(Button, { variant: "primary", disabled: name.length === 0 || isCreating, isBusy: isCreating, onClick: onSave }, __('Create', 'fincommerce'))))));
};
