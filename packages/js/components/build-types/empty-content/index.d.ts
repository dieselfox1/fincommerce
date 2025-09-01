export default EmptyContent;
/**
 * A component to be used when there is no data to show.
 * It can be used as an opportunity to provide explanation or guidance to help a user progress.
 */
declare class EmptyContent extends Component<any, any, any> {
    constructor(props: any);
    constructor(props: any, context: any);
    renderIllustration(): JSX.Element;
    renderActionButtons(type: any): JSX.Element | null;
    renderActions(): JSX.Element;
    render(): JSX.Element;
}
declare namespace EmptyContent {
    namespace propTypes {
        let title: PropTypes.Validator<string>;
        let message: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        let illustration: PropTypes.Requireable<string>;
        let illustrationHeight: PropTypes.Requireable<number>;
        let illustrationWidth: PropTypes.Requireable<number>;
        let actionLabel: PropTypes.Validator<string>;
        let actionURL: PropTypes.Requireable<string>;
        let actionCallback: PropTypes.Requireable<(...args: any[]) => any>;
        let secondaryActionLabel: PropTypes.Requireable<string>;
        let secondaryActionURL: PropTypes.Requireable<string>;
        let secondaryActionCallback: PropTypes.Requireable<(...args: any[]) => any>;
        let className: PropTypes.Requireable<string>;
    }
    namespace defaultProps {
        let illustration_1: string;
        export { illustration_1 as illustration };
        let illustrationWidth_1: number;
        export { illustrationWidth_1 as illustrationWidth };
    }
}
import { Component } from '@wordpress/element';
import PropTypes from 'prop-types';
//# sourceMappingURL=index.d.ts.map