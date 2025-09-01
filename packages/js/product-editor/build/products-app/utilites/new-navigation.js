"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewNavigationProvider = NewNavigationProvider;
exports.useNewNavigation = useNewNavigation;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const NewNavigationContext = (0, element_1.createContext)(null);
function NewNavigationProvider({ children, }) {
    const [showNewNavigation, setShowNewNavigation] = (0, element_1.useState)(false);
    return ((0, element_1.createElement)(NewNavigationContext.Provider, { value: { showNewNavigation, setShowNewNavigation } }, children));
}
function useNewNavigation() {
    const context = (0, element_1.useContext)(NewNavigationContext);
    if (context) {
        const { showNewNavigation, setShowNewNavigation } = context;
        return [showNewNavigation, setShowNewNavigation];
    }
    return [false, () => { }];
}
