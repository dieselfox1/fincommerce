/**
 * External dependencies
 */
import { createElement, createContext, useContext, useCallback, useReducer, } from '@wordpress/element';
const SlotContext = createContext(undefined);
export const SlotContextProvider = ({ children, }) => {
    const [fills, updateFills] = useReducer((data, updates) => ({ ...data, ...updates }), {});
    const updateFillConfig = (id, update) => {
        if (!fills[id]) {
            throw new Error(`No fill found with ID: ${id}`);
        }
        updateFills({ [id]: { ...fills[id], ...update } });
    };
    const registerFill = useCallback((id) => {
        if (fills[id]) {
            return;
        }
        updateFills({ [id]: { visible: true } });
    }, [fills]);
    const hideFill = useCallback((id) => updateFillConfig(id, { visible: false }), [fills]);
    const showFill = useCallback((id) => updateFillConfig(id, { visible: true }), [fills]);
    const getFills = useCallback(() => ({ ...fills }), [fills]);
    return (createElement(SlotContext.Provider, { value: {
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
export const useSlotContext = () => {
    const slotContext = useContext(SlotContext);
    if (slotContext === undefined) {
        throw new Error('useSlotContext must be used within a SlotContextProvider');
    }
    return slotContext;
};
