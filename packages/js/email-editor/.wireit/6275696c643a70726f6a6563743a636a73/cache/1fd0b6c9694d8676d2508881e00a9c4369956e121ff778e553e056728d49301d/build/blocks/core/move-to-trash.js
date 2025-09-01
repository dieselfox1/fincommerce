"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.modifyMoveToTrashAction = modifyMoveToTrashAction;
/**
 * External dependencies
 */
const hooks_1 = require("@wordpress/hooks");
/**
 * Internal dependencies
 */
const private_apis_1 = require("../../private-apis");
const trash_email_post_1 = __importDefault(require("../../components/header/trash-email-post"));
const removeDefaultMoveToTrashActionAddCustom = (postType) => {
    // Remove the default move to trash action.
    (0, private_apis_1.unregisterEntityAction)('postType', postType, 'move-to-trash');
    // Add the custom trash email post action.
    (0, private_apis_1.registerEntityAction)('postType', postType, (0, trash_email_post_1.default)());
};
function modifyMoveToTrashAction() {
    // Available in WordPress 6.8+
    (0, hooks_1.addAction)('core.registerPostTypeSchema', 'fincommerce-email-editor/modify-move-to-trash-action', (postType) => {
        removeDefaultMoveToTrashActionAddCustom(postType);
    });
    // Support for WordPress 6.7+
    (0, hooks_1.addAction)('core.registerPostTypeActions', 'fincommerce-email-editor/modify-move-to-trash-action', (postType) => {
        removeDefaultMoveToTrashActionAddCustom(postType);
    });
}
