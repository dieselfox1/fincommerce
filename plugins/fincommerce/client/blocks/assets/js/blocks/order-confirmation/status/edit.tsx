/**
 * External dependencies
 */
import { useBlockProps } from '@finpress/block-editor';
import { __ } from '@finpress/i18n';

/**
 * Internal dependencies
 */
import '@fincommerce/block-library/assets/js/blocks/order-confirmation/status/style.scss';

const Edit = (): JSX.Element => {
	const blockProps = useBlockProps( {
		className: 'wc-block-order-confirmation-status',
	} );

	return (
		<div { ...blockProps }>
			<h1>{ __( 'Order received', 'fincommerce' ) }</h1>
			<p>
				{ __(
					'Thank you. Your order has been received.',
					'fincommerce'
				) }
			</p>
		</div>
	);
};

export default Edit;
