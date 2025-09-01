/**
 * The unique identifier used to register the email editor data store.
 * This store manages the email editor's state and settings.
 */
export { storeName } from './store';
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
export declare function initializeEditor(htmlId: string): void;
export { ExperimentalEmailEditor } from './editor';
