/**
 * External dependencies
 */
import { createElement } from '@wordpress/element';
import { Card, CardBody } from '@wordpress/components';
/**
 * Internal dependencies
 */
import { ProductSectionLayout } from './product-section-layout';
import { WooProductFieldItem } from '../woo-product-field-item';
export const ProductFieldSection = ({ id, title, description, className, children, }) => (createElement(ProductSectionLayout, { title: title, description: description, className: className },
    createElement(Card, null,
        createElement(CardBody, null,
            children,
            createElement(WooProductFieldItem.Slot, { section: id })))));
