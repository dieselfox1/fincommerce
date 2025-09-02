/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import { useEffect } from '@finpress/element';
import {
	useBlockProps,
	InspectorControls,
	RichText,
} from '@finpress/block-editor';
import { useProduct } from '@fincommerce/entities';
import {
	RangeControl,
	ToggleControl,
	// @ts-expect-error Using experimental features
	// eslint-disable-next-line @finpress/no-unsafe-wp-apis
	__experimentalToolsPanel as ToolsPanel,
	// @ts-expect-error Using experimental features
	// eslint-disable-next-line @finpress/no-unsafe-wp-apis
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@finpress/components';

/**
 * Internal dependencies
 */
import Block from '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/summary/block';
import { useIsDescendentOfSingleProductBlock } from '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/shared/use-is-descendent-of-single-product-block';
import { useIsDescendentOfSingleProductTemplate } from '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/shared/use-is-descendent-of-single-product-template';
import type { EditProps, ControlProps } from '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/summary/types';
import '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/summary/editor.scss';

const ShowDescriptionIfEmptyControl = ( {
	showDescriptionIfEmpty,
	setAttributes,
}: ControlProps< 'showDescriptionIfEmpty' > ) => {
	const label = __( 'Show description if empty', 'fincommerce' );
	const help = __(
		"Display the product description if it doesn't have a summary",
		'fincommerce'
	);

	return (
		<ToolsPanelItem
			label={ label }
			hasValue={ () => showDescriptionIfEmpty === true }
			onDeselect={ () =>
				setAttributes( { showDescriptionIfEmpty: false } )
			}
			isShownByDefault
		>
			<ToggleControl
				label={ label }
				help={ help }
				checked={ showDescriptionIfEmpty }
				onChange={ ( value ) => {
					setAttributes( {
						showDescriptionIfEmpty: value,
					} );
				} }
			/>
		</ToolsPanelItem>
	);
};

const MaxWordCountControl = ( {
	summaryLength,
	setAttributes,
}: ControlProps< 'summaryLength' > ) => {
	const label = __( 'Max word count', 'fincommerce' );
	const help = __(
		'If the content exceeds the word limit, only the first paragraph will be shown. If the content is within the limit, all paragraphs will be displayed. Set to 0 to remove the word limit.',
		'fincommerce'
	);

	return (
		<ToolsPanelItem
			label={ label }
			hasValue={ () => summaryLength !== 0 }
			onDeselect={ () => setAttributes( { summaryLength: 0 } ) }
			isShownByDefault
		>
			<RangeControl
				label={ label }
				help={ help }
				value={ summaryLength }
				onChange={ ( value ) => {
					setAttributes( {
						summaryLength: value || 0,
					} );
				} }
				min={ 0 }
				max={ 200 }
				step={ 1 }
			/>
		</ToolsPanelItem>
	);
};

const LinkToDescriptionControl = ( {
	showLink,
	setAttributes,
}: ControlProps< 'showLink' > ) => {
	const label = __( 'Link to description', 'fincommerce' );
	const help = __(
		"Display a button to let shoppers jump to the product's description",
		'fincommerce'
	);

	return (
		<ToolsPanelItem
			label={ label }
			hasValue={ () => showLink === false }
			onDeselect={ () => setAttributes( { showLink: false } ) }
			isShownByDefault
		>
			<ToggleControl
				label={ label }
				help={ help }
				checked={ showLink }
				onChange={ ( value ) => {
					setAttributes( {
						showLink: value,
					} );
				} }
			/>
		</ToolsPanelItem>
	);
};

const LinkToDescription = ( {
	linkText,
	setAttributes,
}: ControlProps< 'linkText' > ) => {
	return (
		<p>
			<RichText
				identifier="linkToDescrption"
				className="wc-block-components-product-summary__more-link"
				tagName="a"
				aria-label={ __( '“Read more” link text', 'fincommerce' ) }
				placeholder={ __( 'Add "read more" link text', 'fincommerce' ) }
				value={ linkText }
				onChange={ ( value ) => setAttributes( { linkText: value } ) }
				withoutInteractiveFormatting
			/>
		</p>
	);
};

const Edit = ( {
	attributes,
	context,
	setAttributes,
}: EditProps ): JSX.Element => {
	const blockProps = useBlockProps();
	const {
		showDescriptionIfEmpty,
		showLink,
		summaryLength,
		linkText,
		isDescendantOfAllProducts,
	} = attributes;

	const isDescendentOfQueryLoop = Number.isFinite( context.queryId );
	const { isDescendentOfSingleProductBlock } =
		useIsDescendentOfSingleProductBlock( { blockClientId: blockProps.id } );

	let { isDescendentOfSingleProductTemplate } =
		useIsDescendentOfSingleProductTemplate();

	if ( isDescendentOfQueryLoop ) {
		isDescendentOfSingleProductTemplate = false;
	}

	useEffect(
		() =>
			setAttributes( {
				isDescendentOfQueryLoop,
				isDescendentOfSingleProductTemplate,
				isDescendentOfSingleProductBlock,
			} ),
		[
			setAttributes,
			isDescendentOfQueryLoop,
			isDescendentOfSingleProductTemplate,
			isDescendentOfSingleProductBlock,
		]
	);

	const { product } = useProduct( context.postId );

	return (
		<div { ...blockProps }>
			<Block isAdmin={ true } { ...attributes } product={ product } />
			<InspectorControls>
				<ToolsPanel
					label={ __( 'Settings', 'fincommerce' ) }
					resetAll={ () => {
						const defaultSettings = {};
						setAttributes( defaultSettings );
					} }
				>
					<MaxWordCountControl
						summaryLength={ summaryLength }
						setAttributes={ setAttributes }
					/>
					<ShowDescriptionIfEmptyControl
						showDescriptionIfEmpty={ showDescriptionIfEmpty }
						setAttributes={ setAttributes }
					/>
					{ ! isDescendantOfAllProducts && (
						<LinkToDescriptionControl
							showLink={ showLink }
							setAttributes={ setAttributes }
						/>
					) }
				</ToolsPanel>
			</InspectorControls>
			{ ! isDescendantOfAllProducts && showLink && (
				<LinkToDescription
					linkText={ linkText }
					setAttributes={ setAttributes }
				/>
			) }
		</div>
	);
};

export default Edit;
