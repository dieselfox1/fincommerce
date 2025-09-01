/**
 * Internal dependencies
 */
import StoreDetailsHeader from './store-details';
import CustomizeStoreHeader from './customize-store';
import TaxHeader from './tax';
import MarketingHeader from './marketing';
import AppearanceHeader from './appearance';
import ShippingHeader from './shipping';
import ProductsHeader from './products';
import PurchaseHeader from './purchase';
import PaymentsHeader from './payments';
import fincommercePaymentsHeader from './fincommerce-payments';
import LaunchYourStoreHeader from './launch-your-store';

export const taskHeaders: Record< string, React.ElementType > = {
	store_details: StoreDetailsHeader,
	'customize-store': CustomizeStoreHeader,
	tax: TaxHeader,
	shipping: ShippingHeader,
	marketing: MarketingHeader,
	appearance: AppearanceHeader,
	payments: PaymentsHeader,
	products: ProductsHeader,
	purchase: PurchaseHeader,
	'fincommerce-payments': fincommercePaymentsHeader,
	'launch-your-store': LaunchYourStoreHeader,
};
