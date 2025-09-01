/**
 * External dependencies
 */
import { createHigherOrderComponent } from '@wordpress/compose';
import { useSelect, useDispatch } from '@wordpress/data';
import { createElement, useEffect } from '@wordpress/element';
/**
 * Internal dependencies
 */
import { store } from './';
export const useOptionsHydration = (data) => {
    const shouldHydrate = useSelect((select) => {
        const { isResolving, hasFinishedResolution } = select(store);
        if (!data) {
            return {};
        }
        return Object.fromEntries(Object.keys(data).map((name) => {
            const hydrate = !isResolving('getOption', [name]) &&
                !hasFinishedResolution('getOption', [name]);
            return [name, hydrate];
        }));
    }, []);
    const { startResolution, finishResolution, receiveOptions } = useDispatch(store);
    useEffect(() => {
        Object.entries(shouldHydrate).forEach(([name, hydrate]) => {
            if (hydrate) {
                startResolution('getOption', [name]);
                receiveOptions({ [name]: data[name] });
                finishResolution('getOption', [name]);
            }
        });
    }, [shouldHydrate]);
};
export const withOptionsHydration = (data) => createHigherOrderComponent((OriginalComponent) => (props) => {
    useOptionsHydration(data);
    return createElement(OriginalComponent, { ...props });
}, 'withOptionsHydration');
