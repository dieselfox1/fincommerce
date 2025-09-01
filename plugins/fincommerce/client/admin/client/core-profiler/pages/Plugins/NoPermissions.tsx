/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import clsx from 'clsx';

/**
 * Internal dependencies
 */
import { CoreProfilerStateMachineContext } from '../../index';
import {
	PluginsLearnMoreLinkClickedEvent,
	PluginsInstallationRequestedEvent,
	PluginsPageSkippedEvent,
} from '../../events';
import { Heading } from '../../components/heading/heading';
import { Navigation } from '../../components/navigation/navigation';
import { PluginCard } from './components/plugin-card/plugin-card';
import { PluginErrorBanner } from './components/plugin-error-banner/PluginErrorBanner';

/** Page to be shown when the user does not have permissions to install plugins */
export const NoPermissionsError = ( {
	context,
	navigationProgress,
	sendEvent,
}: {
	context: Pick<
		CoreProfilerStateMachineContext,
		'pluginsAvailable' | 'currentUser'
	>;
	sendEvent: (
		payload:
			| PluginsInstallationRequestedEvent
			| PluginsPageSkippedEvent
			| PluginsLearnMoreLinkClickedEvent
	) => void;
	navigationProgress: number;
} ) => {
	const skipPluginsPage = () => {
		return sendEvent( {
			type: 'PLUGINS_PAGE_SKIPPED',
		} );
	};

	const pluginsCardRowCount = Math.ceil(
		context.pluginsAvailable.length / 2
	);

	return (
		<div
			className="fincommerce-profiler-plugins"
			data-testid="core-profiler-plugins"
		>
			<Navigation
				percentage={ navigationProgress }
				onSkip={ skipPluginsPage }
			/>
			<div className="fincommerce-profiler-page__content fincommerce-profiler-plugins__content">
				<Heading
					className="fincommerce-profiler__stepper-heading"
					title={ __(
						'Get a boost with our free features',
						'fincommerce'
					) }
					subTitle={ __(
						'No commitment required – you can remove them at any time.',
						'fincommerce'
					) }
				/>

				<PluginErrorBanner
					pluginsInstallationPermissionsFailure={ true }
				/>

				<div
					className={ clsx(
						'fincommerce-profiler-plugins__list',
						`rows-${ pluginsCardRowCount }`
					) }
				>
					{ context.pluginsAvailable.map( ( plugin ) => {
						const {
							key: pluginSlug,
							learn_more_link: learnMoreLink,
						} = plugin;
						return (
							<PluginCard
								key={ pluginSlug }
								plugin={ plugin }
								checked={ false }
								disabled={ true }
							>
								{ learnMoreLink && (
									<PluginCard.LearnMoreLink
										onClick={ () => {
											sendEvent( {
												type: 'PLUGINS_LEARN_MORE_LINK_CLICKED',
												payload: {
													plugin: pluginSlug,
													learnMoreLink,
												},
											} );
										} }
									/>
								) }
							</PluginCard>
						);
					} ) }
				</div>
				<div
					className={ clsx(
						'fincommerce-profiler-plugins__footer',
						`rows-${ pluginsCardRowCount }`
					) }
				>
					<div className="fincommerce-profiler-plugins-continue-button-container">
						<Button
							className="fincommerce-profiler-plugins-continue-button"
							variant="primary"
							onClick={ skipPluginsPage }
						>
							{ __( 'Continue', 'fincommerce' ) }
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};
