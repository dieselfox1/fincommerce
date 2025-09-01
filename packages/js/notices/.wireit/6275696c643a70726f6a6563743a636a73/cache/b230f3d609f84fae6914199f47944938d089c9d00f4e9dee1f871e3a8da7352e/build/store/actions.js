"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNotice = createNotice;
exports.createSuccessNotice = createSuccessNotice;
exports.createInfoNotice = createInfoNotice;
exports.createErrorNotice = createErrorNotice;
exports.createWarningNotice = createWarningNotice;
exports.removeNotice = removeNotice;
/**
 * External dependencies
 */
const lodash_1 = require("lodash");
/**
 * Internal dependencies
 */
const constants_1 = require("./constants");
/**
 * Returns an action object used in signalling that a notice is to be created.
 *
 * @param {string}                [status='info']              Notice status.
 * @param {string}                content                      Notice message.
 * @param {Object}                [options]                    Notice options.
 * @param {string}                [options.context='global']   Context under which to
 *                                                             group notice.
 * @param {string}                [options.id]                 Identifier for notice.
 *                                                             Automatically assigned
 *                                                             if not specified.
 * @param {boolean}               [options.isDismissible=true] Whether the notice can
 *                                                             be dismissed by user.
 * @param {string}                [options.type='default']     Type of notice, one of
 *                                                             `default`, or `snackbar`.
 * @param {boolean}               [options.speak=true]         Whether the notice
 *                                                             content should be
 *                                                             announced to screen
 *                                                             readers.
 * @param {Array<WPNoticeAction>} [options.actions]            User actions to be
 *                                                             presented with notice.
 * @param {Object}                [options.icon]               An icon displayed with the notice.
 * @param {boolean}               [options.explicitDismiss]    Whether the notice includes
 *                                                             an explicit dismiss button and
 *                                                             can't be dismissed by clicking
 *                                                             the body of the notice.
 * @param {Function}              [options.onDismiss]          Called when the notice is dismissed.
 * @param {boolean}               [options.__unstableHTML]     Notice message as raw HTML.
 *
 * @return {Object} WPNoticeAction object.
 */
function createNotice(status = constants_1.DEFAULT_STATUS, content, options = {}) {
    const { speak = true, isDismissible = true, context = constants_1.DEFAULT_CONTEXT, id = (0, lodash_1.uniqueId)(context), actions = [], type = 'default', __unstableHTML, icon = null, explicitDismiss = false, onDismiss = null, } = options;
    // The supported value shape of content is currently limited to plain text
    // strings. To avoid setting expectation that e.g. a WPElement could be
    // supported, cast to a string.
    content = String(content);
    return {
        type: 'CREATE_NOTICE',
        context,
        notice: {
            id,
            status,
            content,
            spokenMessage: speak ? content : null,
            __unstableHTML,
            isDismissible,
            actions,
            type,
            icon,
            explicitDismiss,
            onDismiss,
        },
    };
}
/**
 * Returns an action object used in signalling that a success notice is to be
 * created. Refer to `createNotice` for options documentation.
 *
 * @see createNotice
 *
 * @param {string} content   Notice message.
 * @param {Object} [options] Optional notice options.
 *
 * @return {Object} Action object.
 */
function createSuccessNotice(content, options) {
    return createNotice('success', content, options);
}
/**
 * Returns an action object used in signalling that an info notice is to be
 * created. Refer to `createNotice` for options documentation.
 *
 * @see createNotice
 *
 * @param {string} content   Notice message.
 * @param {Object} [options] Optional notice options.
 *
 * @return {Object} Action object.
 */
function createInfoNotice(content, options) {
    return createNotice('info', content, options);
}
/**
 * Returns an action object used in signalling that an error notice is to be
 * created. Refer to `createNotice` for options documentation.
 *
 * @see createNotice
 *
 * @param {string} content   Notice message.
 * @param {Object} [options] Optional notice options.
 *
 * @return {Object} Action object.
 */
function createErrorNotice(content, options) {
    return createNotice('error', content, options);
}
/**
 * Returns an action object used in signalling that a warning notice is to be
 * created. Refer to `createNotice` for options documentation.
 *
 * @see createNotice
 *
 * @param {string} content   Notice message.
 * @param {Object} [options] Optional notice options.
 *
 * @return {Object} Action object.
 */
function createWarningNotice(content, options) {
    return createNotice('warning', content, options);
}
/**
 * Returns an action object used in signalling that a notice is to be removed.
 *
 * @param {string} id                 Notice unique identifier.
 * @param {string} [context='global'] Optional context (grouping) in which the notice is
 *                                    intended to appear. Defaults to default context.
 *
 * @return {Object} Action object.
 */
function removeNotice(id, context = constants_1.DEFAULT_CONTEXT) {
    return {
        type: 'REMOVE_NOTICE',
        id,
        context,
    };
}
