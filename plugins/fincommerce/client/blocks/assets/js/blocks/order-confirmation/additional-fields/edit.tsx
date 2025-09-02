/**
 * External dependencies
 */
import { useBlockProps } from '@finpress/block-editor';
import {
	ORDER_FORM_FIELDS,
	CONTACT_FORM_FIELDS,
} from '@fincommerce/block-settings';
import { AdditionalFieldsPlaceholder } from '@fincommerce/base-components/cart-checkout';

/**
 * Internal dependencies
 */
import '@fincommerce/block-library/assets/js/blocks/order-confirmation/additional-fields/style.scss';

const Edit = (): JSX.Element => {
	const blockProps = useBlockProps( {
		className: 'wc-block-order-confirmation-additional-fields',
	} );

	const additionalFields = {
		...ORDER_FORM_FIELDS,
		...CONTACT_FORM_FIELDS,
	};

	return (
		<div { ...blockProps }>
			<AdditionalFieldsPlaceholder
				additionalFields={ additionalFields }
			/>
		</div>
	);
};

export default Edit;
