import { getPersistedQuery } from '@fincommerce/navigation';
/**
 * Internal dependencies
 */
import TYPES from './action-types';
import { MenuItem } from './types';
export declare function setMenuItems(menuItems: MenuItem[]): {
    type: "SET_MENU_ITEMS";
    menuItems: MenuItem[];
};
export declare function addMenuItems(menuItems: MenuItem[]): {
    type: "ADD_MENU_ITEMS";
    menuItems: MenuItem[];
};
export declare function getFavoritesFailure(error: unknown): {
    type: "GET_FAVORITES_FAILURE";
    error: unknown;
};
export declare function getFavoritesRequest(favorites?: string[]): {
    type: "GET_FAVORITES_REQUEST";
    favorites: string[] | undefined;
};
export declare function getFavoritesSuccess(favorites: string[]): {
    type: "GET_FAVORITES_SUCCESS";
    favorites: string[];
};
export declare function addFavoriteRequest(favorite: string): {
    type: "ADD_FAVORITE_REQUEST";
    favorite: string;
};
export declare function addFavoriteFailure(favorite: string, error: unknown): {
    type: "ADD_FAVORITE_FAILURE";
    favorite: string;
    error: unknown;
};
export declare function addFavoriteSuccess(favorite: string): {
    type: "ADD_FAVORITE_SUCCESS";
    favorite: string;
};
export declare function removeFavoriteRequest(favorite: string): {
    type: "REMOVE_FAVORITE_REQUEST";
    favorite: string;
};
export declare function removeFavoriteFailure(favorite: string, error: unknown): {
    type: "REMOVE_FAVORITE_FAILURE";
    favorite: string;
    error: unknown;
};
export declare function removeFavoriteSuccess(favorite: string): {
    type: "REMOVE_FAVORITE_SUCCESS";
    favorite: string;
};
export declare function onHistoryChange(): Generator<{
    type: "ON_HISTORY_CHANGE";
    persistedQuery: Object;
}, null | undefined, unknown>;
export declare function onLoad(): Generator<Generator<{
    type: "ON_HISTORY_CHANGE";
    persistedQuery: Object;
}, null | undefined, unknown>, void, unknown>;
export declare function addFavorite(favorite: string): Generator<Promise<unknown> | {
    type: "ADD_FAVORITE_REQUEST";
    favorite: string;
} | {
    type: "ADD_FAVORITE_FAILURE";
    favorite: string;
    error: unknown;
} | {
    type: "ADD_FAVORITE_SUCCESS";
    favorite: string;
}, string[], string[]>;
export declare function removeFavorite(favorite: string): Generator<Promise<unknown> | {
    type: "REMOVE_FAVORITE_REQUEST";
    favorite: string;
} | {
    type: "REMOVE_FAVORITE_FAILURE";
    favorite: string;
    error: unknown;
} | {
    type: "REMOVE_FAVORITE_SUCCESS";
    favorite: string;
}, string[], string[]>;
export type Action = ReturnType<typeof setMenuItems | typeof addMenuItems | typeof getFavoritesFailure | typeof getFavoritesRequest | typeof getFavoritesSuccess | typeof addFavoriteRequest | typeof addFavoriteFailure | typeof addFavoriteSuccess | typeof removeFavoriteRequest | typeof removeFavoriteFailure | typeof removeFavoriteSuccess | (() => {
    type: typeof TYPES.ON_HISTORY_CHANGE;
    persistedQuery: ReturnType<typeof getPersistedQuery>;
})>;
//# sourceMappingURL=actions.d.ts.map