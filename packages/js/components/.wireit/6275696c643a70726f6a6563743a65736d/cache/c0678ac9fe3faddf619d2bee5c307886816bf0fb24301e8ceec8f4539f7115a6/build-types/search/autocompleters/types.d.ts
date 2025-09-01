/**
 * External dependencies
 */
import { ReactNode, ReactElement } from 'react';
export type CompleterOption = any;
export type FnGetOptions = (query?: string) => CompleterOption[] | Promise<CompleterOption[]>;
export type OptionCompletionValue = string | ReactElement | object;
export type OptionCompletion = {
    /**
     * The action declares what should be done with the value.
     * There are currently two supported actions:
     * 1. "insert-at-caret" - Insert the value into the text (the default completion action).
     * 2. "replace" - Replace the current block with the block specified in the value property.
     */
    action: 'insert-at-caret' | 'replace';
    value: OptionCompletionValue;
};
export type FnGetOptionCompletion = (value: CompleterOption) => OptionCompletion | OptionCompletionValue;
export type AutoCompleter = {
    name: string;
    options: CompleterOption[] | FnGetOptions;
    getOptionIdentifier: (option: CompleterOption) => string | number;
    getOptionLabel: (option: CompleterOption, query: string) => ReactNode;
    getOptionCompletion: FnGetOptionCompletion;
    getOptionKeywords: (option: CompleterOption) => string[];
    isOptionDisabled?: (option: CompleterOption) => boolean;
    allowContext?: (before: string, after: string) => boolean;
    getFreeTextOptions?: (query: string) => [
        {
            key: string;
            label: JSX.Element;
            value: unknown;
        }
    ];
    getSearchExpression?: (query: string) => string;
    className?: string;
    isDebounced?: boolean;
    inputType?: 'text' | 'search' | 'number' | 'email' | 'tel' | 'url';
};
//# sourceMappingURL=types.d.ts.map