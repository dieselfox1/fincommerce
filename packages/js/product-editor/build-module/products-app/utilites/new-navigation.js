/**
 * External dependencies
 */
import { createElement, createContext, useState, useContext, } from '@wordpress/element';
const NewNavigationContext = createContext(null);
export function NewNavigationProvider({ children, }) {
    const [showNewNavigation, setShowNewNavigation] = useState(false);
    return (createElement(NewNavigationContext.Provider, { value: { showNewNavigation, setShowNewNavigation } }, children));
}
export function useNewNavigation() {
    const context = useContext(NewNavigationContext);
    if (context) {
        const { showNewNavigation, setShowNewNavigation } = context;
        return [showNewNavigation, setShowNewNavigation];
    }
    return [false, () => { }];
}
