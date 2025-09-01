declare const _default: (props: import("@wordpress/compose").WithoutInjectedProps<import("@wordpress/compose").WithInjectedProps<typeof D3Legend, {
    instanceId: string | number;
}>, {
    instanceId: string | number;
}>) => import("react").JSX.Element;
export default _default;
/**
 * A legend specifically designed for the FinCommerce admin charts.
 */
declare class D3Legend extends Component<any, any, any> {
    constructor();
    listRef: import("react").RefObject<any>;
    state: {
        isScrollable: boolean;
    };
    componentDidMount(): void;
    componentWillUnmount(): void;
    updateListScroll(): void;
    render(): JSX.Element;
}
declare namespace D3Legend {
    namespace propTypes {
        let className: PropTypes.Requireable<string>;
        let colorScheme: PropTypes.Requireable<(...args: any[]) => any>;
        let data: PropTypes.Validator<any[]>;
        let handleLegendToggle: PropTypes.Requireable<(...args: any[]) => any>;
        let handleLegendHover: PropTypes.Requireable<(...args: any[]) => any>;
        let interactive: PropTypes.Requireable<boolean>;
        let legendDirection: PropTypes.Requireable<string>;
        let legendValueFormat: PropTypes.Requireable<NonNullable<string | ((...args: any[]) => any) | null | undefined>>;
        let totalLabel: PropTypes.Requireable<string>;
        let instanceId: PropTypes.Requireable<number>;
    }
    namespace defaultProps {
        let interactive_1: boolean;
        export { interactive_1 as interactive };
        let legendDirection_1: string;
        export { legendDirection_1 as legendDirection };
        let legendValueFormat_1: string;
        export { legendValueFormat_1 as legendValueFormat };
    }
}
import { Component } from '@wordpress/element';
import PropTypes from 'prop-types';
//# sourceMappingURL=legend.d.ts.map