/**
 * External dependencies
 */
import { createHigherOrderComponent } from '@wordpress/compose';
import { useSelect, useDispatch } from '@wordpress/data';
import { createElement, useEffect } from '@wordpress/element';
import deprecated from '@wordpress/deprecated';
/**
 * Internal dependencies
 */
import { STORE_NAME } from './constants';
/**
 * Higher-order component used to hydrate navigation data.
 *
 * @param {Object}     data           Data object with menu items and site information.
 * @param {MenuItem[]} data.menuItems Menu items to hydrate.
 */
export const withNavigationHydration = (data) => createHigherOrderComponent((OriginalComponent) => (props) => {
    deprecated('withNavigationHydration', {});
    const shouldHydrate = useSelect((select) => {
        if (!data) {
            return;
        }
        const { isResolving, hasFinishedResolution } = select(STORE_NAME);
        return (!isResolving('getMenuItems') &&
            !hasFinishedResolution('getMenuItems'));
    }, []);
    const { startResolution, finishResolution, setMenuItems } = useDispatch(STORE_NAME);
    useEffect(() => {
        if (!shouldHydrate) {
            return;
        }
        startResolution('getMenuItems', []);
        setMenuItems(data.menuItems);
        finishResolution('getMenuItems', []);
    }, [shouldHydrate]);
    return createElement(OriginalComponent, { ...props });
}, 'withNavigationHydration');
