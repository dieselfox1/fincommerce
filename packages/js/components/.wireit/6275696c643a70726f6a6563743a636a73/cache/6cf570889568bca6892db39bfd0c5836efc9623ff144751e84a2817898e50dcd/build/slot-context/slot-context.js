"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSlotContext = exports.SlotContextProvider = void 0;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const SlotContext = (0, element_1.createContext)(undefined);
const SlotContextProvider = ({ children, }) => {
    const [fills, updateFills] = (0, element_1.useReducer)((data, updates) => ({ ...data, ...updates }), {});
    const updateFillConfig = (id, update) => {
        if (!fills[id]) {
            throw new Error(`No fill found with ID: ${id}`);
        }
        updateFills({ [id]: { ...fills[id], ...update } });
    };
    const registerFill = (0, element_1.useCallback)((id) => {
        if (fills[id]) {
            return;
        }
        updateFills({ [id]: { visible: true } });
    }, [fills]);
    const hideFill = (0, element_1.useCallback)((id) => updateFillConfig(id, { visible: false }), [fills]);
    const showFill = (0, element_1.useCallback)((id) => updateFillConfig(id, { visible: true }), [fills]);
    const getFills = (0, element_1.useCallback)(() => ({ ...fills }), [fills]);
    return ((0, element_1.createElement)(SlotContext.Provider, { value: {
            registerFill,
            getFillHelpers() {
                return { hideFill, showFill, getFills };
            },
            filterRegisteredFills(fillsArrays) {
                return fillsArrays.filter((arr) => fills[arr[0].props._id]?.visible !== false);
            },
            fills,
        } }, children));
};
exports.SlotContextProvider = SlotContextProvider;
const useSlotContext = () => {
    const slotContext = (0, element_1.useContext)(SlotContext);
    if (slotContext === undefined) {
        throw new Error('useSlotContext must be used within a SlotContextProvider');
    }
    return slotContext;
};
exports.useSlotContext = useSlotContext;
