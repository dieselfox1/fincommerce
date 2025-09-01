/**
 * External dependencies
 */
import { useWooBlockProps } from '@fincommerce/block-templates';
import { Link } from '@fincommerce/components';
import { experimentalProductShippingClassesStore, } from '@fincommerce/data';
import { getNewPath } from '@fincommerce/navigation';
import { recordEvent } from '@fincommerce/tracks';
import { BaseControl, SelectControl } from '@wordpress/components';
import { useInstanceId } from '@wordpress/compose';
import { useSelect, useDispatch } from '@wordpress/data';
import { Fragment, createElement, createInterpolateElement, useState, } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { useEntityProp } from '@wordpress/core-data';
import { AddNewShippingClassModal } from '../../../components';
import { ADD_NEW_SHIPPING_CLASS_OPTION_VALUE } from '../../../constants';
export const DEFAULT_SHIPPING_CLASS_OPTIONS = [
    { value: '', label: __('No shipping class', 'fincommerce') },
    {
        value: ADD_NEW_SHIPPING_CLASS_OPTION_VALUE,
        label: __('Add new shipping class', 'fincommerce'),
    },
];
function mapShippingClassToSelectOption(shippingClasses) {
    return shippingClasses.map(({ slug, name }) => ({
        value: slug,
        label: name,
    }));
}
/*
 * Query to fetch shipping classes.
 */
const shippingClassRequestQuery = {};
function extractDefaultShippingClassFromProduct(categories, shippingClasses) {
    const category = categories?.find(({ slug }) => slug !== 'uncategorized');
    if (category &&
        !shippingClasses?.some(({ slug }) => slug === category.slug)) {
        return {
            name: category.name,
            slug: category.slug,
        };
    }
}
export function Edit({ attributes, context: { postType, isInSelectedTab }, }) {
    const [showShippingClassModal, setShowShippingClassModal] = useState(false);
    const blockProps = useWooBlockProps(attributes);
    const { createProductShippingClass } = useDispatch(experimentalProductShippingClassesStore);
    const { createErrorNotice } = useDispatch('core/notices');
    const [categories] = useEntityProp('postType', postType, 'categories');
    const [shippingClass, setShippingClass] = useEntityProp('postType', postType, 'shipping_class');
    const [virtual] = useEntityProp('postType', postType, 'virtual');
    function handleShippingClassServerError(error) {
        let message = __('We couldn’t add this shipping class. Try again in a few seconds.', 'fincommerce');
        if (error.code === 'term_exists') {
            message = __('A shipping class with that slug already exists.', 'fincommerce');
        }
        createErrorNotice(message, {
            explicitDismiss: true,
        });
        throw error;
    }
    const { shippingClasses } = useSelect((select) => {
        const { getProductShippingClasses } = select(experimentalProductShippingClassesStore);
        return {
            shippingClasses: (isInSelectedTab &&
                getProductShippingClasses(shippingClassRequestQuery)) ||
                [],
        };
    }, [isInSelectedTab]);
    const shippingClassControlId = useInstanceId(BaseControl, 'wp-block-fincommerce-product-shipping-class-field');
    return (createElement("div", { ...blockProps },
        createElement("div", { className: "wp-block-columns" },
            createElement("div", { className: "wp-block-column" },
                createElement(SelectControl, { id: shippingClassControlId, name: "shipping_class", value: shippingClass, onChange: (value) => {
                        if (value === ADD_NEW_SHIPPING_CLASS_OPTION_VALUE) {
                            setShowShippingClassModal(true);
                            return;
                        }
                        setShippingClass(value);
                    }, label: __('Shipping class', 'fincommerce'), options: [
                        ...DEFAULT_SHIPPING_CLASS_OPTIONS,
                        ...mapShippingClassToSelectOption(shippingClasses ?? []),
                    ], disabled: attributes.disabled || virtual, help: createInterpolateElement(__('Manage shipping classes and rates in <Link>global settings</Link>.', 'fincommerce'), {
                        Link: (createElement(Link, { href: getNewPath({
                                tab: 'shipping',
                                section: 'classes',
                            }, '', {}, 'wc-settings'), target: "_blank", type: "external", onClick: () => {
                                recordEvent('product_shipping_global_settings_link_click');
                            } },
                            createElement(Fragment, null))),
                    }) })),
            createElement("div", { className: "wp-block-column" })),
        showShippingClassModal && (createElement(AddNewShippingClassModal, { shippingClass: extractDefaultShippingClassFromProduct(categories, shippingClasses), onAdd: (shippingClassValues) => createProductShippingClass(shippingClassValues, {
                optimisticQueryUpdate: shippingClassRequestQuery,
            })
                .then((value) => {
                recordEvent('product_new_shipping_class_modal_add_button_click');
                setShippingClass(value.slug);
                return value;
            })
                .catch(handleShippingClassServerError), onCancel: () => setShowShippingClassModal(false) }))));
}
