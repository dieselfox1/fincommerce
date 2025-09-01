interface UseProductEntityPropConfig<T> {
    postType?: string;
    fallbackValue?: T;
}
declare function useProductEntityProp<T>(property: string, config?: UseProductEntityPropConfig<T>): [T | undefined, (value: T) => void];
export default useProductEntityProp;
//# sourceMappingURL=use-product-entity-prop.d.ts.map