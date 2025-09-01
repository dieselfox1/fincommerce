"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useExtendLayout = exports.useLayoutContext = exports.LayoutContextProvider = exports.getLayoutContextValue = exports.LayoutContext = void 0;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
exports.LayoutContext = (0, element_1.createContext)(undefined);
const getLayoutContextValue = (layoutParts = []) => ({
    layoutParts: [...layoutParts],
    extendLayout: (item) => {
        const newLayoutPath = [...layoutParts, item];
        return {
            ...(0, exports.getLayoutContextValue)(newLayoutPath),
            layoutParts: newLayoutPath,
        };
    },
    layoutString: layoutParts.join('/'),
    isDescendantOf: (item) => layoutParts.includes(item),
});
exports.getLayoutContextValue = getLayoutContextValue;
const LayoutContextProvider = ({ children, value, }) => ((0, element_1.createElement)(exports.LayoutContext.Provider, { value: value }, children));
exports.LayoutContextProvider = LayoutContextProvider;
const useLayoutContext = () => {
    const layoutContext = (0, element_1.useContext)(exports.LayoutContext);
    if (layoutContext === undefined) {
        throw new Error('useLayoutContext must be used within a LayoutContextProvider');
    }
    return layoutContext;
};
exports.useLayoutContext = useLayoutContext;
const useExtendLayout = (item) => {
    const { extendLayout } = (0, exports.useLayoutContext)();
    return (0, element_1.useMemo)(() => extendLayout(item), [extendLayout, item]);
};
exports.useExtendLayout = useExtendLayout;
