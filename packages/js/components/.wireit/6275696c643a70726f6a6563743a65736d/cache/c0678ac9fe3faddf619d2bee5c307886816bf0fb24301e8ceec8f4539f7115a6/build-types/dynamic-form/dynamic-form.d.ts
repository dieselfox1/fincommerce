import { Field } from './types';
type DynamicFormProps = {
    fields: Field[] | {
        [key: string]: Field;
    };
    validate: (values: Record<string, string>) => Record<string, string>;
    isBusy?: boolean;
    onSubmit?: (values: Record<string, string>) => void;
    onChange?: (value: {
        name: string;
        value: unknown;
    }, values: Record<string, string>, result: boolean) => void;
    submitLabel?: string;
};
export declare const DynamicForm: ({ fields: baseFields, isBusy, onSubmit, onChange, validate, submitLabel, }: DynamicFormProps) => JSX.Element;
export {};
//# sourceMappingURL=dynamic-form.d.ts.map