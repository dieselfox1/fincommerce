/**
 * External dependencies
 */
import { useEntityProp } from '@wordpress/core-data';
import { createElement } from '@wordpress/element';
import { useWooBlockProps } from '@fincommerce/block-templates';
import { CatalogVisibility } from '../../../components/catalog-visibility';
export function Edit({ attributes, }) {
    const { label, visibility } = attributes;
    const blockProps = useWooBlockProps(attributes);
    const [catalogVisibility, setCatalogVisibility] = useEntityProp('postType', 'product', 'catalog_visibility');
    return (createElement("div", { ...blockProps },
        createElement(CatalogVisibility, { catalogVisibility: catalogVisibility, label: label, visibility: visibility, onCheckboxChange: setCatalogVisibility })));
}
