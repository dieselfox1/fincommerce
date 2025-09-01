"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useNavigateToEntityRecord = useNavigateToEntityRecord;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const data_1 = require("@wordpress/data");
const editor_1 = require("@wordpress/editor");
/**
 * A hook that records the 'entity' history in the post editor as a user
 * navigates between editing a post and editing the post template or patterns.
 *
 * Implemented as a stack, so a little similar to the browser history API.
 *
 * Used to control displaying UI elements like the back button.
 *
 * @param {number} initialPostId        The post id of the post when the editor loaded.
 * @param {string} initialPostType      The post type of the post when the editor loaded.
 * @param {string} defaultRenderingMode The rendering mode to switch to when navigating.
 *
 * @return {Object} An object containing the `currentPost` variable and
 *                 `onNavigateToEntityRecord` and `onNavigateToPreviousEntityRecord` functions.
 */
function useNavigateToEntityRecord(initialPostId, initialPostType, defaultRenderingMode) {
    const [postHistory, dispatch] = (0, element_1.useReducer)((historyState, { type, post, previousRenderingMode }) => {
        if (type === 'push') {
            return [...historyState, { post, previousRenderingMode }];
        }
        if (type === 'pop') {
            // Try to leave one item in the history.
            if (historyState.length > 1) {
                return historyState.slice(0, -1);
            }
        }
        return historyState;
    }, [
        {
            post: { postId: initialPostId, postType: initialPostType },
        },
    ]);
    const { post, previousRenderingMode } = postHistory[postHistory.length - 1];
    const { getRenderingMode } = (0, data_1.useSelect)(editor_1.store);
    const { setRenderingMode } = (0, data_1.useDispatch)(editor_1.store);
    const onNavigateToEntityRecord = (0, element_1.useCallback)((params) => {
        dispatch({
            type: 'push',
            post: { postId: params.postId, postType: params.postType },
            // Save the current rendering mode so we can restore it when navigating back.
            previousRenderingMode: getRenderingMode(),
        });
        setRenderingMode(defaultRenderingMode);
    }, [getRenderingMode, setRenderingMode, defaultRenderingMode]);
    const onNavigateToPreviousEntityRecord = (0, element_1.useCallback)(() => {
        dispatch({ type: 'pop' });
        if (previousRenderingMode) {
            setRenderingMode(previousRenderingMode);
        }
    }, [setRenderingMode, previousRenderingMode]);
    return {
        currentPost: post,
        onNavigateToEntityRecord,
        onNavigateToPreviousEntityRecord: postHistory.length > 1
            ? onNavigateToPreviousEntityRecord
            : undefined,
    };
}
