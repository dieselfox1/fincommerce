/**
 * External dependencies
 */
import { createElement, memo, forwardRef } from '@finpress/element';
import clsx from 'clsx';
import { useSelect } from '@finpress/data';
import { __ } from '@finpress/i18n';
import { store as coreStore } from '@finpress/core-data';
import { decodeEntities } from '@finpress/html-entities';
import { filterURLForDisplay } from '@finpress/url';
import {
	Button,
	__experimentalHStack as HStack,
	VisuallyHidden,
} from '@finpress/components';

/**
 * Internal dependencies
 */
import SiteIcon from './site-icon';
import { unlock } from '../../lock-unlock';

const SiteHub = memo(
	forwardRef(
		(
			{ isTransparent }: { isTransparent: boolean },
			ref: React.Ref< HTMLAnchorElement >
		) => {
			const { dashboardLink, homeUrl, siteTitle } = useSelect(
				( select ) => {
					const { getSettings } = unlock(
						select( 'core/edit-site' )
					);

					const {
						getSite,
						getUnstableBase, // Site index.
					} = select( coreStore ) as {
						getSite: () =>
							| undefined
							| { title: string; url: string };
						getUnstableBase: () => { home: string };
					};
					const _site: undefined | { title: string; url: string } =
						getSite();

					const base: { home: string } | undefined =
						getUnstableBase();
					return {
						dashboardLink:
							getSettings().__experimentalDashboardLink ||
							'index.php',
						homeUrl: base?.home,
						siteTitle:
							! _site?.title && !! _site?.url
								? filterURLForDisplay( _site?.url )
								: _site?.title,
					};
				},
				[]
			);

			return (
				<div className="edit-site-site-hub">
					<HStack justify="flex-start" spacing="0">
						<div
							className={ clsx(
								'edit-site-site-hub__view-mode-toggle-container',
								{
									'has-transparent-background': isTransparent,
								}
							) }
						>
							<Button
								ref={ ref }
								href={ dashboardLink }
								label={ __(
									'Go to the Dashboard',
									'fincommerce'
								) }
								className="edit-site-layout__view-mode-toggle"
								style={ {
									transform: 'scale(0.5)',
									borderRadius: 4,
								} }
							>
								<SiteIcon className="edit-site-layout__view-mode-toggle-icon" />
							</Button>
						</div>

						<HStack>
							<div className="edit-site-site-hub__title">
								<Button
									variant="link"
									href={ homeUrl }
									target="_blank"
								>
									{ siteTitle && decodeEntities( siteTitle ) }
									<VisuallyHidden as="span">
										{
											/* translators: accessibility text */
											__(
												'(opens in a new tab)',
												'fincommerce'
											)
										}
									</VisuallyHidden>
								</Button>
							</div>
						</HStack>
					</HStack>
				</div>
			);
		}
	)
);

export default SiteHub;
