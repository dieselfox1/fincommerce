/**
 * External dependencies
 */
import type { SetStateAction } from 'react';
/**
 * Internal dependencies
 */
import type { Metadata } from '../../types';
export declare function useCustomFields<T extends Metadata<string> = Metadata<string>>(): {
    customFields: T[];
    addCustomFields: (value: T[]) => void;
    setCustomFields: (value: SetStateAction<T[]>) => void;
    updateCustomField: (customField: T, index?: number) => void;
    removeCustomField: (customField: T) => void;
};
//# sourceMappingURL=use-custom-fields.d.ts.map