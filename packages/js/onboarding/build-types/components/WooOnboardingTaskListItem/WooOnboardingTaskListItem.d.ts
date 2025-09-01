import { Slot, Fill } from '@wordpress/components';
type WooOnboardingTaskListItemProps = {
    id: string;
    children: React.ComponentProps<typeof Fill>['children'];
};
/**
 * A Fill for adding Onboarding Task List items.
 *
 * @slotFill WooOnboardingTaskListItem
 * @scope fincommerce-tasks
 * @param {Object} props    React props.
 * @param {string} props.id Task id.
 */
export declare const WooOnboardingTaskListItem: {
    ({ id, ...props }: WooOnboardingTaskListItemProps): JSX.Element;
    Slot({ id, fillProps, }: {
        id: string;
        fillProps?: React.ComponentProps<typeof Slot>["fillProps"];
    }): JSX.Element;
};
export {};
//# sourceMappingURL=WooOnboardingTaskListItem.d.ts.map