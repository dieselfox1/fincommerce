"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useUserTheme = useUserTheme;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const data_1 = require("@wordpress/data");
const core_data_1 = require("@wordpress/core-data");
/**
 * Internal dependencies
 */
const store_1 = require("../store");
function useUserTheme() {
    const { globalStylePost } = (0, data_1.useSelect)((select) => {
        const post = select(store_1.storeName).getGlobalEmailStylesPost() || null;
        return {
            globalStylePost: post,
        };
    }, []);
    const updateGlobalStylesPost = (0, element_1.useCallback)((newTheme) => {
        if (!globalStylePost) {
            return;
        }
        void (0, data_1.dispatch)(core_data_1.store).editEntityRecord('postType', 'wp_global_styles', globalStylePost.id, {
            styles: newTheme.styles,
            settings: newTheme.settings,
        });
    }, [globalStylePost]);
    return {
        userTheme: {
            settings: globalStylePost?.settings,
            styles: globalStylePost?.styles,
        },
        updateUserTheme: updateGlobalStylesPost,
    };
}
