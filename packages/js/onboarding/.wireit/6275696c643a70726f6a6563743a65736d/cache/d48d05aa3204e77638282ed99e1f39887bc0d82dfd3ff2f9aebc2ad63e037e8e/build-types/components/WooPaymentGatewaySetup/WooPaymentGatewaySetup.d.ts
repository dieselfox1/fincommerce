import { Slot } from '@wordpress/components';
type WooPaymentGatewaySetupProps = {
    id: string;
};
/**
 * FinCommerce Payment Gateway setup.
 *
 * @slotFill WooPaymentGatewaySetup
 * @scope fincommerce-admin
 * @param {Object} props    React props.
 * @param {string} props.id Setup id.
 */
export declare const WooPaymentGatewaySetup: {
    ({ id, ...props }: WooPaymentGatewaySetupProps): JSX.Element;
    Slot({ id, fillProps, }: WooPaymentGatewaySetupProps & {
        fillProps?: React.ComponentProps<typeof Slot>["fillProps"];
    }): JSX.Element;
};
export {};
//# sourceMappingURL=WooPaymentGatewaySetup.d.ts.map