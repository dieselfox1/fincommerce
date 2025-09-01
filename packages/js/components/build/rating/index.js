"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
const i18n_1 = require("@wordpress/i18n");
const clsx_1 = __importDefault(require("clsx"));
const element_1 = require("@wordpress/element");
const star_1 = __importDefault(require("gridicons/dist/star"));
/**
 * Use `Rating` to display a set of stars, filled, empty or half-filled, that represents a
 * rating in a scale between 0 and the prop `totalStars` (default 5).
 */
const Rating = ({ rating = 0, totalStars = 5, size = 18, className, icon, outlineIcon, }) => {
    const stars = (_icon) => {
        const starStyles = {
            width: size + 'px',
            height: size + 'px',
        };
        const _stars = [];
        for (let i = 0; i < totalStars; i++) {
            const Icon = _icon || star_1.default;
            _stars.push((0, element_1.createElement)(Icon, { key: 'star-' + i, style: starStyles }));
        }
        return _stars;
    };
    const classes = (0, clsx_1.default)('fincommerce-rating', className);
    const perStar = 100 / totalStars;
    const outlineStyles = {
        width: Math.round(perStar * rating) + '%',
    };
    const label = (0, i18n_1.sprintf)(
    /* translators: %1$s: rating, %2$s: total number of stars */
    (0, i18n_1.__)('%1$s out of %2$s stars.', 'fincommerce'), rating, totalStars);
    return ((0, element_1.createElement)("div", { className: classes, "aria-label": label },
        stars(icon),
        (0, element_1.createElement)("div", { className: "fincommerce-rating__star-outline", style: outlineStyles }, stars(outlineIcon || icon))));
};
exports.default = Rating;
