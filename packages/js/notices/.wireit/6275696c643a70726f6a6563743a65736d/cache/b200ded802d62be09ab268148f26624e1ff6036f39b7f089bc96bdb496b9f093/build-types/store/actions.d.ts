import type { WPNoticeAction } from '@wordpress/notices/build-types/store/actions';
export type Options = {
    id: string;
    context: string;
    isDismissible: boolean;
    type: string;
    speak: boolean;
    actions: Array<WPNoticeAction>;
    icon: null | JSX.Element;
    explicitDismiss: boolean;
    onDismiss: (() => void) | null;
    __unstableHTML?: boolean;
};
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
export declare function createNotice(status: string | undefined, content: string, options?: Partial<Options>): {
    type: "CREATE_NOTICE";
    context: string;
    notice: {
        id: string;
        status: string;
        content: string;
        spokenMessage: string | null;
        __unstableHTML: boolean | undefined;
        isDismissible: boolean;
        actions: WPNoticeAction[];
        type: string;
        icon: JSX.Element | null;
        explicitDismiss: boolean;
        onDismiss: (() => void) | null;
    };
};
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
export declare function createSuccessNotice(content: string, options: Options): {
    type: "CREATE_NOTICE";
    context: string;
    notice: {
        id: string;
        status: string;
        content: string;
        spokenMessage: string | null;
        __unstableHTML: boolean | undefined;
        isDismissible: boolean;
        actions: WPNoticeAction[];
        type: string;
        icon: JSX.Element | null;
        explicitDismiss: boolean;
        onDismiss: (() => void) | null;
    };
};
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
export declare function createInfoNotice(content: string, options: Options): {
    type: "CREATE_NOTICE";
    context: string;
    notice: {
        id: string;
        status: string;
        content: string;
        spokenMessage: string | null;
        __unstableHTML: boolean | undefined;
        isDismissible: boolean;
        actions: WPNoticeAction[];
        type: string;
        icon: JSX.Element | null;
        explicitDismiss: boolean;
        onDismiss: (() => void) | null;
    };
};
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
export declare function createErrorNotice(content: string, options: Options): {
    type: "CREATE_NOTICE";
    context: string;
    notice: {
        id: string;
        status: string;
        content: string;
        spokenMessage: string | null;
        __unstableHTML: boolean | undefined;
        isDismissible: boolean;
        actions: WPNoticeAction[];
        type: string;
        icon: JSX.Element | null;
        explicitDismiss: boolean;
        onDismiss: (() => void) | null;
    };
};
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
export declare function createWarningNotice(content: string, options: Options): {
    type: "CREATE_NOTICE";
    context: string;
    notice: {
        id: string;
        status: string;
        content: string;
        spokenMessage: string | null;
        __unstableHTML: boolean | undefined;
        isDismissible: boolean;
        actions: WPNoticeAction[];
        type: string;
        icon: JSX.Element | null;
        explicitDismiss: boolean;
        onDismiss: (() => void) | null;
    };
};
/**
 * Returns an action object used in signalling that a notice is to be removed.
 *
 * @param {string} id                 Notice unique identifier.
 * @param {string} [context='global'] Optional context (grouping) in which the notice is
 *                                    intended to appear. Defaults to default context.
 *
 * @return {Object} Action object.
 */
export declare function removeNotice(id: string, context?: string): {
    type: "REMOVE_NOTICE";
    id: string;
    context: string;
};
export type Action = ReturnType<typeof createNotice | typeof removeNotice>;
//# sourceMappingURL=actions.d.ts.map