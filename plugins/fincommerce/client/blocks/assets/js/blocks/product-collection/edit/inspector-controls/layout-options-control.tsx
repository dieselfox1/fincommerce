/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore - Ignoring because `__experimentalToggleGroupControl` is not yet in the type definitions.
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToggleGroupControl as ToggleGroupControl,
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore - Ignoring because `__experimentalToggleGroupControlOption` is not yet in the type definitions.
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import { DisplayLayoutControlProps, LayoutOptions } from '@fincommerce/block-library/assets/js/blocks/product-collection/types';

const getHelpText = ( layoutOptions: LayoutOptions ) => {
	switch ( layoutOptions ) {
		case LayoutOptions.GRID:
			return __(
				'Display products using rows and columns.',
				'fincommerce'
			);
		case LayoutOptions.STACK:
			return __( 'Display products in a single column.', 'fincommerce' );
		case LayoutOptions.CAROUSEL:
			return __(
				'Display products in a carousel. It displays a single row of products.',
				'fincommerce'
			);
		default:
			return '';
	}
};

const DEFAULT_VALUE = LayoutOptions.GRID;

const LayoutOptionsControl = ( props: DisplayLayoutControlProps ) => {
	const { type, columns, shrinkColumns } = props.displayLayout;
	const setDisplayLayout = ( displayLayout: LayoutOptions ) => {
		props.setAttributes( {
			displayLayout: {
				type: displayLayout,
				columns,
				shrinkColumns,
			},
		} );
	};

	return (
		<ToolsPanelItem
			label={ __( 'Layout', 'fincommerce' ) }
			hasValue={ () => type !== DEFAULT_VALUE }
			isShownByDefault
			onDeselect={ () => {
				setDisplayLayout( LayoutOptions.GRID );
			} }
		>
			<ToggleGroupControl
				label={ __( 'Layout', 'fincommerce' ) }
				isBlock
				onChange={ ( value: LayoutOptions ) => {
					setDisplayLayout( value );
				} }
				help={ getHelpText( type ) }
				value={ type }
			>
				<ToggleGroupControlOption
					value={ LayoutOptions.STACK }
					label={ __( 'Stack', 'fincommerce' ) }
				/>
				<ToggleGroupControlOption
					value={ LayoutOptions.GRID }
					label={ __( 'Grid', 'fincommerce' ) }
				/>
				<ToggleGroupControlOption
					value={ LayoutOptions.CAROUSEL }
					label={ __( 'Carousel', 'fincommerce' ) }
				/>
			</ToggleGroupControl>
		</ToolsPanelItem>
	);
};

export default LayoutOptionsControl;
