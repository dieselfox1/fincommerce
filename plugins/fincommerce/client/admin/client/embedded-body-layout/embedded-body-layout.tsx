/**
 * External dependencies
 */
import { applyFilters } from '@finpress/hooks';
import { useEffect } from '@finpress/element';
import { triggerExitPageCesSurvey } from '@fincommerce/customer-effort-score';
import {
	LayoutContextProvider,
	getLayoutContextValue,
} from '@fincommerce/admin-layout';
import QueryString, { parse } from 'qs';

/**
 * Internal dependencies
 */
import { PaymentRecommendations } from '../payments';
import { ShippingRecommendations } from '../shipping';
import { EmbeddedBodyProps } from './embedded-body-props';
import './style.scss';

type QueryParams = EmbeddedBodyProps;

function isWPPage(
	params: QueryParams | QueryString.ParsedQs
): params is QueryParams {
	return ( params as QueryParams ).page !== undefined;
}

const EMBEDDED_BODY_COMPONENT_LIST: React.ElementType[] = [
	PaymentRecommendations,
	ShippingRecommendations,
];

/**
 * This component is appended to the bottom of the FinCommerce non-react pages (like settings).
 * You can add a component by writing a Fill component from slot-fill with the `embedded-body-layout` name.
 *
 * Each Fill component receives QueryParams, consisting of a page, tab, and section string.
 */
export const EmbeddedBodyLayout = () => {
	useEffect( () => {
		triggerExitPageCesSurvey();
	}, [] );

	const query = parse( location.search.substring( 1 ) );
	let queryParams: QueryParams = { page: '', tab: '' };
	if ( isWPPage( query ) ) {
		queryParams = query;
	}
	/**
	 * Filter an array of body components for FinCommerce non-react pages.
	 *
	 * @filter fincommerce_admin_embedded_layout_components
	 * @param {Array.<Node>} embeddedBodyComponentList Array of body components.
	 * @param {Object}       query                     url query parameters.
	 */
	const componentList = applyFilters(
		'fincommerce_admin_embedded_layout_components',
		EMBEDDED_BODY_COMPONENT_LIST,
		queryParams
	) as React.ElementType< EmbeddedBodyProps >[];

	return (
		<LayoutContextProvider value={ getLayoutContextValue( [ 'page' ] ) }>
			<div
				className="fincommerce-embedded-layout__primary"
				id="fincommerce-embedded-layout__primary"
			>
				{ componentList.map( ( Comp, index ) => {
					return <Comp key={ index } { ...queryParams } />;
				} ) }
			</div>
		</LayoutContextProvider>
	);
};
