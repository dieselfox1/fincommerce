import { Slot } from '@wordpress/components';
type WooPaymentGatewayConfigureProps = {
    id: string;
};
/**
 * FinCommerce Payment Gateway configuration
 *
 * @slotFill WooPaymentGatewayConfigure
 * @scope fincommerce-admin
 * @param {Object} props    React props.
 * @param {string} props.id gateway id.
 */
export declare const WooPaymentGatewayConfigure: {
    ({ id, ...props }: WooPaymentGatewayConfigureProps): JSX.Element;
    Slot({ id, fillProps, }: WooPaymentGatewayConfigureProps & {
        fillProps?: React.ComponentProps<typeof Slot>["fillProps"];
    }): JSX.Element;
};
export {};
//# sourceMappingURL=WooPaymentGatewayConfigure.d.ts.map