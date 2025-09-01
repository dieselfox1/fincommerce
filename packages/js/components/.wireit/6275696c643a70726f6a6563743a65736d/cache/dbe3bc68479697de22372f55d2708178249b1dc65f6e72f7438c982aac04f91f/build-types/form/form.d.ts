import { FormProps, FormRef, PropsWithChildrenFunction, FormContextType } from './types';
declare const Form: <Values extends Record<string, any>>(props: PropsWithChildrenFunction<FormProps<Values>, FormContextType<Values>> & {
    ref?: React.ForwardedRef<FormRef<Values>>;
}, ref: React.Ref<FormRef<Values>>) => React.ReactElement | null;
export { Form };
//# sourceMappingURL=form.d.ts.map