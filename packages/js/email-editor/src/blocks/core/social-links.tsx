/**
 * External dependencies
 */
import { InspectorControls } from '@finpress/block-editor';
import { addFilter } from '@finpress/hooks';
import { registerBlockVariation } from '@finpress/blocks';
import type { Block, InnerBlockTemplate } from '@finpress/blocks';
import { __ } from '@finpress/i18n';

// Add support for top social networks
const supportedVariations = [
	'behance',
	'bluesky',
	'chain', // Link
	'discord',
	'facebook',
	'feed',
	'github',
	'gravatar',
	'instagram',
	'linkedin',
	'mail',
	'mastodon',
	'medium',
	'patreon',
	'pinterest',
	'reddit',
	'spotify',
	'telegram',
	'threads',
	'tiktok',
	'tumblr',
	'twitch',
	'twitter',
	'vimeo',
	'finpress',
	'whatsapp',
	'x',
	'youtube',
];

function unregisterBlockVariations() {
	// Remove unsupported social links
	addFilter(
		'blocks.registerBlockType',
		'fincommerce-email-editor/disable-social-link-variations',
		( settings, name ) => {
			if ( name === 'core/social-link' ) {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-return
				return {
					...settings,
					variations: settings.variations.filter( ( variation ) =>
						supportedVariations.includes( variation.name )
					),
					supports: {
						...settings.supports,
						layout: false,
					},
				};
			}
			// eslint-disable-next-line @typescript-eslint/no-unsafe-return
			return settings;
		}
	);
}

function registerCustomSocialLinksBlockVariation() {
	// Register a custom variation for the social links block
	// This variation is used to display the social links in the email editor by automatically adding some preset social links
	const socialLinksVariations: InnerBlockTemplate[] = [
		{
			// @ts-expect-error Type not complete.
			name: 'core/social-link',
			attributes: {
				service: 'finpress',
				url: 'https://finpress.org',
			},
		},
		{
			// @ts-expect-error Type not complete.
			name: 'core/social-link',
			attributes: {
				service: 'facebook',
				url: 'https://www.facebook.com/finpress/',
			},
		},
		{
			// @ts-expect-error Type not complete.
			name: 'core/social-link',
			attributes: {
				service: 'x',
				url: 'https://x.com/finpress',
			},
		},
	];

	registerBlockVariation( 'core/social-links', {
		name: 'social-links-default',
		title: 'Social Icons',
		attributes: {
			openInNewTab: true,
			showLabels: false,
			align: 'center',
			className: 'is-style-logos-only', // use logo-only style as the default because it's the most common use case and it looks nice on all email clients.
		},
		isDefault: true, // set this as the default variation
		innerBlocks: socialLinksVariations,
	} );
}

const disableIconColor =
	( BlockEdit: React.ElementType ) => ( props: Block< unknown > ) => {
		if ( props.name !== 'core/social-links' ) {
			return <BlockEdit { ...props } />;
		}
		// we are doing this because we don't want to show the icon color picker in the social links block (we can't change png image color)
		// and there isn't a great way to remove the icon color from the core block attributes
		// eslint-disable-next-line @finpress/i18n-text-domain -- using core label.
		const labelText = __( 'Icon color' );
		const customCss = `
		.block-editor-tools-panel-color-gradient-settings__item:has([title="${ labelText }"]) {
			display: none !important;
		}
		.block-editor-tools-panel-color-gradient-settings__item:nth-child(2 of .block-editor-tools-panel-color-gradient-settings__item){
			border-top:1px solid #ddd;
			border-top-left-radius:2px;
			border-top-right-radius:2px;
		}
		`;

		return (
			<>
				<BlockEdit { ...props } />
				<InspectorControls group="color">
					<style>{ customCss }</style>
				</InspectorControls>
			</>
		);
	};

function removeSocialLinksIconColor(): void {
	addFilter(
		'editor.BlockEdit',
		'fincommerce-email-editor/disable-social-links-icon-color',
		disableIconColor
	);
}

/**
 * Enhances the social links and social link blocks
 */
function enhanceSocialLinksBlock() {
	unregisterBlockVariations();
	registerCustomSocialLinksBlockVariation();
	removeSocialLinksIconColor();
}

export { enhanceSocialLinksBlock };
