import { DependencyList } from 'react';
/**
 * Internal dependencies
 */
import { Validator } from './types';
export declare function useValidation<T>(validatorId: string, validator: Validator<T>, deps?: DependencyList): {
    ref: import("react").Ref<HTMLInputElement>;
    error: string | undefined;
    isValidating: boolean;
    validate(newData?: Record<string, unknown>): Promise<import("./types").ValidationError>;
};
//# sourceMappingURL=use-validation.d.ts.map