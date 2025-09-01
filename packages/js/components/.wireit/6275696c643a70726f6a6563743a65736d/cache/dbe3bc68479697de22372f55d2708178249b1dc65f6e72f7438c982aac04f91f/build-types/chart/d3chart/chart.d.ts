export default D3Chart;
/**
 * A simple D3 line and bar chart component for timeseries data in React.
 */
declare class D3Chart extends Component<any, any, any> {
    constructor(props: any);
    drawChart(node: any): void;
    getParams(uniqueDates: any): {
        getColor: (key: any) => any;
        interval: any;
        mode: any;
        chartType: any;
        uniqueDates: any;
        visibleKeys: any;
    };
    tooltipRef: import("react").RefObject<any>;
    getFormatParams(): {
        screenReaderFormat: Function;
        xFormat: Function;
        x2Format: Function;
        yBelow1Format: Function;
        yFormat: Function;
    };
    getScaleParams(uniqueDates: any): {
        step: any;
        xScale: Function;
        yMax: any;
        yMin: any;
        yScale: Function;
        xGroupScale?: undefined;
    } | {
        step: any;
        xGroupScale: Function;
        xScale: Function;
        yMax: any;
        yMin: any;
        yScale: Function;
    };
    createTooltip(chart: any, getColorFunction: any, visibleKeys: any): void;
    tooltip: ChartTooltip | undefined;
    shouldBeCompact(): boolean;
    getMargin(): any;
    getWidth(): any;
    getEmptyMessage(): JSX.Element | undefined;
    render(): JSX.Element;
}
declare namespace D3Chart {
    namespace propTypes {
        let baseValue: PropTypes.Requireable<number>;
        let className: PropTypes.Requireable<string>;
        let colorScheme: PropTypes.Requireable<(...args: any[]) => any>;
        let data: PropTypes.Validator<any[]>;
        let dateParser: PropTypes.Validator<string>;
        let emptyMessage: PropTypes.Requireable<string>;
        let height: PropTypes.Requireable<number>;
        let interval: PropTypes.Requireable<string>;
        let margin: PropTypes.Requireable<PropTypes.InferProps<{
            bottom: PropTypes.Requireable<number>;
            left: PropTypes.Requireable<number>;
            right: PropTypes.Requireable<number>;
            top: PropTypes.Requireable<number>;
        }>>;
        let mode: PropTypes.Requireable<string>;
        let screenReaderFormat: PropTypes.Requireable<NonNullable<string | ((...args: any[]) => any) | null | undefined>>;
        let orderedKeys: PropTypes.Requireable<any[]>;
        let tooltipLabelFormat: PropTypes.Requireable<NonNullable<string | ((...args: any[]) => any) | null | undefined>>;
        let tooltipValueFormat: PropTypes.Requireable<NonNullable<string | ((...args: any[]) => any) | null | undefined>>;
        let tooltipPosition: PropTypes.Requireable<string>;
        let tooltipTitle: PropTypes.Requireable<string>;
        let chartType: PropTypes.Requireable<string>;
        let width: PropTypes.Requireable<number>;
        let xFormat: PropTypes.Requireable<NonNullable<string | ((...args: any[]) => any) | null | undefined>>;
        let x2Format: PropTypes.Requireable<NonNullable<string | ((...args: any[]) => any) | null | undefined>>;
        let yBelow1Format: PropTypes.Requireable<NonNullable<string | ((...args: any[]) => any) | null | undefined>>;
        let yFormat: PropTypes.Requireable<NonNullable<string | ((...args: any[]) => any) | null | undefined>>;
    }
    namespace defaultProps {
        let baseValue_1: number;
        export { baseValue_1 as baseValue };
        let data_1: never[];
        export { data_1 as data };
        let dateParser_1: string;
        export { dateParser_1 as dateParser };
        let height_1: number;
        export { height_1 as height };
        export namespace margin_1 {
            let bottom: number;
            let left: number;
            let right: number;
            let top: number;
        }
        export { margin_1 as margin };
        let mode_1: string;
        export { mode_1 as mode };
        let screenReaderFormat_1: string;
        export { screenReaderFormat_1 as screenReaderFormat };
        let tooltipPosition_1: string;
        export { tooltipPosition_1 as tooltipPosition };
        let tooltipLabelFormat_1: string;
        export { tooltipLabelFormat_1 as tooltipLabelFormat };
        let tooltipValueFormat_1: string;
        export { tooltipValueFormat_1 as tooltipValueFormat };
        let chartType_1: string;
        export { chartType_1 as chartType };
        let width_1: number;
        export { width_1 as width };
        let xFormat_1: string;
        export { xFormat_1 as xFormat };
        let x2Format_1: string;
        export { x2Format_1 as x2Format };
        let yBelow1Format_1: string;
        export { yBelow1Format_1 as yBelow1Format };
        let yFormat_1: string;
        export { yFormat_1 as yFormat };
    }
}
import { Component } from '@wordpress/element';
import ChartTooltip from './utils/tooltip';
import PropTypes from 'prop-types';
//# sourceMappingURL=chart.d.ts.map