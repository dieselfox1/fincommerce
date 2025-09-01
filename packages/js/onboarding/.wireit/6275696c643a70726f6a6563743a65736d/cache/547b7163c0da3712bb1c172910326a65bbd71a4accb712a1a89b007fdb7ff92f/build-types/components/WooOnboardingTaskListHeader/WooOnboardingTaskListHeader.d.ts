import { Slot, Fill } from '@wordpress/components';
type WooOnboardingTaskListHeaderProps = {
    id: string;
} & Omit<React.ComponentProps<typeof Fill>, 'name'>;
/**
 * A Fill for adding Onboarding Task List headers.
 *
 * @slotFill WooOnboardingTaskListHeader
 * @scope fincommerce-tasks
 * @param {Object} props    React props.
 * @param {string} props.id Task id.
 */
export declare const WooOnboardingTaskListHeader: {
    ({ id, ...props }: WooOnboardingTaskListHeaderProps): JSX.Element;
    Slot({ id, fillProps, }: WooOnboardingTaskListHeaderProps & {
        fillProps?: React.ComponentProps<typeof Slot>["fillProps"];
    }): JSX.Element;
};
export {};
//# sourceMappingURL=WooOnboardingTaskListHeader.d.ts.map