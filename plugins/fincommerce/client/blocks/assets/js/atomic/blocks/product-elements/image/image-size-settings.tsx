/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { BlockAttributes } from '@wordpress/blocks';
import {
	// @ts-expect-error Using experimental features
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToggleGroupControl as ToggleGroupControl,
	// @ts-expect-error Using experimental features
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
	// @ts-expect-error Using experimental features
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToolsPanel as ToolsPanel,
	// @ts-expect-error Using experimental features
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToolsPanelItem as ToolsPanelItem,
	// @ts-expect-error Using experimental features
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalUnitControl as UnitControl,
} from '@wordpress/components';

interface ImageSizeSettingProps {
	scale: string;
	width: string | undefined;
	height: string | undefined;
	setAttributes: ( attrs: BlockAttributes ) => void;
}

const scaleHelp: Record< string, string > = {
	cover: __(
		'Image is scaled and cropped to fill the entire space without being distorted.',
		'fincommerce'
	),
	contain: __(
		'Image is scaled to fill the space without clipping nor distorting.',
		'fincommerce'
	),
	fill: __(
		'Image will be stretched and distorted to completely fill the space.',
		'fincommerce'
	),
};

const sizeUnits: { value: string; label: string }[] = [
	{
		value: 'px',
		label: 'px',
	},
	{
		value: 'em',
		label: 'em',
	},
	{
		value: 'rem',
		label: 'rem',
	},
	{
		value: '%',
		label: '%',
	},
	{
		value: 'vw',
		label: 'vw',
	},
	{
		value: 'vh',
		label: 'vh',
	},
];

export const ImageSizeSettings = ( {
	scale,
	width,
	height,
	setAttributes,
}: ImageSizeSettingProps ) => {
	return (
		<ToolsPanel
			className="wc-block-product-image__tools-panel"
			label={ __( 'Image size', 'fincommerce' ) }
		>
			<UnitControl
				label={ __( 'Height', 'fincommerce' ) }
				onChange={ ( value: string ) => {
					setAttributes( { height: value } );
				} }
				value={ height }
				units={ sizeUnits }
			/>
			<UnitControl
				label={ __( 'Width', 'fincommerce' ) }
				onChange={ ( value: string ) => {
					setAttributes( { width: value } );
				} }
				value={ width }
				units={ sizeUnits }
			/>
			{ height && (
				<ToolsPanelItem
					hasValue={ () => true }
					label={ __( 'Scale', 'fincommerce' ) }
				>
					<ToggleGroupControl
						label={ __( 'Scale', 'fincommerce' ) }
						value={ scale }
						help={ scaleHelp[ scale ] }
						onChange={ ( value: string ) =>
							setAttributes( {
								scale: value,
							} )
						}
						isBlock
					>
						<>
							<ToggleGroupControlOption
								value="cover"
								label={ __( 'Cover', 'fincommerce' ) }
							/>
							<ToggleGroupControlOption
								value="contain"
								label={ __( 'Contain', 'fincommerce' ) }
							/>
							<ToggleGroupControlOption
								value="fill"
								label={ __( 'Fill', 'fincommerce' ) }
							/>
						</>
					</ToggleGroupControl>
				</ToolsPanelItem>
			) }
		</ToolsPanel>
	);
};
