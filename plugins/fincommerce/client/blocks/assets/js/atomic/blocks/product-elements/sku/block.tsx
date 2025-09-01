/**
 * External dependencies
 */
import clsx from 'clsx';
import {
	useInnerBlockLayoutContext,
	useProductDataContext,
} from '@fincommerce/shared-context';
import { withProductDataContext } from '@fincommerce/shared-hocs';
import type { HTMLAttributes } from 'react';
import { useStyleProps } from '@fincommerce/base-hooks';
import { RichText } from '@wordpress/block-editor';
import type { BlockEditProps } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/sku/style.scss';
import type { Attributes } from '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/sku/types';

type Props = BlockEditProps< Attributes > &
	HTMLAttributes< HTMLDivElement > & {
		isDescendantOfAllProducts: boolean;
		isDescendentOfSingleProductTemplate: boolean;
	};

const Preview = ( {
	setAttributes,
	parentClassName,
	sku,
	className,
	style,
	prefix,
	suffix,
}: {
	setAttributes: ( attributes: Record< string, unknown > ) => void;
	parentClassName: string;
	sku: string;
	className?: string | undefined;
	style?: React.CSSProperties | undefined;
	prefix?: string;
	suffix?: string;
} ) => (
	<div
		className={ clsx( className, 'wp-block-post-terms', {
			[ `${ parentClassName }__product-sku` ]: parentClassName,
		} ) }
		style={ style }
	>
		<RichText
			className="wc-block-components-product-sku__prefix"
			tagName="span"
			placeholder={ __( 'Prefix', 'fincommerce' ) }
			value={ prefix }
			onChange={ ( value ) => setAttributes( { prefix: value } ) }
		/>
		<span> { sku }</span>
		<RichText
			className="wc-block-components-product-sku__suffix"
			tagName="span"
			placeholder={ ' ' + __( 'Suffix', 'fincommerce' ) }
			value={ suffix }
			onChange={ ( value ) => setAttributes( { suffix: value } ) }
		/>
	</div>
);

const Block = ( props: Props ): JSX.Element | null => {
	const { className } = props;
	const styleProps = useStyleProps( props );
	const { parentClassName } = useInnerBlockLayoutContext();
	const { product } = useProductDataContext();
	const sku = product.sku;

	if ( props.isDescendentOfSingleProductTemplate ) {
		return (
			<Preview
				setAttributes={ props.setAttributes }
				parentClassName={ parentClassName }
				className={ className }
				sku={ __( 'Product SKU', 'fincommerce' ) }
				prefix={ props.prefix }
				suffix={ props.suffix }
			/>
		);
	}

	if ( ! sku ) {
		return null;
	}

	return (
		<Preview
			setAttributes={ props.setAttributes }
			className={ className }
			parentClassName={ parentClassName }
			sku={ sku }
			prefix={ props.prefix }
			suffix={ props.suffix }
			{ ...( props.isDescendantOfAllProducts && {
				className: clsx(
					className,
					'wc-block-components-product-sku wp-block-fincommerce-product-sku',
					styleProps.className
				),
				style: {
					...styleProps.style,
				},
			} ) }
		/>
	);
};

export default withProductDataContext( Block );
