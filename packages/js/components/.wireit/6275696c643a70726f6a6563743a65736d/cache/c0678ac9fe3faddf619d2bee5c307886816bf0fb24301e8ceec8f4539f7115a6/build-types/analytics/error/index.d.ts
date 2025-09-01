export default AnalyticsError;
/**
 * Component to render when there is an error in an analytics component due to data
 * not being loaded or being invalid.
 *
 * @param {Object} props             React props.
 * @param {string} [props.className] Additional class name to style the component.
 */
declare function AnalyticsError({ className }: {
    className?: string | undefined;
}): JSX.Element;
declare namespace AnalyticsError {
    namespace propTypes {
        let className: PropTypes.Requireable<string>;
    }
}
import PropTypes from 'prop-types';
//# sourceMappingURL=index.d.ts.map