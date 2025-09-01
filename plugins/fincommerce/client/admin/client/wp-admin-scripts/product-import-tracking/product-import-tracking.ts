/**
 * External dependencies
 */
import {
	addExitPage,
	removeExitPage,
} from '@fincommerce/customer-effort-score';
import { getQuery } from '@fincommerce/navigation';

const ACTION_NAME = 'import_products';

( () => {
	const query: { step?: string; page?: string } = getQuery();

	if ( query.page !== 'product_importer' ) {
		return;
	}

	if ( query.step === 'done' ) {
		removeExitPage( ACTION_NAME );
		return;
	}

	addExitPage( ACTION_NAME );
} )();
