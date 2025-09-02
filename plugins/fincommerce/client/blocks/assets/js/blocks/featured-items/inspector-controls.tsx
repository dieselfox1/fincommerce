/* eslint-disable @finpress/no-unsafe-wp-apis */

/**
 * External dependencies
 */
import { WP_REST_API_Category } from 'wp-types';
import { __ } from '@finpress/i18n';
import {
	InspectorControls as GutenbergInspectorControls,
	__experimentalPanelColorGradientSettings as PanelColorGradientSettings,
	__experimentalUseGradient as useGradient,
} from '@finpress/block-editor';
import {
	FocalPointPicker,
	PanelBody,
	RangeControl,
	ToggleControl,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
	TextareaControl,
	ExternalLink,
	Notice,
} from '@finpress/components';
import { LooselyMustHave, ProductResponseItem } from '@fincommerce/types';
import type { ComponentType } from 'react';

/**
 * Internal dependencies
 */
import { useBackgroundImage } from '@fincommerce/block-library/assets/js/blocks/featured-items/use-background-image';
import { BLOCK_NAMES } from '@fincommerce/block-library/assets/js/blocks/featured-items/constants';
import { FeaturedItemRequiredAttributes } from '@fincommerce/block-library/assets/js/blocks/featured-items/with-featured-item';
import { EditorBlock, ImageFit } from '@fincommerce/block-library/assets/js/blocks/featured-items/types';

type InspectorControlRequiredKeys =
	| 'dimRatio'
	| 'focalPoint'
	| 'hasParallax'
	| 'imageFit'
	| 'isRepeated'
	| 'overlayColor'
	| 'overlayGradient'
	| 'showDesc';

interface InspectorControlsRequiredAttributes
	extends LooselyMustHave<
		FeaturedItemRequiredAttributes,
		InspectorControlRequiredKeys
	> {
	alt: string;
	backgroundImageSrc: string;
	contentPanel: JSX.Element | undefined;
}

interface InspectorControlsProps extends InspectorControlsRequiredAttributes {
	setAttributes: (
		attrs: Partial< InspectorControlsRequiredAttributes >
	) => void;
	// Gutenberg doesn't provide some types, so we have to hard-code them here
	setGradient: ( newGradientValue: string ) => void;
}

interface WithInspectorControlsRequiredProps< T > {
	attributes: InspectorControlsRequiredAttributes &
		EditorBlock< T >[ 'attributes' ];
	setAttributes: InspectorControlsProps[ 'setAttributes' ];
	backgroundColorVisibilityStatus: {
		isBackgroundVisible: boolean;
		message: string | null;
	};
}

interface WithInspectorControlsCategoryProps< T >
	extends WithInspectorControlsRequiredProps< T > {
	category: WP_REST_API_Category;
	product: never;
}

interface WithInspectorControlsProductProps< T >
	extends WithInspectorControlsRequiredProps< T > {
	category: never;
	product: ProductResponseItem;
	showPrice: boolean;
}

type WithInspectorControlsProps< T extends EditorBlock< T > > =
	| ( T & WithInspectorControlsCategoryProps< T > )
	| ( T & WithInspectorControlsProductProps< T > );

