/**
 * External dependencies
 */
import { useBlockProps } from '@finpress/block-editor';
import { AdditionalFieldsPlaceholder } from '@fincommerce/base-components/cart-checkout';
import { ADDRESS_FORM_FIELDS } from '@fincommerce/block-settings';

/**
 * Internal dependencies
 */
import '@fincommerce/block-library/assets/js/blocks/order-confirmation/billing-address/style.scss';

const Edit = (): JSX.Element => {
	const blockProps = useBlockProps( {
		className: 'wc-block-order-confirmation-billing-address',
	} );

	return (
		<div { ...blockProps }>
			<address>
				Test address 1<br />
				Test address 2<br />
				San Francisco, CA 94110
				<br />
				United States
				<AdditionalFieldsPlaceholder
					additionalFields={ ADDRESS_FORM_FIELDS }
				/>
			</address>
		</div>
	);
};

export default Edit;
