/**
 * External dependencies
 */
import { createElement, useEffect } from '@wordpress/element';
import { recordEvent } from '@fincommerce/tracks';
import { Slot, Fill } from '@wordpress/components';
/**
 * Internal dependencies
 *
 * @param {string} taskId  Task id.
 * @param {string} variant The variant of the task.
 */
export const trackView = async (taskId, variant) => {
    const activePlugins = wp.data
        .select('wc/admin/plugins')
        .getActivePlugins();
    const installedPlugins = wp.data
        .select('wc/admin/plugins')
        .getInstalledPlugins();
    const isJetpackConnected = wp.data.select('wc/admin/plugins').isJetpackConnected() || false;
    recordEvent('task_view', {
        task_name: taskId,
        variant,
        wcs_installed: installedPlugins.includes('fincommerce-services'),
        wcs_active: activePlugins.includes('fincommerce-services'),
        jetpack_installed: installedPlugins.includes('jetpack'),
        jetpack_active: activePlugins.includes('jetpack'),
        jetpack_connected: isJetpackConnected,
    });
};
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
    return createElement(Fill, { name: 'fincommerce_onboarding_task_' + id, ...props });
};
WooOnboardingTask.Slot = ({ id, fillProps }) => {
    // The Slot is a React component and this hook works as expected.
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        trackView(id);
    }, [id]);
    return (createElement(Slot, { name: 'fincommerce_onboarding_task_' + id, fillProps: fillProps }));
};
export { WooOnboardingTask };
