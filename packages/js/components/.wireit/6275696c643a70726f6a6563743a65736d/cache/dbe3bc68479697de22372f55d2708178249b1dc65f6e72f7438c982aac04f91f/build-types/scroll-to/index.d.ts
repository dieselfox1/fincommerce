export default ScrollTo;
declare class ScrollTo extends Component<any, any, any> {
    constructor(props: any);
    scrollTo(): void;
    componentDidMount(): void;
    render(): JSX.Element;
    ref: import("react").RefObject<any> | undefined;
}
declare namespace ScrollTo {
    namespace propTypes {
        let offset: PropTypes.Requireable<string>;
    }
    namespace defaultProps {
        let offset_1: string;
        export { offset_1 as offset };
    }
}
import { Component } from '@wordpress/element';
import PropTypes from 'prop-types';
//# sourceMappingURL=index.d.ts.map