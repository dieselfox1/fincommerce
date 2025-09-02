/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import { PanelBody, RangeControl } from '@finpress/components';
import { useBlockProps, InspectorControls } from '@finpress/block-editor';
import { getSetting } from '@fincommerce/settings';
import Noninteractive from '@fincommerce/base-components/noninteractive';

/**
 * Internal dependencies
 */
import Block from '@fincommerce/block-library/assets/js/blocks/cart/inner-blocks/cart-cross-sells-products/block';
import '@fincommerce/block-library/assets/js/blocks/cart/inner-blocks/cart-cross-sells-products/editor.scss';

interface Attributes {
	className?: string;
	columns: number;
}

interface Props {
	attributes: Attributes;
	setAttributes: ( attributes: Record< string, unknown > ) => void;
}

export const Edit = ( { attributes, setAttributes }: Props ): JSX.Element => {
	const { className, columns } = attributes;
	const blockProps = useBlockProps();

	return (
		<div { ...blockProps }>
			<InspectorControls>
				<PanelBody title={ __( 'Settings', 'fincommerce' ) }>
					<RangeControl
						label={ __(
							'Cross-Sells products to show',
							'fincommerce'
						) }
						value={ columns }
						onChange={ ( value ) =>
							setAttributes( { columns: value } )
						}
						min={ getSetting( 'minColumns', 1 ) }
						max={ getSetting( 'maxColumns', 6 ) }
					/>
				</PanelBody>
			</InspectorControls>
			<Noninteractive>
				<Block columns={ columns } className={ className } />
			</Noninteractive>
		</div>
	);
};

export const Save = (): JSX.Element => {
	return <div { ...useBlockProps.save() } />;
};
