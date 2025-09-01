import { SelectControl } from '@wordpress/components';
/**
 * Internal dependencies
 */
import { BaseProductFieldProps } from '../types';
type SelectControlProps = React.ComponentProps<typeof SelectControl>;
type SelectControlFieldProps = BaseProductFieldProps<string | string[]> & {
    multiple?: boolean;
    options: SelectControlProps['options'];
};
declare const SelectControlField: ({ label, value, onChange, multiple, options, }: SelectControlFieldProps) => JSX.Element;
export default SelectControlField;
//# sourceMappingURL=render.d.ts.map