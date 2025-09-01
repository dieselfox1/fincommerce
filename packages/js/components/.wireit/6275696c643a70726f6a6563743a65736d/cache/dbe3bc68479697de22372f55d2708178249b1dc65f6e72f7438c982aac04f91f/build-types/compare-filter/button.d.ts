export default CompareButton;
/**
 * A button used when comparing items, if `count` is less than 2 a hoverable tooltip is added with `helpText`.
 *
 * @param {Object}   props
 * @param {string}   props.className
 * @param {number}   props.count
 * @param {Node}     props.children
 * @param {boolean}  props.disabled
 * @param {string}   props.helpText
 * @param {Function} props.onClick
 * @return {Object} -
 */
declare function CompareButton({ className, count, children, disabled, helpText, onClick, }: {
    className: string;
    count: number;
    children: Node;
    disabled: boolean;
    helpText: string;
    onClick: Function;
}): Object;
declare namespace CompareButton {
    namespace propTypes {
        let className: PropTypes.Requireable<string>;
        let count: PropTypes.Validator<number>;
        let children: PropTypes.Validator<NonNullable<PropTypes.ReactNodeLike>>;
        let helpText: PropTypes.Validator<string>;
        let onClick: PropTypes.Validator<(...args: any[]) => any>;
        let disabled: PropTypes.Requireable<boolean>;
    }
}
import PropTypes from 'prop-types';
//# sourceMappingURL=button.d.ts.map