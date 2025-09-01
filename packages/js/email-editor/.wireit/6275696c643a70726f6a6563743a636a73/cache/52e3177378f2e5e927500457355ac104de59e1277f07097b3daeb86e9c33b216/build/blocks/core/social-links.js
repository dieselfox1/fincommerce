"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enhanceSocialLinksBlock = enhanceSocialLinksBlock;
const jsx_runtime_1 = require("react/jsx-runtime");
/**
 * External dependencies
 */
const block_editor_1 = require("@wordpress/block-editor");
const hooks_1 = require("@wordpress/hooks");
const blocks_1 = require("@wordpress/blocks");
const i18n_1 = require("@wordpress/i18n");
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
    'wordpress',
    'whatsapp',
    'x',
    'youtube',
];
function unregisterBlockVariations() {
    // Remove unsupported social links
    (0, hooks_1.addFilter)('blocks.registerBlockType', 'fincommerce-email-editor/disable-social-link-variations', (settings, name) => {
        if (name === 'core/social-link') {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return {
                ...settings,
                variations: settings.variations.filter((variation) => supportedVariations.includes(variation.name)),
                supports: {
                    ...settings.supports,
                    layout: false,
                },
            };
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return settings;
    });
}
function registerCustomSocialLinksBlockVariation() {
    // Register a custom variation for the social links block
    // This variation is used to display the social links in the email editor by automatically adding some preset social links
    const socialLinksVariations = [
        {
            // @ts-expect-error Type not complete.
            name: 'core/social-link',
            attributes: {
                service: 'wordpress',
                url: 'https://wordpress.org',
            },
        },
        {
            // @ts-expect-error Type not complete.
            name: 'core/social-link',
            attributes: {
                service: 'facebook',
                url: 'https://www.facebook.com/WordPress/',
            },
        },
        {
            // @ts-expect-error Type not complete.
            name: 'core/social-link',
            attributes: {
                service: 'x',
                url: 'https://x.com/WordPress',
            },
        },
    ];
    (0, blocks_1.registerBlockVariation)('core/social-links', {
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
    });
}
const disableIconColor = (BlockEdit) => (props) => {
    if (props.name !== 'core/social-links') {
        return (0, jsx_runtime_1.jsx)(BlockEdit, { ...props });
    }
    // we are doing this because we don't want to show the icon color picker in the social links block (we can't change png image color)
    // and there isn't a great way to remove the icon color from the core block attributes
    // eslint-disable-next-line @wordpress/i18n-text-domain -- using core label.
    const labelText = (0, i18n_1.__)('Icon color');
    const customCss = `
		.block-editor-tools-panel-color-gradient-settings__item:has([title="${labelText}"]) {
			display: none !important;
		}
		.block-editor-tools-panel-color-gradient-settings__item:nth-child(2 of .block-editor-tools-panel-color-gradient-settings__item){
			border-top:1px solid #ddd;
			border-top-left-radius:2px;
			border-top-right-radius:2px;
		}
		`;
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(BlockEdit, { ...props }), (0, jsx_runtime_1.jsx)(block_editor_1.InspectorControls, { group: "color", children: (0, jsx_runtime_1.jsx)("style", { children: customCss }) })] }));
};
function removeSocialLinksIconColor() {
    (0, hooks_1.addFilter)('editor.BlockEdit', 'fincommerce-email-editor/disable-social-links-icon-color', disableIconColor);
}
/**
 * Enhances the social links and social link blocks
 */
function enhanceSocialLinksBlock() {
    unregisterBlockVariations();
    registerCustomSocialLinksBlockVariation();
    removeSocialLinksIconColor();
}
