/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import { useBlockProps, PlainText } from '@finpress/block-editor';
import { BlockEditProps } from '@finpress/blocks';

const arrowMap = {
	none: '',
	arrow: '→',
	chevron: '»',
};

type Props = BlockEditProps< { label: string } > & {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	context: { 'reviews/paginationArrow': string };
};

export default function Edit( {
	attributes: { label },
	setAttributes,
	context: { 'reviews/paginationArrow': paginationArrow },
}: Props ) {
	const displayArrow = arrowMap[ paginationArrow as keyof typeof arrowMap ];
	return (
		<a
			href="#reviews-pagination-next-pseudo-link"
			onClick={ ( event ) => event.preventDefault() }
			{ ...useBlockProps() }
		>
			<PlainText
				__experimentalVersion={ 2 }
				tagName="span"
				aria-label={ __( 'Newer reviews page link', 'fincommerce' ) }
				placeholder={ __( 'Newer Reviews', 'fincommerce' ) }
				value={ label }
				onChange={ ( newLabel ) =>
					setAttributes( { label: newLabel } )
				}
			/>
			{ displayArrow && (
				<span
					className={ `wp-block-fincommerce-product-reviews-pagination-next-arrow is-arrow-${ paginationArrow }` }
				>
					{ displayArrow }
				</span>
			) }
		</a>
	);
}
