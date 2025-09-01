export default ChartPlaceholder;
/**
 * `ChartPlaceholder` displays a large loading indiciator for use in place of a `Chart` while data is loading.
 */
declare class ChartPlaceholder extends Component<any, any, any> {
    constructor(props: any);
    constructor(props: any, context: any);
    render(): JSX.Element;
}
declare namespace ChartPlaceholder {
    namespace propTypes {
        let height: PropTypes.Requireable<number>;
    }
    namespace defaultProps {
        let height_1: number;
        export { height_1 as height };
    }
}
import { Component } from '@wordpress/element';
import PropTypes from 'prop-types';
//# sourceMappingURL=placeholder.d.ts.map