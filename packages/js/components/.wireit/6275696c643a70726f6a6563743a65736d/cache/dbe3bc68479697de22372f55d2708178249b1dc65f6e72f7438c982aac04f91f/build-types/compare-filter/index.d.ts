export { default as CompareButton } from "./button";
/**
 * Displays a card + search used to filter results as a comparison between objects.
 */
export class CompareFilter extends Component<any, any, any> {
    constructor({ getLabels, param, query }: {
        getLabels: any;
        param: any;
        query: any;
    }, ...args: any[]);
    state: {
        selected: never[];
    };
    clearQuery(): void;
    updateQuery(): void;
    updateLabels(selected: any): void;
    onButtonClicked(e: any): void;
    componentDidUpdate({ param: prevParam, query: prevQuery }: {
        param: any;
        query: any;
    }, { selected: prevSelected }: {
        selected: any;
    }): void;
    render(): JSX.Element;
}
export namespace CompareFilter {
    namespace propTypes {
        let getLabels: PropTypes.Validator<(...args: any[]) => any>;
        let labels: PropTypes.Requireable<PropTypes.InferProps<{
            /**
             * Label for the search placeholder.
             */
            placeholder: PropTypes.Requireable<string>;
            /**
             * Label for the card title.
             */
            title: PropTypes.Requireable<string>;
            /**
             * Label for button which updates the URL/report.
             */
            update: PropTypes.Requireable<string>;
        }>>;
        let param: PropTypes.Validator<string>;
        let path: PropTypes.Validator<string>;
        let query: PropTypes.Requireable<object>;
        let type: PropTypes.Validator<string>;
        let autocompleter: PropTypes.Requireable<object>;
    }
    namespace defaultProps {
        let labels_1: {};
        export { labels_1 as labels };
        let query_1: {};
        export { query_1 as query };
    }
}
import { Component } from '@wordpress/element';
import PropTypes from 'prop-types';
//# sourceMappingURL=index.d.ts.map