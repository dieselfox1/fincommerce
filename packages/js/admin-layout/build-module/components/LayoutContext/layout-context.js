/**
 * External dependencies
 */
import { createElement, createContext, useContext, useMemo, } from '@wordpress/element';
export const LayoutContext = createContext(undefined);
export const getLayoutContextValue = (layoutParts = []) => ({
    layoutParts: [...layoutParts],
    extendLayout: (item) => {
        const newLayoutPath = [...layoutParts, item];
        return {
            ...getLayoutContextValue(newLayoutPath),
            layoutParts: newLayoutPath,
        };
    },
    layoutString: layoutParts.join('/'),
    isDescendantOf: (item) => layoutParts.includes(item),
});
export const LayoutContextProvider = ({ children, value, }) => (createElement(LayoutContext.Provider, { value: value }, children));
export const useLayoutContext = () => {
    const layoutContext = useContext(LayoutContext);
    if (layoutContext === undefined) {
        throw new Error('useLayoutContext must be used within a LayoutContextProvider');
    }
    return layoutContext;
};
export const useExtendLayout = (item) => {
    const { extendLayout } = useLayoutContext();
    return useMemo(() => extendLayout(item), [extendLayout, item]);
};
