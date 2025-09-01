/**
 * Provides foundation to use D3 within React.
 *
 * React is responsible for determining when a chart should be updated (e.g. whenever data changes or the browser is
 * resized), while D3 is responsible for the actual rendering of the chart (which is performed via DOM operations that
 * happen outside of React's control).
 *
 * This component makes use of new lifecycle methods that come with React 16.3. Thus, while this component (i.e. the
 * container of the chart) is rendered during the 'render phase' the chart itself is only rendered during the 'commit
 * phase' (i.e. in 'componentDidMount' and 'componentDidUpdate' methods).
 */
declare class D3Base extends Component<any, any, any> {
    constructor(props: any);
    chartRef: import("react").RefObject<any>;
    componentDidMount(): void;
    shouldComponentUpdate(nextProps: any): boolean;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    delayedScroll(): import("lodash").DebouncedFunc<() => void>;
    deleteChart(): void;
    /**
     * Renders the chart, or triggers a rendering by updating the list of params.
     */
    drawUpdatedChart(): void;
    getContainer(): any;
    render(): JSX.Element;
}
declare namespace D3Base {
    namespace propTypes {
        let className: PropTypes.Requireable<string>;
        let data: PropTypes.Requireable<any[]>;
        let orderedKeys: PropTypes.Requireable<any[]>;
        let tooltip: PropTypes.Requireable<object>;
        let chartType: PropTypes.Requireable<string>;
    }
}
export default D3Base;
import { Component } from '@wordpress/element';
import PropTypes from 'prop-types';
//# sourceMappingURL=index.d.ts.map