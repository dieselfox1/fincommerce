/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import { useSelect } from '@finpress/data';
import {
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
	store as blockEditorStore,
} from '@finpress/block-editor';
import {
	createInterpolateElement,
	useEffect,
	useRef,
} from '@finpress/element';
import { getAdminLink, getSettingWithCoercion } from '@fincommerce/settings';
import { useProduct } from '@fincommerce/entities';
import { isBoolean } from '@fincommerce/types';
import type { BlockEditProps } from '@finpress/blocks';
import { ProductQueryContext as Context } from '@fincommerce/blocks/product-query/types';
import {
	PanelBody,
	ToggleControl,
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore - Ignoring because `__experimentalToggleGroupControl` is not yet in the type definitions.
	// eslint-disable-next-line @finpress/no-unsafe-wp-apis
	__experimentalToggleGroupControl as ToggleGroupControl,
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore - Ignoring because `__experimentalToggleGroupControl` is not yet in the type definitions.
	// eslint-disable-next-line @finpress/no-unsafe-wp-apis
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from '@finpress/components';

/**
 * Internal dependencies
 */
import Block from '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/image/block';
import { useIsDescendentOfSingleProductBlock } from '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/shared/use-is-descendent-of-single-product-block';
import { BlockAttributes, ImageSizing } from '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/image/types';
import { ImageSizeSettings } from '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/image/image-size-settings';

const TEMPLATE = [
	[
		'fincommerce/product-sale-badge',
		{
			align: 'right',
		},
	],
];

const Edit = ( {
	attributes,
	setAttributes,
	context,
	clientId,
}: BlockEditProps< BlockAttributes > & { context: Context } ): JSX.Element => {
	const { showProductLink, imageSizing, width, height, scale } = attributes;

	const ref = useRef< HTMLDivElement >( null );

	const blockProps = useBlockProps();
	const { wasBlockJustInserted, isInProductGallery } = useSelect(
		( select ) => {
			return {
				wasBlockJustInserted:
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-expect-error method exists but not typed
					select( blockEditorStore ).wasBlockJustInserted( clientId ),
				isInProductGallery:
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-expect-error method exists but not typed
					select( blockEditorStore ).getBlockParentsByBlockName(
						clientId,
						'fincommerce/product-gallery'
					).length > 0,
			};
		},
		[ clientId ]
	);

	const isDescendentOfQueryLoop = Number.isFinite( context.queryId );
	const { isDescendentOfSingleProductBlock } =
		useIsDescendentOfSingleProductBlock( {
			blockClientId: blockProps?.id,
		} );

	useEffect( () => {
		if ( isDescendentOfQueryLoop || isDescendentOfSingleProductBlock ) {
			setAttributes( {
				isDescendentOfQueryLoop,
				isDescendentOfSingleProductBlock,
				showSaleBadge: false,
			} );
		} else {
			setAttributes( {
				isDescendentOfQueryLoop,
				isDescendentOfSingleProductBlock,
			} );
		}
	}, [
		isDescendentOfQueryLoop,
		isDescendentOfSingleProductBlock,
		setAttributes,
	] );

	const showAllControls =
		isDescendentOfQueryLoop || isDescendentOfSingleProductBlock;

	const innerBlockProps = useInnerBlocksProps(
		{
			className: 'wc-block-components-product-image__inner-container',
		},
		{
			dropZoneElement: ref.current,
			template: wasBlockJustInserted ? TEMPLATE : undefined,
		}
	);

	const isBlockTheme = getSettingWithCoercion(
		'isBlockTheme',
		false,
		isBoolean
	);

	const { product, isResolving } = useProduct( context.postId );

	return (
		<div { ...blockProps }>
			{ /* Don't show controls in product gallery as we rely on
			core supports API (aspect ratio setting) */ }
			{ showAllControls && ! isInProductGallery && (
				<InspectorControls>
					<ImageSizeSettings
						scale={ scale }
						width={ width }
						height={ height }
						setAttributes={ setAttributes }
					/>
					<PanelBody title={ __( 'Content', 'fincommerce' ) }>
						<ToggleControl
							label={ __(
								'Link to Product Page',
								'fincommerce'
							) }
							help={ __(
								'Links the image to the single product listing.',
								'fincommerce'
							) }
							checked={ showProductLink }
							onChange={ () =>
								setAttributes( {
									showProductLink: ! showProductLink,
								} )
							}
						/>
						<ToggleGroupControl
							label={ __( 'Resolution', 'fincommerce' ) }
							isBlock
							help={
								! isBlockTheme
									? createInterpolateElement(
											__(
												'Product image cropping can be modified in the <a>Customizer</a>.',
												'fincommerce'
											),
											{
												a: (
													// eslint-disable-next-line jsx-a11y/anchor-has-content
													<a
														href={ `${ getAdminLink(
															'customize.php'
														) }?autofocus[panel]=fincommerce&autofocus[section]=fincommerce_product_images` }
														target="_blank"
														rel="noopener noreferrer"
													/>
												),
											}
									  )
									: null
							}
							value={ imageSizing }
							onChange={ ( value: ImageSizing ) =>
								setAttributes( { imageSizing: value } )
							}
						>
							<ToggleGroupControlOption
								value={ ImageSizing.SINGLE }
								label={ __( 'Full Size', 'fincommerce' ) }
							/>
							<ToggleGroupControlOption
								value={ ImageSizing.THUMBNAIL }
								label={ __( 'Thumbnail', 'fincommerce' ) }
							/>
						</ToggleGroupControl>
					</PanelBody>
				</InspectorControls>
			) }
			<Block
				{ ...{ ...attributes, ...context } }
				isAdmin={ true }
				product={ product }
				isResolving={ isResolving }
			>
				{ showAllControls && <div { ...innerBlockProps } /> }
			</Block>
		</div>
	);
};

export default Edit;
