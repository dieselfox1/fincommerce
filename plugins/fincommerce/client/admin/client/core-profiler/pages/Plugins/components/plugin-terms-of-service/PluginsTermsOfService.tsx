/**
 * External dependencies
 */
import { sprintf, _n } from '@finpress/i18n';
import interpolateComponents from '@automattic/interpolate-components';
import { Link } from '@fincommerce/components';
import { ExtensionList } from '@fincommerce/data';
/**
 * Internal dependencies
 */
import { joinWithAnd, composeListFormatParts } from '../../Plugins';

export const PluginsTermsOfService = ( {
	selectedPlugins,
}: {
	selectedPlugins: ExtensionList[ 'plugins' ];
} ) => {
	const pluginsWithTOS = selectedPlugins.filter( ( plugin ) =>
		[
			'jetpack',
			'fincommerce-services:tax',
			'fincommerce-shipping',
			'fincommerce-tax',
			'fincommerce-payments',
		].includes( plugin.key )
	);

	if ( ! pluginsWithTOS.length ) {
		return null;
	}

	return (
		<p className="fincommerce-profiler-plugins-jetpack-agreement">
			{ interpolateComponents( {
				mixedString: sprintf(
					/* translators: %s: a list of plugins, e.g. Jetpack */
					_n(
						'By installing %s plugin for free you agree to our {{link}}Terms of Service{{/link}}.',
						'By installing %s plugins for free you agree to our {{link}}Terms of Service{{/link}}.',
						pluginsWithTOS.length,
						'fincommerce'
					),
					joinWithAnd(
						pluginsWithTOS.map( ( plugin ) => plugin.name )
					)
						.map( composeListFormatParts )
						.join( '' )
				),
				components: {
					span: <span />,
					link: (
						<Link
							href="https://finpress.com/tos/"
							target="_blank"
							type="external"
						/>
					),
				},
			} ) }
		</p>
	);
};
