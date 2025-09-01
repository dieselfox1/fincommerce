/**
 * External dependencies
 */
import {
	PlainPaymentMethods,
	PlainExpressPaymentMethods,
} from '@fincommerce/types';
import type {
	EmptyObjectType,
	ObjectType,
	FieldValidationStatus,
} from '@fincommerce/types';
import { DataRegistry } from '@wordpress/data';

/**
 * Internal dependencies
 */
import type { EventObserversType } from '@fincommerce/block-library/assets/js/base/context/event-emit';
import type { DispatchFromMap } from '@fincommerce/block-library/assets/js/data/mapped-types';
import * as actions from '@fincommerce/block-library/assets/js/data/payment/actions';

export interface CardNetworks {
	preferred: string;
}

export interface CustomerPaymentMethodConfiguration {
	gateway: string;
	brand: string;
	last4: string;
	display_brand?: string;
	networks?: CardNetworks;
}
export interface SavedPaymentMethod {
	method: CustomerPaymentMethodConfiguration;
	expires: string;
	is_default: boolean;
	tokenId: number;
	actions: ObjectType;
}
export type SavedPaymentMethods =
	| Record< string, SavedPaymentMethod[] >
	| EmptyObjectType;

export interface PaymentMethodDispatchers {
	setRegisteredPaymentMethods: (
		paymentMethods: PlainPaymentMethods
	) => void;
	setRegisteredExpressPaymentMethods: (
		paymentMethods: PlainExpressPaymentMethods
	) => void;
	setActivePaymentMethod: (
		paymentMethod: string,
		paymentMethodData?: ObjectType | EmptyObjectType
	) => void;
}

export interface PaymentStatusDispatchers {
	pristine: () => void;
	started: () => void;
	processing: () => void;
	error: ( error: string ) => void;
	failed: (
		error?: string,
		paymentMethodData?: ObjectType | EmptyObjectType,
		billingAddress?: ObjectType | EmptyObjectType
	) => void;
	success: (
		paymentMethodData?: ObjectType | EmptyObjectType,
		billingAddress?: ObjectType | EmptyObjectType,
		shippingData?: ObjectType | EmptyObjectType
	) => void;
}

export type PaymentMethodsDispatcherType = (
	paymentMethods: PlainPaymentMethods
) => undefined | void;

/**
 * Type for emitProcessingEventType() thunk
 */
export type emitProcessingEventType = (
	observers: EventObserversType,
	setValidationErrors: (
		errors: Record< string, FieldValidationStatus >
	) => void
) => ( {
	dispatch,
	registry,
}: {
	dispatch: DispatchFromMap< typeof actions >;
	registry: DataRegistry;
} ) => void;

export interface PaymentStatus {
	isPristine?: boolean;
	isStarted?: boolean;
	isProcessing?: boolean;
	isFinished?: boolean;
	hasError?: boolean;
	hasFailed?: boolean;
	isSuccessful?: boolean;
}
