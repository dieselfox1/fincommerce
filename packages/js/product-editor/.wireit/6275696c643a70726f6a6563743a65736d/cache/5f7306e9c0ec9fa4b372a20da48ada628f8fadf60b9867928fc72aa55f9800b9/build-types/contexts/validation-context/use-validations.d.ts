export declare function useValidations<T = unknown>(): {
    isValidating: boolean;
    validate(newData?: Partial<T>): Promise<void>;
    focusByValidatorId: (validatorId: string) => Promise<void>;
    getFieldByValidatorId: (validatorId: string) => Promise<HTMLInputElement>;
};
//# sourceMappingURL=use-validations.d.ts.map