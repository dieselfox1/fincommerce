export default NumberFilter;
declare class NumberFilter extends Component<any, any, any> {
    constructor(props: any);
    constructor(props: any, context: any);
    getBetweenString(): string;
    getScreenReaderText(filter: any, config: any): string;
    getFormControl({ type, value, label, onChange, currencySymbol, symbolPosition, }: {
        type: any;
        value: any;
        label: any;
        onChange: any;
        currencySymbol: any;
        symbolPosition: any;
    }): JSX.Element;
    getFilterInputs(): Element | JSX.Element;
    getRangeInput(): Element;
    render(): JSX.Element;
}
import { Component } from '@wordpress/element';
//# sourceMappingURL=number-filter.d.ts.map