import { PaymentGateway } from './types';
export declare function getPaymentGateways(): Generator<Object, void, PaymentGateway[]>;
export declare function getPaymentGateway(id: string): Generator<{
    type: string;
    request: import("@wordpress/api-fetch/build-types/types").APIFetchOptions;
} | {
    type: import("./action-types").ACTION_TYPES.GET_PAYMENT_GATEWAY_REQUEST;
} | {
    type: import("./action-types").ACTION_TYPES.GET_PAYMENT_GATEWAY_ERROR;
    error: unknown;
} | {
    type: import("./action-types").ACTION_TYPES.GET_PAYMENT_GATEWAY_SUCCESS;
    paymentGateway: PaymentGateway;
}, PaymentGateway | undefined, PaymentGateway>;
//# sourceMappingURL=resolvers.d.ts.map