"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withSettingsHydration = void 0;
/**
 * External dependencies
 */
const compose_1 = require("@wordpress/compose");
const data_1 = require("@wordpress/data");
const element_1 = require("@wordpress/element");
/**
 * Internal dependencies
 */
const _1 = require("./");
const withSettingsHydration = (group, settings) => (0, compose_1.createHigherOrderComponent)((OriginalComponent) => (props) => {
    const settingsRef = (0, element_1.useRef)(settings);
    const { startResolution, finishResolution, updateSettingsForGroup, clearIsDirty, } = (0, data_1.useDispatch)(_1.store);
    const { isResolvingGroup, hasFinishedResolutionGroup } = (0, data_1.useSelect)((select) => {
        const { isResolving, hasFinishedResolution } = select(_1.store);
        return {
            isResolvingGroup: isResolving('getSettings', [
                group,
            ]),
            hasFinishedResolutionGroup: hasFinishedResolution('getSettings', [group]),
        };
    }, []);
    (0, element_1.useEffect)(() => {
        if (!settingsRef.current) {
            return;
        }
        if (!isResolvingGroup && !hasFinishedResolutionGroup) {
            startResolution('getSettings', [group]);
            updateSettingsForGroup(group, settingsRef.current);
            clearIsDirty(group);
            finishResolution('getSettings', [group]);
        }
    }, [
        isResolvingGroup,
        hasFinishedResolutionGroup,
        finishResolution,
        updateSettingsForGroup,
        startResolution,
        clearIsDirty,
    ]);
    return (0, element_1.createElement)(OriginalComponent, { ...props });
}, 'withSettingsHydration');
exports.withSettingsHydration = withSettingsHydration;
