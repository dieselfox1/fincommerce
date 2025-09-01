"use strict";
/**
 * External dependencies
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = WelcomeGuideImage;
const element_1 = require("@wordpress/element");
function WelcomeGuideImage({ nonAnimatedSrc, animatedSrc }) {
    return ((0, element_1.createElement)("picture", { className: "edit-post-welcome-guide__image" },
        (0, element_1.createElement)("source", { srcSet: nonAnimatedSrc, media: "(prefers-reduced-motion: reduce)" }),
        (0, element_1.createElement)("img", { src: animatedSrc, width: "312", height: "240", alt: "" })));
}
