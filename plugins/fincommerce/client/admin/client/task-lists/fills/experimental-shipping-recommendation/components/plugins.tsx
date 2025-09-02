/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import { Plugins as PluginInstaller } from '@fincommerce/components';
import { optionsStore, InstallPluginsResponse } from '@fincommerce/data';
import { recordEvent } from '@fincommerce/tracks';
import { useDispatch, useSelect } from '@finpress/data';
import { useEffect } from '@finpress/element';

/**
 * Internal dependencies
 */
import { createNoticesFromResponse } from '~/lib/notices';
import { TermsOfService } from '~/task-lists/components/terms-of-service';

const isWcShippingOptions = (
	wcShippingOptions: unknown
): wcShippingOptions is {
	[ key: string ]: unknown;
} => typeof wcShippingOptions === 'object' && wcShippingOptions !== null;

type Props = {
	nextStep: () => void;
	pluginsToActivate: string[];
};

export const Plugins = ( { nextStep, pluginsToActivate }: Props ) => {
	const { updateOptions } = useDispatch( optionsStore );
	const { isResolving, tosAccepted } = useSelect( ( select ) => {
		const { getOption, hasFinishedResolution } = select( optionsStore );
		const wcShippingOptions = getOption( 'wcshipping_options' );

		return {
			isResolving:
				! hasFinishedResolution( 'getOption', [
					'fincommerce_setup_jetpack_opted_in',
				] ) ||
				! hasFinishedResolution( 'getOption', [
					'wcshipping_options',
				] ),
			tosAccepted:
				( isWcShippingOptions( wcShippingOptions ) &&
					wcShippingOptions?.tos_accepted ) ||
				getOption( 'fincommerce_setup_jetpack_opted_in' ) === '1',
		};
	}, [] );

	useEffect( () => {
		if ( ! tosAccepted || pluginsToActivate.length ) {
			return;
		}

		nextStep();
	}, [ nextStep, pluginsToActivate, tosAccepted ] );

	if ( isResolving ) {
		return null;
	}

	return (
		<>
			{ ! tosAccepted && (
				<TermsOfService
					buttonText={ __( 'Install & enable', 'fincommerce' ) }
				/>
			) }
			<PluginInstaller
				onComplete={ (
					activatedPlugins: string[],
					response: InstallPluginsResponse
				) => {
					createNoticesFromResponse( response );
					recordEvent(
						'tasklist_shipping_recommendation_install_extensions',
						{
							install_extensions: true,
						}
					);
					updateOptions( {
						fincommerce_setup_jetpack_opted_in: true,
					} );
					nextStep();
				} }
				onError={ ( errors: unknown, response: unknown ) =>
					createNoticesFromResponse( response )
				}
				pluginSlugs={ pluginsToActivate }
			/>
		</>
	);
};
