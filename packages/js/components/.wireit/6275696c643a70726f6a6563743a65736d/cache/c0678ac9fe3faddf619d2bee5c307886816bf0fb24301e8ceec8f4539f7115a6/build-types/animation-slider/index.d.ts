export default AnimationSlider;
/**
 * This component creates slideable content controlled by an animate prop to direct the contents to slide left or right.
 * All other props are passed to `CSSTransition`. More info at http://reactcommunity.org/react-transition-group/css-transition
 */
declare class AnimationSlider extends Component<any, any, any> {
    constructor();
    state: {
        animate: null;
    };
    container: import("react").RefObject<any>;
    onExited(): void;
    render(): JSX.Element;
}
declare namespace AnimationSlider {
    namespace propTypes {
        let children: PropTypes.Validator<(...args: any[]) => any>;
        let animationKey: PropTypes.Validator<any>;
        let animate: PropTypes.Requireable<string | null>;
        let onExited: PropTypes.Requireable<(...args: any[]) => any>;
    }
}
import { Component } from '@wordpress/element';
import PropTypes from 'prop-types';
//# sourceMappingURL=index.d.ts.map