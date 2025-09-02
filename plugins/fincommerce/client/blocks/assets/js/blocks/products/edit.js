/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import { ToggleControl, SelectControl } from '@finpress/components';

export const getSharedContentControls = ( attributes, setAttributes ) => {
	const { contentVisibility } = attributes;
	return (
		<ToggleControl
			label={ __( 'Show Sorting Dropdown', 'fincommerce' ) }
			checked={ contentVisibility.orderBy }
			onChange={ () =>
				setAttributes( {
					contentVisibility: {
						...contentVisibility,
						orderBy: ! contentVisibility.orderBy,
					},
				} )
			}
		/>
	);
};

export const getSharedListControls = ( attributes, setAttributes ) => {
	return (
		<SelectControl
			label={ __( 'Order Products By', 'fincommerce' ) }
			value={ attributes.orderby }
			options={ [
				{
					label: __( 'Default sorting (menu order)', 'fincommerce' ),
					value: 'menu_order',
				},
				{
					label: __( 'Popularity', 'fincommerce' ),
					value: 'popularity',
				},
				{
					label: __( 'Average rating', 'fincommerce' ),
					value: 'rating',
				},
				{
					label: __( 'Latest', 'fincommerce' ),
					value: 'date',
				},
				{
					label: __( 'Price: low to high', 'fincommerce' ),
					value: 'price',
				},
				{
					label: __( 'Price: high to low', 'fincommerce' ),
					value: 'price-desc',
				},
			] }
			onChange={ ( orderby ) => setAttributes( { orderby } ) }
		/>
	);
};
