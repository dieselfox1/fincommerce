/**
 * External dependencies
 */
import { recordEvent } from '@fincommerce/tracks';

/**
 * Internal dependencies
 */
import { default as ConnectForm } from '~/dashboard/components/connect';

type ConnectProps = {
	onConnect?: () => void;
};

export const Connect = ( { onConnect }: ConnectProps ) => {
	return (
		// @ts-expect-error TODO: convert ConnectForm to TypeScript
		<ConnectForm
			from="fincommerce-shipping"
			onConnect={ () => {
				recordEvent( 'tasklist_shipping_recommendation_connect_store', {
					connect: true,
				} );
				onConnect?.();
			} }
		/>
	);
};
