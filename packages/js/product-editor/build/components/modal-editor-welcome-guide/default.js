"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = WelcomeGuideDefault;
/**
 * External dependencies
 */
const data_1 = require("@wordpress/data");
const components_1 = require("@wordpress/components");
const i18n_1 = require("@wordpress/i18n");
const element_1 = require("@wordpress/element");
/**
 * Internal dependencies
 */
const image_1 = __importDefault(require("./image"));
function WelcomeGuideDefault() {
    const { toggle } = (0, data_1.useDispatch)('core/preferences');
    return ((0, element_1.createElement)(components_1.Guide, { className: "edit-post-welcome-guide", contentLabel: (0, i18n_1.__)('Welcome to the block editor', 'fincommerce'), finishButtonText: (0, i18n_1.__)('Get started', 'fincommerce'), onFinish: () => toggle('core/edit-post', 'welcomeGuide'), pages: [
            {
                image: ((0, element_1.createElement)(image_1.default, { nonAnimatedSrc: "https://s.w.org/images/block-editor/welcome-canvas.svg", animatedSrc: "https://s.w.org/images/block-editor/welcome-canvas.gif" })),
                content: ((0, element_1.createElement)(element_1.Fragment, null,
                    (0, element_1.createElement)("h1", { className: "edit-post-welcome-guide__heading" }, (0, i18n_1.__)('Welcome to the block editor', 'fincommerce')),
                    (0, element_1.createElement)("p", { className: "edit-post-welcome-guide__text" }, (0, i18n_1.__)('In the WordPress editor, each paragraph, image, or video is presented as a distinct “block” of content.', 'fincommerce')))),
            },
            {
                image: ((0, element_1.createElement)(image_1.default, { nonAnimatedSrc: "https://s.w.org/images/block-editor/welcome-editor.svg", animatedSrc: "https://s.w.org/images/block-editor/welcome-editor.gif" })),
                content: ((0, element_1.createElement)(element_1.Fragment, null,
                    (0, element_1.createElement)("h1", { className: "edit-post-welcome-guide__heading" }, (0, i18n_1.__)('Make each block your own', 'fincommerce')),
                    (0, element_1.createElement)("p", { className: "edit-post-welcome-guide__text" }, (0, i18n_1.__)('Each block comes with its own set of controls for changing things like color, width, and alignment. These will show and hide automatically when you have a block selected.', 'fincommerce')))),
            },
            {
                image: ((0, element_1.createElement)(image_1.default, { nonAnimatedSrc: "https://s.w.org/images/block-editor/welcome-library.svg", animatedSrc: "https://s.w.org/images/block-editor/welcome-library.gif" })),
                content: ((0, element_1.createElement)(element_1.Fragment, null,
                    (0, element_1.createElement)("h1", { className: "edit-post-welcome-guide__heading" }, (0, i18n_1.__)('Get to know the block library', 'fincommerce')),
                    (0, element_1.createElement)("p", { className: "edit-post-welcome-guide__text" }, (0, element_1.createInterpolateElement)((0, i18n_1.__)('All of the blocks available to you live in the block library. You’ll find it wherever you see the <InserterIconImage /> icon.', 'fincommerce'), {
                        InserterIconImage: ((0, element_1.createElement)("img", { alt: (0, i18n_1.__)('inserter', 'fincommerce'), src: "data:image/svg+xml,%3Csvg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='18' height='18' rx='2' fill='%231E1E1E'/%3E%3Cpath d='M9.22727 4V14M4 8.77273H14' stroke='white' stroke-width='1.5'/%3E%3C/svg%3E%0A" })),
                    })))),
            },
            {
                image: ((0, element_1.createElement)(image_1.default, { nonAnimatedSrc: "https://s.w.org/images/block-editor/welcome-documentation.svg", animatedSrc: "https://s.w.org/images/block-editor/welcome-documentation.gif" })),
                content: ((0, element_1.createElement)(element_1.Fragment, null,
                    (0, element_1.createElement)("h1", { className: "edit-post-welcome-guide__heading" }, (0, i18n_1.__)('Learn how to use the block editor', 'fincommerce')),
                    (0, element_1.createElement)("p", { className: "edit-post-welcome-guide__text" },
                        (0, i18n_1.__)('New to the block editor? Want to learn more about using it? ', 'fincommerce'),
                        (0, element_1.createElement)(components_1.ExternalLink, { href: (0, i18n_1.__)('https://wordpress.org/documentation/article/wordpress-block-editor/', 'fincommerce') }, (0, i18n_1.__)("Here's a detailed guide.", 'fincommerce'))))),
            },
        ] }));
}
