"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Async = Async;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
// @ts-expect-error TS7016 Could not find a declaration file for module '@wordpress/priority-queue'
const priority_queue_1 = require("@wordpress/priority-queue"); // eslint-disable-line
const blockPreviewQueue = (0, priority_queue_1.createQueue)();
/**
 * Renders a component at the next idle time.
 *
 * @param {*} props
 */
function Async({ children, placeholder }) {
    const [shouldRender, setShouldRender] = (0, element_1.useState)(false);
    // In the future, we could try to use startTransition here, but currently
    // react will batch all transitions, which means all previews will be
    // rendered at the same time.
    // https://react.dev/reference/react/startTransition#caveats
    // > If there are multiple ongoing Transitions, React currently batches them
    // > together. This is a limitation that will likely be removed in a future
    // > release.
    (0, element_1.useEffect)(() => {
        const context = {};
        blockPreviewQueue.add(context, () => {
            // Synchronously run all renders so it consumes timeRemaining.
            // See https://github.com/WordPress/gutenberg/pull/48238
            (0, element_1.flushSync)(() => {
                setShouldRender(true);
            });
        });
        return () => {
            blockPreviewQueue.cancel(context);
        };
    }, []);
    if (!shouldRender) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return placeholder;
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return children;
}
