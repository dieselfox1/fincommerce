"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Internal dependencies
 */
const action_types_1 = __importDefault(require("./action-types"));
const reducer = (state = {
    error: null,
    menuItems: [],
    favorites: [],
    requesting: {},
    persistedQuery: {},
}, action) => {
    switch (action.type) {
        case action_types_1.default.SET_MENU_ITEMS:
            state = {
                ...state,
                menuItems: action.menuItems,
            };
            break;
        case action_types_1.default.ADD_MENU_ITEMS:
            state = {
                ...state,
                menuItems: [...state.menuItems, ...action.menuItems],
            };
            break;
        case action_types_1.default.ON_HISTORY_CHANGE:
            state = {
                ...state,
                persistedQuery: action.persistedQuery,
            };
            break;
        case action_types_1.default.GET_FAVORITES_FAILURE:
            state = {
                ...state,
                requesting: {
                    ...state.requesting,
                    getFavorites: false,
                },
            };
            break;
        case action_types_1.default.GET_FAVORITES_REQUEST:
            state = {
                ...state,
                requesting: {
                    ...state.requesting,
                    getFavorites: true,
                },
            };
            break;
        case action_types_1.default.GET_FAVORITES_SUCCESS:
            state = {
                ...state,
                favorites: action.favorites,
                requesting: {
                    ...state.requesting,
                    getFavorites: false,
                },
            };
            break;
        case action_types_1.default.ADD_FAVORITE_FAILURE:
            state = {
                ...state,
                error: action.error,
                requesting: {
                    ...state.requesting,
                    addFavorite: false,
                },
            };
            break;
        case action_types_1.default.ADD_FAVORITE_REQUEST:
            state = {
                ...state,
                requesting: {
                    ...state.requesting,
                    addFavorite: true,
                },
            };
            break;
        case action_types_1.default.ADD_FAVORITE_SUCCESS:
            const newFavorites = !state.favorites.includes(action.favorite)
                ? [...state.favorites, action.favorite]
                : state.favorites;
            state = {
                ...state,
                favorites: newFavorites,
                menuItems: state.menuItems.map((item) => {
                    if (item.id === action.favorite) {
                        return {
                            ...item,
                            menuId: 'favorites',
                        };
                    }
                    return item;
                }),
                requesting: {
                    ...state.requesting,
                    addFavorite: false,
                },
            };
            break;
        case action_types_1.default.REMOVE_FAVORITE_FAILURE:
            state = {
                ...state,
                requesting: {
                    ...state.requesting,
                    error: action.error,
                    removeFavorite: false,
                },
            };
            break;
        case action_types_1.default.REMOVE_FAVORITE_REQUEST:
            state = {
                ...state,
                requesting: {
                    ...state.requesting,
                    removeFavorite: true,
                },
            };
            break;
        case action_types_1.default.REMOVE_FAVORITE_SUCCESS:
            const filteredFavorites = state.favorites.filter((f) => f !== action.favorite);
            state = {
                ...state,
                favorites: filteredFavorites,
                menuItems: state.menuItems.map((item) => {
                    if (item.id === action.favorite) {
                        return {
                            ...item,
                            menuId: 'plugins',
                        };
                    }
                    return item;
                }),
                requesting: {
                    ...state.requesting,
                    removeFavorite: false,
                },
            };
            break;
    }
    return state;
};
exports.default = reducer;