export const InspectorControls = ( {
	alt,
	backgroundImageSrc,
	contentPanel,
	dimRatio,
	focalPoint,
	hasParallax,
	imageFit,
	isRepeated,
	overlayColor,
	overlayGradient,
	setAttributes,
	setGradient,
	showDesc,
	backgroundColorVisibilityStatus,
	backgroundColor,
}: InspectorControlsProps ) => {
	// FocalPointPicker was introduced in Gutenberg 5.0 (finpress 5.2),
	// so we need to check if it exists before using it.
	const focalPointPickerExists = typeof FocalPointPicker === 'function';

	const isImgElement = ! isRepeated && ! hasParallax;

	return (
		<>
			<GutenbergInspectorControls key="inspector">
				<PanelBody title={ __( 'Content', 'fincommerce' ) }>
					<ToggleControl
						label={ __( 'Show description', 'fincommerce' ) }
						checked={ showDesc }
						onChange={ () =>
							setAttributes( { showDesc: ! showDesc } )
						}
					/>
					{ contentPanel }
				</PanelBody>
				{ !! backgroundImageSrc && (
					<>
						{ focalPointPickerExists && (
							<PanelBody
								title={ __( 'Media settings', 'fincommerce' ) }
							>
								<ToggleControl
									label={ __(
										'Fixed background',
										'fincommerce'
									) }
									checked={ hasParallax }
									onChange={ () => {
										setAttributes( {
											hasParallax: ! hasParallax,
										} );
									} }
								/>
								<ToggleControl
									label={ __(
										'Repeated background',
										'fincommerce'
									) }
									checked={ isRepeated }
									onChange={ () => {
										setAttributes( {
											isRepeated: ! isRepeated,
										} );
									} }
								/>
								{ ! isRepeated && (
									<ToggleGroupControl
										help={
											<>
												<span
													style={ {
														display: 'block',
														marginBottom: '1em',
													} }
												>
													{ __(
														'Select “Cover” to have the image automatically fit its container.',
														'fincommerce'
													) }
												</span>
												<span>
													{ __(
														'This may affect your ability to freely move the focal point of the image.',
														'fincommerce'
													) }
												</span>
											</>
										}
										label={ __(
											'Image fit',
											'fincommerce'
										) }
										isBlock
										value={ imageFit }
										onChange={ ( value: ImageFit ) =>
											setAttributes( {
												imageFit: value,
											} )
										}
									>
										<ToggleGroupControlOption
											label={ __(
												'None',
												'fincommerce'
											) }
											value="none"
										/>
										<ToggleGroupControlOption
											/* translators: "Cover" is a verb that indicates an image covering the entire container. */
											label={ __(
												'Cover',
												'fincommerce'
											) }
											value="cover"
										/>
									</ToggleGroupControl>
								) }
								<FocalPointPicker
									label={ __(
										'Focal Point Picker',
										'fincommerce'
									) }
									url={ backgroundImageSrc }
									value={ focalPoint }
									onChange={ ( value ) =>
										setAttributes( {
											focalPoint: value,
										} )
									}
								/>
								{ isImgElement && (
									<TextareaControl
										label={ __(
											'Alt text (alternative text)',
											'fincommerce'
										) }
										value={ alt }
										onChange={ ( value: string ) => {
											setAttributes( { alt: value } );
										} }
										help={
											<>
												<ExternalLink href="https://www.w3.org/WAI/tutorials/images/decision-tree">
													{ __(
														'Describe the purpose of the image',
														'fincommerce'
													) }
												</ExternalLink>
											</>
										}
									/>
								) }
							</PanelBody>
						) }
						<PanelColorGradientSettings
							__experimentalHasMultipleOrigins
							__experimentalIsRenderedInSidebar
							title={ __( 'Overlay', 'fincommerce' ) }
							initialOpen={ true }
							settings={ [
								{
									colorValue: overlayColor,
									gradientValue: overlayGradient,
									onColorChange: ( value: string ) =>
										setAttributes( {
											overlayColor: value,
										} ),
									onGradientChange: ( value: string ) => {
										setGradient( value );
										setAttributes( {
											overlayGradient: value,
										} );
									},
									label: __( 'Color', 'fincommerce' ),
								},
							] }
						>
							<RangeControl
								label={ __( 'Opacity', 'fincommerce' ) }
								value={ dimRatio }
								onChange={ ( value ) =>
									setAttributes( {
										dimRatio: value as number,
									} )
								}
								min={ 0 }
								max={ 100 }
								step={ 10 }
								required
							/>
						</PanelColorGradientSettings>
					</>
				) }
			</GutenbergInspectorControls>
			<GutenbergInspectorControls group="color">
				{ backgroundColorVisibilityStatus &&
					backgroundColorVisibilityStatus.isBackgroundVisible ===
						false &&
					backgroundColorVisibilityStatus.message &&
					backgroundColor && (
						<div className="image-bg-color-warning">
							<Notice status="warning" isDismissible={ false }>
								{ backgroundColorVisibilityStatus.message }
							</Notice>
						</div>
					) }
			</GutenbergInspectorControls>
		</>
	);
};

export const withInspectorControls =
	< T extends EditorBlock< T > >( Component: ComponentType< T > ) =>
	( props: WithInspectorControlsProps< T > ) => {
		const {
			attributes,
			name,
			setAttributes,
			backgroundColorVisibilityStatus,
		} = props;
		const {
			alt,
			dimRatio,
			focalPoint,
			hasParallax,
			isRepeated,
			imageFit,
			mediaId,
			mediaSrc,
			overlayColor,
			overlayGradient,
			showDesc,
			showPrice,
			backgroundColor,
			style,
		} = attributes;

		const item =
			name === BLOCK_NAMES.featuredProduct
				? props.product
				: props.category;

		const { setGradient } = useGradient( {
			gradientAttribute: 'overlayGradient',
			customGradientAttribute: 'overlayGradient',
		} );

		const contentPanel =
			name === BLOCK_NAMES.featuredProduct ? (
				<ToggleControl
					label={ __( 'Show price', 'fincommerce' ) }
					checked={ showPrice }
					onChange={ () =>
						setAttributes( {
							showPrice: ! showPrice,
						} )
					}
				/>
			) : undefined;

		const { backgroundImageSrc } = useBackgroundImage( {
			item,
			mediaId,
			mediaSrc,
			blockName: name,
		} );

		return (
			<>
				<InspectorControls
					alt={ alt }
					backgroundImageSrc={ backgroundImageSrc }
					contentPanel={ contentPanel }
					dimRatio={ dimRatio }
					focalPoint={ focalPoint }
					hasParallax={ hasParallax }
					isRepeated={ isRepeated }
					imageFit={ imageFit }
					overlayColor={ overlayColor }
					overlayGradient={ overlayGradient }
					setAttributes={ setAttributes }
					setGradient={ setGradient }
					showDesc={ showDesc }
					backgroundColorVisibilityStatus={
						backgroundColorVisibilityStatus
					}
					backgroundColor={
						backgroundColor || style?.color?.background
					}
				/>
				<Component { ...props } />
			</>
		);
	};
