/**
 * External dependencies
 */
import { createElement, Component } from '@wordpress/element';
import PropTypes from 'prop-types';
import clsx from 'clsx';
/**
 * Spinner - An indeterminate circular progress indicator.
 */
class Spinner extends Component {
    render() {
        const { className } = this.props;
        const classes = clsx('fincommerce-spinner', className);
        return (createElement("svg", { className: classes, viewBox: "0 0 100 100", xmlns: "http://www.w3.org/2000/svg" },
            createElement("circle", { className: "fincommerce-spinner__circle", fill: "none", strokeWidth: "5", strokeLinecap: "round", cx: "50", cy: "50", r: "30" })));
    }
}
Spinner.propTypes = {
    /**
     * Additional class name to style the component.
     */
    className: PropTypes.string,
};
export default Spinner;
