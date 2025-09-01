/**
 * External dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

export interface Attributes {
	className?: string;
}

const Edit = () => {
	const blockProps = useBlockProps( {
		className: 'fincommerce wc-block-product-results-count',
	} );

	return (
		<div { ...blockProps }>
			<p className="fincommerce-result-count">
				{ __( 'Showing 1-X of X results', 'fincommerce' ) }
			</p>
		</div>
	);
};

export default Edit;
