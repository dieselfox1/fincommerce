/**
 * The useItems hook is used to get all page items.
 *
 * @param exclude - The items to exclude from the search results.
 * @return The page items and a boolean indicating if the items are loading.
 */
export declare const useItems: (exclude?: string[]) => {
    items: import("./types").PageItem[];
    isFetching: boolean;
};
/**
 * The useSelectedItem hook is used to get the selected page item.
 *
 * @param value - The value of the selected page item.
 * @return The selected page item and a boolean indicating if the page is loading.
 */
export declare const useSelectedItem: (value: string) => {
    selectedItem: import("./types").PageItem | null;
    isLoading: boolean;
};
//# sourceMappingURL=hooks.d.ts.map