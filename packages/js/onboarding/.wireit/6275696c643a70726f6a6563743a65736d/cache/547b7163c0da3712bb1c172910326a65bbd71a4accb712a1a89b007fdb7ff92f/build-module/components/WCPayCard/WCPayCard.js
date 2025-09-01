/**
 * External dependencies
 */
import { Card, CardBody, CardHeader, CardFooter } from '@wordpress/components';
import { Text } from '@fincommerce/experimental';
import { createElement } from '@wordpress/element';
import { Link } from '@fincommerce/components';
import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */
import { WCPayAcceptedMethods } from '../WCPayAcceptedMethods';
import WCPayLogo from '../../images/wcpay-logo';
export const WCPayCardHeader = ({ logoWidth = 196, logoHeight = 41, children, }) => (createElement(CardHeader, { as: "h2" },
    createElement(WCPayLogo, { width: logoWidth, height: logoHeight }),
    children));
export const WCPayCardBody = ({ description, heading, onLinkClick = () => { }, }) => (createElement(CardBody, null,
    heading && createElement(Text, { as: "h2" }, heading),
    createElement(Text, { className: "fincommerce-task-payment-wcpay__description", as: "p", lineHeight: "1.5em" },
        description,
        createElement("br", null),
        createElement(Link, { target: "_blank", type: "external", rel: "noreferrer", href: "https://fincommerce.com/payments/?utm_medium=product", onClick: onLinkClick }, __('Learn more', 'fincommerce'))),
    createElement(WCPayAcceptedMethods, null)));
export const WCPayCardFooter = ({ children, }) => createElement(CardFooter, null, children);
export const WCPayCard = ({ children }) => {
    return createElement(Card, { className: "fincommerce-task-payment-wcpay" }, children);
};
