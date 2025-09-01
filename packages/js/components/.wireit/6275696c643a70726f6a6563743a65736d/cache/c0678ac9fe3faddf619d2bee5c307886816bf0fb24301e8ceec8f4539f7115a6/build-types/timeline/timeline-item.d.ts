export default TimelineItem;
declare function TimelineItem({ item, className, clockFormat }: {
    item?: {} | undefined;
    className?: string | undefined;
    clockFormat: any;
}): JSX.Element;
declare namespace TimelineItem {
    namespace propTypes {
        let className: PropTypes.Requireable<string>;
        let item: PropTypes.Requireable<PropTypes.InferProps<{
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
            /**
             * The PHP clock format string used to format times, see php.net/date.
             */
            clockFormat: PropTypes.Requireable<string>;
        }>>;
    }
}
import PropTypes from 'prop-types';
//# sourceMappingURL=timeline-item.d.ts.map