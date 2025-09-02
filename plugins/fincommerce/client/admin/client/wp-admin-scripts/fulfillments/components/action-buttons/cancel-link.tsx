/**
 * External dependencies
 */
import { Button } from '@finpress/components';
import { __ } from '@finpress/i18n';

/**
 * Internal dependencies
 */

export default function CancelLink( { onClick }: { onClick: () => void } ) {
	return (
		<Button
			variant="link"
			onClick={ onClick }
			style={ { flex: 1 } }
			__next40pxDefaultSize
		>
			{ __( 'Cancel', 'fincommerce' ) }
		</Button>
	);
}
