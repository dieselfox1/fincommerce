/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import { Disabled, Placeholder } from '@finpress/components';
import ServerSideRender from '@finpress/server-side-render';
import { gridBlockPreview } from '@fincommerce/resource-previews';
import { Icon, percent } from '@finpress/icons';
import { useBlockProps } from '@finpress/block-editor';

/**
 * Internal dependencies
 */
import { Attributes } from '@fincommerce/block-library/assets/js/blocks/product-on-sale/types';
import { ProductOnSaleInspectorControls } from '@fincommerce/block-library/assets/js/blocks/product-on-sale/inspector-controls';

interface Props {
	attributes: Attributes;
	setAttributes: ( attributes: Record< string, unknown > ) => void;
	name: string;
}

const EmptyPlaceholder = () => (
	<Placeholder
		icon={ <Icon icon={ percent } /> }
		label={ __( 'On Sale Products', 'fincommerce' ) }
		className="wc-block-product-on-sale"
	>
		{ __(
			'This block shows on-sale products. There are currently no discounted products in your store.',
			'fincommerce'
		) }
	</Placeholder>
);

/**
 * Component to handle edit mode of "On Sale Products".
 */
const ProductOnSaleBlock: React.FunctionComponent< Props > = (
	props: Props
) => {
	const { attributes, setAttributes, name } = props;
	const blockProps = useBlockProps();

	if ( attributes.isPreview ) {
		return <div { ...blockProps }>{ gridBlockPreview }</div>;
	}

	return (
		<div { ...blockProps }>
			<ProductOnSaleInspectorControls
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>
			<Disabled>
				<ServerSideRender
					block={ name }
					attributes={ attributes }
					EmptyResponsePlaceholder={ EmptyPlaceholder }
				/>
			</Disabled>
		</div>
	);
};

export default ProductOnSaleBlock;
