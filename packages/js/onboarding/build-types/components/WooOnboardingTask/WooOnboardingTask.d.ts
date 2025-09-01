import { Slot, Fill } from '@wordpress/components';
/**
 * Internal dependencies
 *
 * @param {string} taskId  Task id.
 * @param {string} variant The variant of the task.
 */
export declare const trackView: (taskId: string, variant?: string) => Promise<void>;
type WooOnboardingTaskProps = {
    id: string;
    children: React.ComponentProps<typeof Fill>['children'];
    variant?: string;
};
type WooOnboardingTaskSlotProps = {
    id: string;
    fillProps: React.ComponentProps<typeof Slot>['fillProps'];
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
declare const WooOnboardingTask: {
    ({ id, ...props }: WooOnboardingTaskProps): JSX.Element;
    Slot({ id, fillProps }: WooOnboardingTaskSlotProps): JSX.Element;
};
export { WooOnboardingTask };
//# sourceMappingURL=WooOnboardingTask.d.ts.map