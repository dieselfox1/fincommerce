export default AbbreviatedCard;
declare function AbbreviatedCard({ children, className, href, icon, onClick, type, }: {
    children: any;
    className: any;
    href: any;
    icon: any;
    onClick: any;
    type: any;
}): JSX.Element;
declare namespace AbbreviatedCard {
    namespace propTypes {
        let children: PropTypes.Validator<NonNullable<PropTypes.ReactNodeLike>>;
        let className: PropTypes.Requireable<string>;
        let href: PropTypes.Validator<string>;
        let icon: PropTypes.Validator<PropTypes.ReactElementLike>;
        let onClick: PropTypes.Requireable<(...args: any[]) => any>;
        let type: PropTypes.Requireable<string>;
    }
}
import PropTypes from 'prop-types';
//# sourceMappingURL=index.d.ts.map