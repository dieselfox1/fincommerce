export type DebouncedFunction<T extends (...args: any[]) => any> = ((...args: Parameters<T>) => void) & {
    flush: () => void;
};
export declare const debounce: <T extends (...args: any[]) => any>(func: T, wait: number, immediate?: boolean) => DebouncedFunction<T>;
//# sourceMappingURL=utils.d.ts.map