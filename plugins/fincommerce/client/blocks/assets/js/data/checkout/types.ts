/**
 * External dependencies
 */
import type { WPNotice } from '@finpress/notices/build-types/store/selectors';
import type { FieldValidationStatus } from '@fincommerce/types';
import { AdditionalValues } from '@fincommerce/settings';

/**
 * Internal dependencies
 */
import type { CheckoutState } from '@fincommerce/block-library/assets/js/data/checkout/default-state';
import type { PaymentState } from '@fincommerce/block-library/assets/js/data/payment/default-state';
import type { CheckoutThunkArgs } from '@fincommerce/block-library/assets/js/data/checkout/thunks';

export type CheckoutAfterProcessingWithErrorEventData = {
	redirectUrl: CheckoutState[ 'redirectUrl' ];
	orderId: CheckoutState[ 'orderId' ];
	customerId: CheckoutState[ 'customerId' ];
	orderNotes: CheckoutState[ 'orderNotes' ];
	processingResponse: PaymentState[ 'paymentResult' ];
};
export type CheckoutAndPaymentNotices = {
	checkoutNotices: WPNotice[];
	paymentNotices: WPNotice[];
	expressPaymentNotices: WPNotice[];
};

/**
 * Type for emitAfterProcessingEventsType() thunk
 */
export type emitAfterProcessingEventsType = ( {
	notices,
}: {
	notices: CheckoutAndPaymentNotices;
} ) => ( { select, dispatch, registry }: CheckoutThunkArgs ) => void;

/**
 * Type for emitValidateEventType() thunk
 */
export type emitValidateEventType = ( {
	setValidationErrors,
}: {
	setValidationErrors: (
		errors: Record< string, FieldValidationStatus >
	) => void;
} ) => ( { dispatch, registry }: CheckoutThunkArgs ) => void;

export type CheckoutPutData = {
	additional_fields?: AdditionalValues;
	order_notes?: string;
	payment_method?: string;
};
