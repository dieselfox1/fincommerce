"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WooOnboardingTask = exports.trackView = void 0;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const tracks_1 = require("@fincommerce/tracks");
const components_1 = require("@wordpress/components");
/**
 * Internal dependencies
 *
 * @param {string} taskId  Task id.
 * @param {string} variant The variant of the task.
 */
const trackView = async (taskId, variant) => {
    const activePlugins = wp.data
        .select('wc/admin/plugins')
        .getActivePlugins();
    const installedPlugins = wp.data
        .select('wc/admin/plugins')
        .getInstalledPlugins();
    const isJetpackConnected = wp.data.select('wc/admin/plugins').isJetpackConnected() || false;
    (0, tracks_1.recordEvent)('task_view', {
        task_name: taskId,
        variant,
        wcs_installed: installedPlugins.includes('fincommerce-services'),
        wcs_active: activePlugins.includes('fincommerce-services'),
        jetpack_installed: installedPlugins.includes('jetpack'),
        jetpack_active: activePlugins.includes('jetpack'),
        jetpack_connected: isJetpackConnected,
    });
};
exports.trackView = trackView;
/**
 * A Fill for adding Onboarding tasks.
 *
 * @slotFill WooOnboardingTask
 * @scope fincommerce-tasks
 * @param {Object} props           React props.
 * @param {string} [props.variant] The variant of the task.
 * @param {Object} props.children  React component children
 * @param {string} props.id        Task id.
 */
const WooOnboardingTask = ({ id, ...props }) => {
    return (0, element_1.createElement)(components_1.Fill, { name: 'fincommerce_onboarding_task_' + id, ...props });
};
exports.WooOnboardingTask = WooOnboardingTask;
WooOnboardingTask.Slot = ({ id, fillProps }) => {
    // The Slot is a React component and this hook works as expected.
    // eslint-disable-next-line react-hooks/rules-of-hooks
    (0, element_1.useEffect)(() => {
        (0, exports.trackView)(id);
    }, [id]);
    return ((0, element_1.createElement)(components_1.Slot, { name: 'fincommerce_onboarding_task_' + id, fillProps: fillProps }));
};
