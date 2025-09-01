"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withOnboardingHydration = void 0;
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
const withOnboardingHydration = (data) => {
    let hydratedProfileItems = false;
    return (0, compose_1.createHigherOrderComponent)((OriginalComponent) => (props) => {
        const onboardingRef = (0, element_1.useRef)(data);
        const { isResolvingGroup, hasFinishedResolutionGroup } = (0, data_1.useSelect)((select) => {
            const { isResolving, hasFinishedResolution } = select(_1.store);
            return {
                isResolvingGroup: isResolving('getProfileItems', []),
                hasFinishedResolutionGroup: hasFinishedResolution('getProfileItems', []),
            };
        }, []);
        const { startResolution, finishResolution, setProfileItems } = (0, data_1.useDispatch)(_1.store);
        (0, element_1.useEffect)(() => {
            if (!onboardingRef.current) {
                return;
            }
            const { profileItems } = onboardingRef.current;
            if (!profileItems) {
                return;
            }
            if (profileItems &&
                !hydratedProfileItems &&
                // Ensure that profile items have finished resolving to prevent race conditions
                !isResolvingGroup &&
                !hasFinishedResolutionGroup) {
                startResolution('getProfileItems', []);
                setProfileItems(profileItems, true);
                finishResolution('getProfileItems', []);
                hydratedProfileItems = true;
            }
        }, [
            finishResolution,
            setProfileItems,
            startResolution,
            isResolvingGroup,
            hasFinishedResolutionGroup,
        ]);
        return (0, element_1.createElement)(OriginalComponent, { ...props });
    }, 'withOnboardingHydration');
};
exports.withOnboardingHydration = withOnboardingHydration;
