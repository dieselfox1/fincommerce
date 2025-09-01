export default Timeline;
declare function Timeline({ className, items, groupBy, orderBy, dateFormat, clockFormat, }: {
    className?: string | undefined;
    items?: never[] | undefined;
    groupBy?: string | undefined;
    orderBy?: string | undefined;
    dateFormat?: string | undefined;
    clockFormat?: string | undefined;
}): JSX.Element;
declare namespace Timeline {
    namespace propTypes {
        let className: PropTypes.Requireable<string>;
        let items: PropTypes.Requireable<(PropTypes.InferProps<{
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
        let groupBy: PropTypes.Requireable<string>;
        let orderBy: PropTypes.Requireable<string>;
        let dateFormat: PropTypes.Requireable<string>;
        let clockFormat: PropTypes.Requireable<string>;
    }
}
import PropTypes from 'prop-types';
export { orderByOptions, groupByOptions } from "./util";
//# sourceMappingURL=index.d.ts.map