/**
 * Internal dependencies
 */
import { BaseProductFieldProps } from '../types';
type ToggleFieldProps = BaseProductFieldProps<boolean> & {
    tooltip?: string;
};
declare const ToggleField: ({ label, value, onChange, tooltip, disabled, }: ToggleFieldProps) => JSX.Element;
export default ToggleField;
//# sourceMappingURL=render.d.ts.map