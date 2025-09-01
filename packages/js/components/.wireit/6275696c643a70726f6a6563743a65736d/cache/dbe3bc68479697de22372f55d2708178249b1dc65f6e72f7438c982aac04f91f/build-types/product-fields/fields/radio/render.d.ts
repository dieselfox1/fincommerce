/**
 * Internal dependencies
 */
import { BaseProductFieldProps } from '../types';
type RadioFieldProps = BaseProductFieldProps<string> & {
    options: {
        label: string;
        value: string;
    }[];
};
declare const RadioField: ({ label, value, onChange, options, }: RadioFieldProps) => JSX.Element;
export default RadioField;
//# sourceMappingURL=render.d.ts.map