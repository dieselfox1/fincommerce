/**
 * External dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import clsx from 'clsx';
import { createElement } from '@wordpress/element';
import StarIcon from 'gridicons/dist/star';
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
            const Icon = _icon || StarIcon;
            _stars.push(createElement(Icon, { key: 'star-' + i, style: starStyles }));
        }
        return _stars;
    };
    const classes = clsx('fincommerce-rating', className);
    const perStar = 100 / totalStars;
    const outlineStyles = {
        width: Math.round(perStar * rating) + '%',
    };
    const label = sprintf(
    /* translators: %1$s: rating, %2$s: total number of stars */
    __('%1$s out of %2$s stars.', 'fincommerce'), rating, totalStars);
    return (createElement("div", { className: classes, "aria-label": label },
        stars(icon),
        createElement("div", { className: "fincommerce-rating__star-outline", style: outlineStyles }, stars(outlineIcon || icon))));
};
export default Rating;
