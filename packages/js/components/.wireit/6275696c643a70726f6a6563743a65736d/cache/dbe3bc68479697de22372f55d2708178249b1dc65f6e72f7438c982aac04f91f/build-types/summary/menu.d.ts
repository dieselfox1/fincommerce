export default Menu;
declare function Menu({ label, orientation, itemCount, items }: {
    label: any;
    orientation: any;
    itemCount: any;
    items: any;
}): JSX.Element;
declare namespace Menu {
    namespace propTypes {
        let label: PropTypes.Requireable<string>;
        let orientation: PropTypes.Validator<string>;
        let items: PropTypes.Validator<NonNullable<PropTypes.ReactNodeLike>>;
        let itemCount: PropTypes.Validator<number>;
    }
}
import PropTypes from 'prop-types';
//# sourceMappingURL=menu.d.ts.map