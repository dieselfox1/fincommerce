"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setMenuItems = setMenuItems;
exports.addMenuItems = addMenuItems;
exports.getFavoritesFailure = getFavoritesFailure;
exports.getFavoritesRequest = getFavoritesRequest;
exports.getFavoritesSuccess = getFavoritesSuccess;
exports.addFavoriteRequest = addFavoriteRequest;
exports.addFavoriteFailure = addFavoriteFailure;
exports.addFavoriteSuccess = addFavoriteSuccess;
exports.removeFavoriteRequest = removeFavoriteRequest;
exports.removeFavoriteFailure = removeFavoriteFailure;
exports.removeFavoriteSuccess = removeFavoriteSuccess;
exports.onHistoryChange = onHistoryChange;
exports.onLoad = onLoad;
exports.addFavorite = addFavorite;
exports.removeFavorite = removeFavorite;
/**
 * External dependencies
 */
const api_fetch_1 = __importDefault(require("@wordpress/api-fetch"));
const navigation_1 = require("@fincommerce/navigation");
/**
 * Internal dependencies
 */
const action_types_1 = __importDefault(require("./action-types"));
const constants_1 = require("../constants");
function setMenuItems(menuItems) {
    return {
        type: action_types_1.default.SET_MENU_ITEMS,
        menuItems,
    };
}
function addMenuItems(menuItems) {
    return {
        type: action_types_1.default.ADD_MENU_ITEMS,
        menuItems,
    };
}
function getFavoritesFailure(error) {
    return {
        type: action_types_1.default.GET_FAVORITES_FAILURE,
        error,
    };
}
function getFavoritesRequest(favorites) {
    return {
        type: action_types_1.default.GET_FAVORITES_REQUEST,
        favorites,
    };
}
function getFavoritesSuccess(favorites) {
    return {
        type: action_types_1.default.GET_FAVORITES_SUCCESS,
        favorites,
    };
}
function addFavoriteRequest(favorite) {
    return {
        type: action_types_1.default.ADD_FAVORITE_REQUEST,
        favorite,
    };
}
function addFavoriteFailure(favorite, error) {
    return {
        type: action_types_1.default.ADD_FAVORITE_FAILURE,
        favorite,
        error,
    };
}
function addFavoriteSuccess(favorite) {
    return {
        type: action_types_1.default.ADD_FAVORITE_SUCCESS,
        favorite,
    };
}
function removeFavoriteRequest(favorite) {
    return {
        type: action_types_1.default.REMOVE_FAVORITE_REQUEST,
        favorite,
    };
}
function removeFavoriteFailure(favorite, error) {
    return {
        type: action_types_1.default.REMOVE_FAVORITE_FAILURE,
        favorite,
        error,
    };
}
function removeFavoriteSuccess(favorite) {
    return {
        type: action_types_1.default.REMOVE_FAVORITE_SUCCESS,
        favorite,
    };
}
function* onHistoryChange() {
    const persistedQuery = (0, navigation_1.getPersistedQuery)();
    if (!Object.keys(persistedQuery).length) {
        return null;
    }
    yield {
        type: action_types_1.default.ON_HISTORY_CHANGE,
        persistedQuery,
    };
}
function* onLoad() {
    yield onHistoryChange();
}
function* addFavorite(favorite) {
    yield addFavoriteRequest(favorite);
    try {
        const results = yield (0, api_fetch_1.default)({
            path: `${constants_1.WC_ADMIN_NAMESPACE}/navigation/favorites/me`,
            method: 'POST',
            data: {
                item_id: favorite,
            },
        });
        if (results) {
            yield addFavoriteSuccess(favorite);
            return results;
        }
        throw new Error();
    }
    catch (error) {
        yield addFavoriteFailure(favorite, error);
        throw new Error();
    }
}
function* removeFavorite(favorite) {
    yield removeFavoriteRequest(favorite);
    try {
        const results = yield (0, api_fetch_1.default)({
            path: `${constants_1.WC_ADMIN_NAMESPACE}/navigation/favorites/me`,
            method: 'DELETE',
            data: {
                item_id: favorite,
            },
        });
        if (results) {
            yield removeFavoriteSuccess(favorite);
            return results;
        }
        throw new Error();
    }
    catch (error) {
        yield removeFavoriteFailure(favorite, error);
        throw new Error();
    }
}
