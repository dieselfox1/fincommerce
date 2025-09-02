/**
 * External dependencies
 */
import { Button } from '@finpress/components';
import { __ } from '@finpress/i18n';

export default function EditFulfillmentButton( {
	onClick,
}: {
	onClick: () => void;
} ) {
	return (
		<Button variant="secondary" onClick={ onClick } __next40pxDefaultSize>
			{ __( 'Edit fulfillment', 'fincommerce' ) }
		</Button>
	);
}
