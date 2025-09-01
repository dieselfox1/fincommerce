export default SummaryNumber;
/**
 * A component to show a value, label, and optionally a change percentage and children node. Can also act as a link to a specific report focus.
 *
 * @param {Object}        props
 * @param {Node}          props.children
 * @param {number}        props.delta               Change percentage. Float precision is rendered as given.
 * @param {string}        props.href
 * @param {string}        props.hrefType
 * @param {boolean}       props.isOpen
 * @param {string}        props.label
 * @param {string}        props.labelTooltipText
 * @param {Function}      props.onToggle
 * @param {string}        props.prevLabel
 * @param {number|string} props.prevValue
 * @param {boolean}       props.reverseTrend
 * @param {boolean}       props.selected
 * @param {number|string} props.value
 * @param {Function}      props.onLinkClickCallback
 * @return {Object} -
 */
declare function SummaryNumber({ children, delta, href, hrefType, isOpen, label, labelTooltipText, onToggle, prevLabel, prevValue, reverseTrend, selected, value, onLinkClickCallback, }: {
    children: Node;
    delta: number;
    href: string;
    hrefType: string;
    isOpen: boolean;
    label: string;
    labelTooltipText: string;
    onToggle: Function;
    prevLabel: string;
    prevValue: number | string;
    reverseTrend: boolean;
    selected: boolean;
    value: number | string;
    onLinkClickCallback: Function;
}): Object;
declare namespace SummaryNumber {
    namespace propTypes {
        let delta: PropTypes.Requireable<number>;
        let href: PropTypes.Requireable<string>;
        let hrefType: PropTypes.Requireable<string>;
        let isOpen: PropTypes.Requireable<boolean>;
        let label: PropTypes.Validator<string>;
        let labelTooltipText: PropTypes.Requireable<string>;
        let onToggle: PropTypes.Requireable<(...args: any[]) => any>;
        let prevLabel: PropTypes.Requireable<string>;
        let prevValue: PropTypes.Requireable<NonNullable<string | number | null | undefined>>;
        let reverseTrend: PropTypes.Requireable<boolean>;
        let selected: PropTypes.Requireable<boolean>;
        let value: PropTypes.Requireable<NonNullable<string | number | null | undefined>>;
        let onLinkClickCallback: PropTypes.Requireable<(...args: any[]) => any>;
    }
}
import PropTypes from 'prop-types';
//# sourceMappingURL=number.d.ts.map