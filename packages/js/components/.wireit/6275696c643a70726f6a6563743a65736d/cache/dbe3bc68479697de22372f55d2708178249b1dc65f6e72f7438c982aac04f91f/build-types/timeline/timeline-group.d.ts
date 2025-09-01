export default TimelineGroup;
declare function TimelineGroup({ group, className, orderBy, clockFormat, }: {
    group?: {
        title: string;
        items: never[];
    } | undefined;
    className?: string | undefined;
    orderBy?: string | undefined;
    clockFormat: any;
}): JSX.Element;
declare namespace TimelineGroup {
    namespace propTypes {
        let className: PropTypes.Requireable<string>;
        let group: PropTypes.Requireable<PropTypes.InferProps<{
            /**
             * The group title.
             */
            title: PropTypes.Requireable<string>;
            /**
             * An array of list items.
             */
            items: PropTypes.Requireable<(PropTypes.InferProps<{
                /**
                 * Date for the timeline item.
                 */
                date: PropTypes.Validator<Date>;
                /**
                 * Icon for the Timeline item.
                 */
                icon: PropTypes.Validator<PropTypes.ReactElementLike>;
                /**
                 * Headline displayed for the list item.
                 */
                headline: PropTypes.Validator<NonNullable<NonNullable<string | PropTypes.ReactElementLike | null | undefined>>>;
                /**
                 * Body displayed for the list item.
                 */
                body: PropTypes.Requireable<(NonNullable<string | PropTypes.ReactElementLike | null | undefined> | null | undefined)[]>;
                /**
                 * Allows users to toggle the timestamp on or off.
                 */
                hideTimestamp: PropTypes.Requireable<boolean>;
            }> | null | undefined)[]>;
        }>>;
        let orderBy: PropTypes.Requireable<string>;
        let clockFormat: PropTypes.Requireable<string>;
    }
}
import PropTypes from 'prop-types';
//# sourceMappingURL=timeline-group.d.ts.map