/**
 * External dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import '@fincommerce/block-library/assets/js/blocks/order-confirmation/additional-information/style.scss';

const Edit = (): JSX.Element => {
	const blockProps = useBlockProps( {
		className: 'wc-block-order-confirmation-additional-information',
	} );

	return (
		<div { ...blockProps }>
			<div className="wc-block-order-confirmation-additional-information-placeholder">
				{ __( 'Additional Information for your order', 'fincommerce' ) }
			</div>
		</div>
	);
};

export default Edit;
