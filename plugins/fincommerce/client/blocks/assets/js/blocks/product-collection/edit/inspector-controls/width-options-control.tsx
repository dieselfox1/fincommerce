/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore - Ignoring because `__experimentalToggleGroupControl` is not yet in the type definitions.
	// eslint-disable-next-line @finpress/no-unsafe-wp-apis
	__experimentalToggleGroupControl as ToggleGroupControl,
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore - Ignoring because `__experimentalToggleGroupControlOption` is not yet in the type definitions.
	// eslint-disable-next-line @finpress/no-unsafe-wp-apis
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
	// @ts-expect-error Using experimental features
	// eslint-disable-next-line @finpress/no-unsafe-wp-apis
	__experimentalToolsPanelItem as ToolsPanelItem,
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore - Ignoring because `__experimentalUnitControl` is not yet in the type definitions.
	// eslint-disable-next-line @finpress/no-unsafe-wp-apis
	__experimentalUnitControl as UnitControl,
} from '@finpress/components';

/**
 * Internal dependencies
 */
import { DimensionsControlProps, WidthOptions } from '@fincommerce/block-library/assets/js/blocks/product-collection/types';

const getHelpText = ( type: WidthOptions ) => {
	if ( type === WidthOptions.FILL ) {
		return __( 'Stretch to fill available space.', 'fincommerce' );
	}

	return __( 'Specify a fixed width.', 'fincommerce' );
};

const WidthOptionsControl = ( {
	dimensions,
	setAttributes,
}: DimensionsControlProps ) => {
	const { widthType, fixedWidth = '' } = dimensions;
	const setDimensions = ( type: WidthOptions ) => {
		setAttributes( {
			dimensions: {
				...dimensions,
				widthType: type,
			},
		} );
	};

	return (
		<ToolsPanelItem
			label={ __( 'Width', 'fincommerce' ) }
			hasValue={ () => widthType !== WidthOptions.FILL }
			isShownByDefault
		>
			<ToggleGroupControl
				label={ __( 'Width', 'fincommerce' ) }
				value={ widthType }
				help={ getHelpText( widthType ) }
				onChange={ ( value: WidthOptions ) => setDimensions( value ) }
				isBlock
			>
				<ToggleGroupControlOption
					value={ WidthOptions.FILL }
					label={ __( 'Fill', 'fincommerce' ) }
				/>
				<ToggleGroupControlOption
					value={ WidthOptions.FIXED }
					label={ __( 'Fixed', 'fincommerce' ) }
				/>
			</ToggleGroupControl>
			{ widthType === WidthOptions.FIXED && (
				<UnitControl
					onChange={ ( value: string ) => {
						setAttributes( {
							dimensions: {
								...dimensions,
								fixedWidth: value,
							},
						} );
					} }
					value={ fixedWidth }
				/>
			) }
		</ToolsPanelItem>
	);
};

export default WidthOptionsControl;
