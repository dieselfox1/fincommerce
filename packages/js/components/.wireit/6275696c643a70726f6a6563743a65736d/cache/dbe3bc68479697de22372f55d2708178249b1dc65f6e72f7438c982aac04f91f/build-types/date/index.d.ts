export default Date;
/**
 * Use the `Date` component to display accessible dates or times.
 *
 * @param {Object} props
 * @param {Object} props.date
 * @param {string} props.machineFormat
 * @param {string} props.screenReaderFormat
 * @param {string} props.visibleFormat
 * @return {Object} -
 */
declare function Date({ date, machineFormat, screenReaderFormat, visibleFormat, }: {
    date: Object;
    machineFormat: string;
    screenReaderFormat: string;
    visibleFormat: string;
}): Object;
declare namespace Date {
    namespace propTypes {
        let date: PropTypes.Validator<NonNullable<NonNullable<string | object | null | undefined>>>;
        let machineFormat: PropTypes.Requireable<string>;
        let screenReaderFormat: PropTypes.Requireable<string>;
        let visibleFormat: PropTypes.Requireable<string>;
    }
}
import PropTypes from 'prop-types';
//# sourceMappingURL=index.d.ts.map