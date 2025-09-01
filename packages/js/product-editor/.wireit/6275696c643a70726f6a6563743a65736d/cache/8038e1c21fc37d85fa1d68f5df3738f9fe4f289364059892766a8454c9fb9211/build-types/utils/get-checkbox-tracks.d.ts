/**
 * External dependencies
 */
import { ChangeEvent } from 'react';
import { Product } from '@fincommerce/data';
/**
 * Get additional props to be passed to all checkbox inputs.
 *
 * @param name Name of the checkbox.
 * @return Props.
 */
export declare function getCheckboxTracks<T = Product>(name: string): {
    onChange: (isChecked: ChangeEvent<HTMLInputElement> | T[keyof T]) => void;
};
//# sourceMappingURL=get-checkbox-tracks.d.ts.map