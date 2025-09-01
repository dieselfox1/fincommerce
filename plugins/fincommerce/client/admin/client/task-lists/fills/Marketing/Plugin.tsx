/**
 * External dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { getAdminLink } from '@fincommerce/settings';
import { recordEvent } from '@fincommerce/tracks';
import { Text } from '@fincommerce/experimental';
import { Pill } from '@fincommerce/components';
import { type TagsSlug } from '@fincommerce/data';

/**
 * Internal dependencies
 */
import './Plugin.scss';

export type PluginProps = {
	isActive: boolean;
	isBusy?: boolean;
	isBuiltByWC: boolean;
	isDisabled?: boolean;
	isInstalled: boolean;
	description?: string;
	installAndActivate?: ( slug: string ) => void;
	onManage?: ( slug: string ) => void;
	imageUrl?: string;
	manageUrl?: string;
	name: string;
	slug: string;
	tags?: TagsSlug[];
	learnMoreLink?: string;
	installExternal?: boolean;
};

const tagsToPillsMap = {
	marketplace: __( 'Marketplace', 'fincommerce' ),
};

export const Plugin = ( {
	description,
	imageUrl,
	installAndActivate = () => {},
	onManage = () => {},
	isActive,
	isBusy,
	isBuiltByWC,
	isDisabled,
	isInstalled,
	manageUrl,
	name,
	slug,
	tags,
	learnMoreLink = '',
	installExternal = false,
}: PluginProps ) => {
	return (
		<div className="fincommerce-plugin-list__plugin">
			{ imageUrl && (
				<div className="fincommerce-plugin-list__plugin-logo">
					<img
						src={ imageUrl }
						alt={ sprintf(
							/* translators: %s = name of the plugin */
							__( '%s logo', 'fincommerce' ),
							name
						) }
					/>
				</div>
			) }
			<div className="fincommerce-plugin-list__plugin-text">
				<Text variant="subtitle.small" as="h4">
					{ name }
					{ isBuiltByWC && (
						<Pill>
							{ __( 'Built by FinCommerce', 'fincommerce' ) }
						</Pill>
					) }
					{ tags?.map(
						( tag ) =>
							tagsToPillsMap[ tag ] && (
								<Pill key={ tag }>
									{ tagsToPillsMap[ tag ] }
								</Pill>
							)
					) }
				</Text>
				<Text variant="subtitle.small">{ description }</Text>
			</div>
			<div className="fincommerce-plugin-list__plugin-action">
				{ isActive && manageUrl && (
					<Button
						disabled={ isDisabled }
						isBusy={ isBusy }
						variant="secondary"
						href={ getAdminLink( manageUrl ) }
						onClick={ () => {
							recordEvent( 'marketing_manage', {
								extension_name: slug,
							} );
							onManage( slug );
						} }
					>
						{ __( 'Manage', 'fincommerce' ) }
					</Button>
				) }
				{ isInstalled && ! isActive && (
					<Button
						disabled={ isDisabled }
						isBusy={ isBusy }
						variant="secondary"
						onClick={ () => installAndActivate( slug ) }
					>
						{ __( 'Activate', 'fincommerce' ) }
					</Button>
				) }
				{ ! isInstalled && ! installExternal && (
					<Button
						disabled={ isDisabled }
						isBusy={ isBusy }
						variant="secondary"
						onClick={ () => {
							installAndActivate( slug );
						} }
					>
						{ __( 'Get started', 'fincommerce' ) }
					</Button>
				) }
				{ ! isInstalled && installExternal && (
					<>
						{ learnMoreLink ? (
							<Button
								disabled={ isDisabled }
								isBusy={ isBusy }
								variant="secondary"
								onClick={ () => {
									window.open( learnMoreLink, '_blank' );
								} }
							>
								{ __( 'View extension', 'fincommerce' ) }
							</Button>
						) : (
							<Button disabled={ true } variant="secondary">
								{ __( 'View extension', 'fincommerce' ) }
							</Button>
						) }
					</>
				) }
			</div>
		</div>
	);
};
