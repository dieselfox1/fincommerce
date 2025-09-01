/**
 * External dependencies
 */
import { partial } from 'lodash';
import { createElement } from '@wordpress/element';
import { getHistory } from '@fincommerce/navigation';
/**
 * Use `Link` to create a link to another resource. It accepts a type to automatically
 * create wp-admin links, wc-admin links, and external links.
 */
export const Link = ({ href, children, type = 'wc-admin', ...props }) => {
    // ( { children, href, type, ...props } ) => {
    // @todo Investigate further if we can use <Link /> directly.
    // With React Router 5+, <RouterLink /> cannot be used outside of the main <Router /> elements,
    // which seems to include components imported from @fincommerce/components. For now, we can use the history object directly.
    const wcAdminLinkHandler = (onClick, event) => {
        // If cmd, ctrl, alt, or shift are used, use default behavior to allow opening in a new tab.
        if (event?.ctrlKey ||
            event?.metaKey ||
            event?.altKey ||
            event?.shiftKey) {
            return;
        }
        event?.preventDefault();
        // If there is an onclick event, execute it.
        const onClickResult = onClick && event ? onClick(event) : true;
        // Mimic browser behavior and only continue if onClickResult is not explicitly false.
        if (onClickResult === false) {
            return;
        }
        if (event?.target instanceof Element) {
            const closestEventTarget = event.target
                .closest('a')
                ?.getAttribute('href');
            if (closestEventTarget) {
                getHistory().push(closestEventTarget);
            }
            else {
                // eslint-disable-next-line no-console
                console.error('@fincommerce/components/link is trying to push an undefined state into navigation stack'); // This shouldn't happen as we wrap with <a> below
            }
        }
    };
    const passProps = {
        ...props,
        'data-link-type': type,
    };
    if (type === 'wc-admin') {
        passProps.onClick = partial(wcAdminLinkHandler, passProps.onClick);
    }
    return (createElement("a", { href: href, ...passProps }, children));
};
export default Link;
