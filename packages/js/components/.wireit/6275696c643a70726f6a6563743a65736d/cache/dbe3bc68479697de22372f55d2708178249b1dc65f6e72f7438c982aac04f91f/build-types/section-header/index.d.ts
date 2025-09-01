export default SectionHeader;
/**
 * A header component. The header can contain a title, actions via children, and an `EllipsisMenu` menu.
 */
declare class SectionHeader extends Component<any, any, any> {
    constructor(props: any);
    constructor(props: any, context: any);
    render(): JSX.Element;
}
declare namespace SectionHeader {
    namespace propTypes {
        let className: PropTypes.Requireable<string>;
        let menu: (props: any, propName: any, componentName: any) => Error | undefined;
        let title: PropTypes.Validator<NonNullable<NonNullable<PropTypes.ReactNodeLike>>>;
    }
}
import { Component } from '@wordpress/element';
import PropTypes from 'prop-types';
//# sourceMappingURL=index.d.ts.map