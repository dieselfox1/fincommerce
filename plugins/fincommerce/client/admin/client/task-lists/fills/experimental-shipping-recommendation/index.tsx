/**
 * External dependencies
 */
import { optionsStore, pluginsStore, settingsStore } from '@fincommerce/data';
import { withSelect } from '@finpress/data';
import { registerPlugin } from '@finpress/plugins';
import { WooOnboardingTask } from '@fincommerce/onboarding';
import { compose } from '@finpress/compose';
import type { SelectFunction } from '@finpress/data/build-types/types';
/**
 * Internal dependencies
 */
import { ShippingRecommendation } from './shipping-recommendation';
import { TaskProps } from './types';

const ShippingRecommendationWrapper = compose(
	withSelect( ( select: SelectFunction ) => {
		const { getSettings } = select( settingsStore );
		const { hasFinishedResolution } = select( optionsStore );
		const { getActivePlugins } = select( pluginsStore );

		return {
			activePlugins: getActivePlugins(),
			generalSettings: getSettings( 'general' )?.general,
			isJetpackConnected: select( pluginsStore ).isJetpackConnected(),
			isResolving:
				! hasFinishedResolution( 'getOption', [
					'fincommerce_setup_jetpack_opted_in',
				] ) ||
				! hasFinishedResolution( 'getOption', [
					'wcshipping_options',
				] ) ||
				! select( pluginsStore ).hasFinishedResolution(
					'isJetpackConnected',
					[]
				),
		};
	} )
)( ShippingRecommendation ) as React.ComponentType< TaskProps >;

registerPlugin( 'wc-admin-onboarding-task-shipping-recommendation', {
	scope: 'fincommerce-tasks',
	render: () => (
		<WooOnboardingTask id="shipping-recommendation">
			{ ( { onComplete, query, task } ) => (
				<ShippingRecommendationWrapper
					onComplete={ onComplete }
					query={ query }
					task={ task }
				/>
			) }
		</WooOnboardingTask>
	),
} );
