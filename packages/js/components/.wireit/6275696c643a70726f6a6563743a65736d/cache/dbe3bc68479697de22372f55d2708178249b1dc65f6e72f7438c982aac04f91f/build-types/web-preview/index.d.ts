export default WebPreview;
/**
 * WebPreview component to display an iframe of another page.
 */
declare class WebPreview extends Component<any, any, any> {
    constructor(props: any);
    state: {
        isLoading: boolean;
    };
    iframeRef: import("react").RefObject<any>;
    setLoaded(): void;
    componentDidMount(): void;
    render(): JSX.Element;
}
declare namespace WebPreview {
    namespace propTypes {
        let className: PropTypes.Requireable<string>;
        let loadingContent: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        let onLoad: PropTypes.Requireable<(...args: any[]) => any>;
        let src: PropTypes.Validator<string>;
        let title: PropTypes.Validator<string>;
    }
    namespace defaultProps {
        let loadingContent_1: JSX.Element;
        export { loadingContent_1 as loadingContent };
        export { noop as onLoad };
    }
}
import { Component } from '@wordpress/element';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
//# sourceMappingURL=index.d.ts.map