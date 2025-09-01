/**
 * External dependencies
 */
import {
	createSlotFill,
	ToggleControl,
	RadioControl,
	Button,
} from '@wordpress/components';
import {
	useState,
	createInterpolateElement,
	createElement,
	useEffect,
	useRef,
} from '@wordpress/element';
import { registerPlugin, getPlugin } from '@wordpress/plugins';
import { __ } from '@wordpress/i18n';
import clsx from 'clsx';
import { useCopyToClipboard } from '@wordpress/compose';
import { recordEvent } from '@fincommerce/tracks';
import { getSetting, getAdminLink } from '@fincommerce/settings';
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

/**
 * Internal dependencies
 */
import { SETTINGS_SLOT_FILL_CONSTANT } from '../../settings/settings-slots';
import './style.scss';
import { SITE_VISIBILITY_DOC_LINK } from '../constants';
import { ConfirmationModal } from './components/confirmation-modal';

const { Fill } = createSlotFill( SETTINGS_SLOT_FILL_CONSTANT );
const PLUGIN_ID = 'fincommerce-admin-site-visibility-settings-slotfill';

const SiteVisibility = () => {
	const setting = window?.wcSettings?.admin?.siteVisibilitySettings || {};
	const shareKey = setting?.fincommerce_share_key;

	const [ comingSoon, setComingSoon ] = useState(
		setting?.fincommerce_coming_soon || 'no'
	);
	const [ storePagesOnly, setStorePagesOnly ] = useState(
		setting?.fincommerce_store_pages_only || 'no'
	);
	const [ privateLink, setPrivateLink ] = useState(
		setting?.fincommerce_private_link || 'no'
	);
	const formRef = useRef( null );
	const saveButtonRef = useRef( null );

	const comingSoonTemplateId = useSelect( ( select ) => {
		return select( coreStore ).getDefaultTemplateId( {
			slug: 'coming-soon',
		} );
	}, [] );

	useEffect( () => {
		const saveButton = document.getElementsByClassName(
			'fincommerce-save-button'
		)[ 0 ];
		if ( saveButton ) {
			saveButtonRef.current = saveButton;
		}
		const form = document.querySelector( '#mainform' );
		if ( form ) {
			formRef.current = form;
		}
	}, [] );

	useEffect( () => {
		const initValues = {
			comingSoon: setting.fincommerce_coming_soon,
			storePagesOnly: setting.fincommerce_store_pages_only,
			privateLink: setting.fincommerce_private_link || 'no',
		};

		const currentValues = { comingSoon, storePagesOnly, privateLink };
		const saveButton = document.getElementsByClassName(
			'fincommerce-save-button'
		)[ 0 ];
		if ( saveButton ) {
			saveButton.disabled =
				initValues.comingSoon === currentValues.comingSoon &&
				initValues.storePagesOnly === currentValues.storePagesOnly &&
				initValues.privateLink === currentValues.privateLink;
		}
	}, [ comingSoon, storePagesOnly, privateLink ] );

	const copyLink = __( 'Copy link', 'fincommerce' );
	const copied = __( 'Copied!', 'fincommerce' );
	const [ copyLinkText, setCopyLinkText ] = useState( copyLink );

	const getPrivateLink = () => {
		const settings = window?.wcSettings;
		const homeUrl = settings?.homeUrl;
		const urlObject = new URL( homeUrl );

		if ( storePagesOnly === 'yes' ) {
			const shopPermalink =
				settings?.admin?.siteVisibilitySettings?.shop_permalink;
			if ( shopPermalink ) {
				urlObject.href = shopPermalink;
			}
		}

		const params = new URLSearchParams( urlObject.search );
		params.set( 'woo-share', shareKey );
		urlObject.search = params.toString();

		return urlObject.toString();
	};

	const copyClipboardRef = useCopyToClipboard( getPrivateLink, () => {
		setCopyLinkText( copied );
		setTimeout( () => {
			setCopyLinkText( copyLink );
		}, 2000 );
	} );

	return (
		<div className="site-visibility-settings-slotfill">
			<input
				type="hidden"
				value={ comingSoon }
				name="fincommerce_coming_soon"
			/>
			<input
				type="hidden"
				value={ storePagesOnly }
				name="fincommerce_store_pages_only"
			/>
			<input
				type="hidden"
				value={ privateLink }
				name="fincommerce_private_link"
			/>
			<h2>{ __( 'Site visibility', 'fincommerce' ) }</h2>
			<p className="site-visibility-settings-slotfill-description">
				{ createInterpolateElement(
					__(
						'Manage how your site appears to visitors. <a>Learn more</a>',
						'fincommerce'
					),
					{
						a: createElement( 'a', {
							target: '_blank',
							rel: 'noreferrer',
							href: SITE_VISIBILITY_DOC_LINK,
						} ),
					}
				) }
			</p>
			<div className="site-visibility-settings-slotfill-section">
				<RadioControl
					onChange={ () => {
						setComingSoon( 'yes' );
						recordEvent( 'site_visibility_toggle', {
							status: 'coming_soon',
						} );
					} }
					options={ [
						{
							label: __( 'Coming soon', 'fincommerce' ),
							value: 'yes',
						},
					] }
					selected={ comingSoon }
				/>
				<p className="site-visibility-settings-slotfill-section-description">
					{ getSetting( 'currentThemeIsFSETheme' )
						? createInterpolateElement(
								__(
									'Your site is hidden from visitors behind a “Coming soon” landing page until it’s ready for viewing. You can customize your “Coming soon” landing page via the <a>Editor</a>.',
									'fincommerce'
								),
								{
									a: createElement( 'a', {
										target: '_blank',
										href: comingSoonTemplateId
											? getAdminLink(
													`site-editor.php?postType=wp_template&postId=${ comingSoonTemplateId }&canvas=edit`
											  )
											: getAdminLink( 'site-editor.php' ),
									} ),
								}
						  )
						: __(
								'Your site is hidden from visitors behind a “Coming soon” landing page until it’s ready for viewing.',
								'fincommerce'
						  ) }
				</p>
				<div
					className={ clsx(
						'site-visibility-settings-slotfill-section-content',
						{
							'is-hidden': comingSoon !== 'yes',
						}
					) }
				>
					<ToggleControl
						__nextHasNoMarginBottom
						label={
							<>
								{ __(
									'Apply to store pages only',
									'fincommerce'
								) }
								<p>
									{ __(
										'Display a “coming soon” message on your store pages — the rest of your site will remain visible.',
										'fincommerce'
									) }
								</p>
							</>
						}
						checked={ storePagesOnly === 'yes' }
						onChange={ ( enabled ) => {
							setStorePagesOnly(
								storePagesOnly === 'yes' ? 'no' : 'yes'
							);
							recordEvent(
								'site_visibility_restrict_store_pages_only_toggle',
								{
									enabled,
								}
							);
						} }
					/>
					<ToggleControl
						__nextHasNoMarginBottom
						label={
							<>
								{ __(
									'Share your site with a private link',
									'fincommerce'
								) }
								<p>
									{ __(
										'Share your site with anyone using a private link.',
										'fincommerce'
									) }
								</p>
							</>
						}
						checked={ privateLink === 'yes' }
						onChange={ ( enabled ) => {
							setPrivateLink(
								privateLink === 'yes' ? 'no' : 'yes'
							);
							recordEvent(
								'site_visibility_share_private_link_toggle',
								{
									enabled,
								}
							);
						} }
					/>
				</div>
				{ comingSoon === 'yes' && privateLink === 'yes' && (
					<div className="site-visibility-settings-slotfill-private-link">
						<input value={ getPrivateLink() } readOnly />
						<Button
							ref={ copyClipboardRef }
							variant="link"
							onClick={ () => {
								recordEvent(
									'site_visibility_private_link_copy'
								);
							} }
						>
							{ copyLinkText }
						</Button>
					</div>
				) }
			</div>
			<div className="site-visibility-settings-slotfill-section">
				<RadioControl
					onChange={ () => {
						setComingSoon( 'no' );
						recordEvent( 'site_visibility_toggle', {
							status: 'live',
						} );
					} }
					options={ [
						{
							label: __( 'Live', 'fincommerce' ),
							value: 'no',
						},
					] }
					selected={ comingSoon }
				/>
				<p className="site-visibility-settings-slotfill-section-description">
					{ __(
						'Your entire site is visible to everyone.',
						'fincommerce'
					) }
				</p>
			</div>
			{ formRef.current && saveButtonRef.current ? (
				<ConfirmationModal
					saveButtonRef={ saveButtonRef }
					formRef={ formRef }
					currentSetting={ setting }
				/>
			) : null }
		</div>
	);
};

const SiteVisibilitySlotFill = () => {
	return (
		<Fill>
			<SiteVisibility />
		</Fill>
	);
};

export const registerSiteVisibilitySlotFill = () => {
	if ( getPlugin( PLUGIN_ID ) ) {
		return;
	}

	registerPlugin( PLUGIN_ID, {
		scope: 'fincommerce-site-visibility-settings',
		render: SiteVisibilitySlotFill,
	} );
};
