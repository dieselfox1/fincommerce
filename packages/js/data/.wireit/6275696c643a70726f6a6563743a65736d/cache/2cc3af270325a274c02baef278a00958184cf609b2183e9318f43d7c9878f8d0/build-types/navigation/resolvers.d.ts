export declare function getFavorites(): Generator<{
    type: string;
    request: import("@wordpress/api-fetch/build-types/types").APIFetchOptions;
} | {
    type: "GET_FAVORITES_FAILURE";
    error: unknown;
} | {
    type: "GET_FAVORITES_REQUEST";
    favorites: string[] | undefined;
} | {
    type: "GET_FAVORITES_SUCCESS";
    favorites: string[];
}, void, string[]>;
//# sourceMappingURL=resolvers.d.ts.map