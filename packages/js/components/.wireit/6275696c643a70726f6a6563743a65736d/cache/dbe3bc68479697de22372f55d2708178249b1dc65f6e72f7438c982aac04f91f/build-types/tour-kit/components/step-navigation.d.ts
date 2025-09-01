/**
 * Internal dependencies
 */
import type { WooTourStepRendererProps } from '../types';
type Props = Omit<WooTourStepRendererProps, 'onMinimize' | 'setInitialFocusedElement'>;
declare const StepNavigation: ({ currentStepIndex, onNextStep, onPreviousStep, onDismiss, steps, }: Props) => JSX.Element | null;
export default StepNavigation;
//# sourceMappingURL=step-navigation.d.ts.map