"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExperimentalEmailEditor = exports.storeName = void 0;
exports.initializeEditor = initializeEditor;
/**
 * Internal dependencies
 */
const editor_1 = require("./editor");
/**
 * The unique identifier used to register the email editor data store.
 * This store manages the email editor's state and settings.
 */
var store_1 = require("./store");
Object.defineProperty(exports, "storeName", { enumerable: true, get: function () { return store_1.storeName; } });
/**
 * This method is used to initialize the email editor.
 * This method expects some data set on the global window object set on window.fincommerceEmailEditor
 *
 * {
 *    "current_post_type": "", // The post type of the current post.
 *    "current_post_id": "", // The ID of the current post.
 *    "current_wp_user_email": "", // The email of the current user.
 *    "editor_settings": {}, // The block editor settings.
 *    "editor_theme": {}, // The block editor theme.
 *    "user_theme_post_id": "", // The ID of the user theme post.
 *    "urls": {
 *      "listings": "", // optional The URL for the listings page.
 *      "send": "", // optional The URL for the send button.
 *      "back": "" // optionsl The URL for the back button (top left corner).
 *    }
 *	}
 *
 * @param htmlId - The ID of the HTML element to initialize the editor in.
 */
function initializeEditor(htmlId) {
    if (document.readyState === 'loading') {
        window.addEventListener('DOMContentLoaded', () => {
            (0, editor_1.initialize)(htmlId);
        }, { once: true });
    }
    else {
        (0, editor_1.initialize)(htmlId);
    }
}
var editor_2 = require("./editor");
Object.defineProperty(exports, "ExperimentalEmailEditor", { enumerable: true, get: function () { return editor_2.ExperimentalEmailEditor; } });
