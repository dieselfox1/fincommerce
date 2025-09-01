/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import fastDeepEqual from 'fast-deep-equal/es6';
import {
	FormTokenField,
	// @ts-expect-error Using experimental features
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import { CoreFilterNames, QueryControlProps } from '@fincommerce/block-library/assets/js/blocks/product-collection/types';
import {
	STOCK_STATUS_OPTIONS,
	DEFAULT_FILTERS,
	getDefaultStockStatuses,
} from '@fincommerce/block-library/assets/js/blocks/product-collection/constants';

/**
 * Gets the id of a specific stock status from its text label
 *
 * In theory, we could use a `saveTransform` function on the
 * `FormFieldToken` component to do the conversion. However, plugins
 * can add custom stock statuses which don't conform to our naming
 * conventions.
 */
function getStockStatusIdByLabel( statusLabel: FormTokenField.Value ) {
	const label =
		typeof statusLabel === 'string' ? statusLabel : statusLabel.value;

	return Object.entries( STOCK_STATUS_OPTIONS ).find(
		( [ , value ] ) => value === label
	)?.[ 0 ];
}

const StockStatusControl = ( props: QueryControlProps ) => {
	const { query, trackInteraction, setQueryAttribute } = props;

	const deselectCallback = () => {
		setQueryAttribute( {
			fincommerceStockStatus: DEFAULT_FILTERS.fincommerceStockStatus,
		} );
		trackInteraction( CoreFilterNames.STOCK_STATUS );
	};

	return (
		<ToolsPanelItem
			label={ __( 'Stock Status', 'fincommerce' ) }
			hasValue={ () =>
				! fastDeepEqual(
					query.fincommerceStockStatus,
					getDefaultStockStatuses()
				)
			}
			onDeselect={ deselectCallback }
			resetAllFilter={ deselectCallback }
			isShownByDefault
		>
			<FormTokenField
				label={ __( 'Stock Status', 'fincommerce' ) }
				onChange={ ( statusLabels ) => {
					const fincommerceStockStatus = statusLabels
						.map( getStockStatusIdByLabel )
						.filter( Boolean ) as string[];

					setQueryAttribute( {
						fincommerceStockStatus,
					} );
					trackInteraction( CoreFilterNames.STOCK_STATUS );
				} }
				suggestions={ Object.values( STOCK_STATUS_OPTIONS ) }
				validateInput={ ( value: string ) =>
					Object.values( STOCK_STATUS_OPTIONS ).includes( value )
				}
				value={
					query?.fincommerceStockStatus?.map(
						( key ) => STOCK_STATUS_OPTIONS[ key ]
					) || []
				}
				__experimentalExpandOnFocus={ true }
				__experimentalShowHowTo={ false }
			/>
		</ToolsPanelItem>
	);
};

export default StockStatusControl;
