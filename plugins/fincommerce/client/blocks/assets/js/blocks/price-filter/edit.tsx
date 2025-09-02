/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import { InspectorControls, useBlockProps } from '@finpress/block-editor';
import { getAdminLink } from '@fincommerce/settings';
import { blocksConfig } from '@fincommerce/block-settings';
import BlockTitle from '@fincommerce/editor-components/block-title';
import { Icon, currencyDollar, external } from '@finpress/icons';
import type { BlockEditProps } from '@finpress/blocks';
import {
	Placeholder,
	Disabled,
	PanelBody,
	ToggleControl,
	Button,
	// eslint-disable-next-line @finpress/no-unsafe-wp-apis
	__experimentalToggleGroupControl as ToggleGroupControl,
	// eslint-disable-next-line @finpress/no-unsafe-wp-apis
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from '@finpress/components';

/**
 * Internal dependencies
 */
import Block from '@fincommerce/block-library/assets/js/blocks/price-filter/block';
import '@fincommerce/block-library/assets/js/blocks/price-filter/editor.scss';
import type { Attributes } from '@fincommerce/block-library/assets/js/blocks/price-filter/types';
import { UpgradeNotice } from '@fincommerce/block-library/assets/js/blocks/filter-wrapper/upgrade';

export default function ( {
	attributes,
	setAttributes,
	clientId,
}: BlockEditProps< Attributes > ) {
	const {
		heading,
		headingLevel,
		showInputFields,
		inlineInput,
		showFilterButton,
	} = attributes;

	const blockProps = useBlockProps();

	const getInspectorControls = () => {
		return (
			<InspectorControls key="inspector">
				<PanelBody>
					<UpgradeNotice clientId={ clientId } />
				</PanelBody>
				<PanelBody title={ __( 'Settings', 'fincommerce' ) }>
					<ToggleGroupControl
						label={ __( 'Price Range Selector', 'fincommerce' ) }
						isBlock
						value={ showInputFields ? 'editable' : 'text' }
						onChange={ ( value: string ) =>
							setAttributes( {
								showInputFields: value === 'editable',
							} )
						}
						className="wc-block-price-filter__price-range-toggle"
					>
						<ToggleGroupControlOption
							value="editable"
							label={ __( 'Editable', 'fincommerce' ) }
						/>
						<ToggleGroupControlOption
							value="text"
							label={ __( 'Text', 'fincommerce' ) }
						/>
					</ToggleGroupControl>
					{ showInputFields && (
						<ToggleControl
							label={ __( 'Inline input fields', 'fincommerce' ) }
							checked={ inlineInput }
							onChange={ () =>
								setAttributes( {
									inlineInput: ! inlineInput,
								} )
							}
							help={ __(
								'Show input fields inline with the slider.',
								'fincommerce'
							) }
						/>
					) }
					<ToggleControl
						label={ __(
							"Show 'Apply filters' button",
							'fincommerce'
						) }
						help={ __(
							'Products will update when the button is clicked.',
							'fincommerce'
						) }
						checked={ showFilterButton }
						onChange={ () =>
							setAttributes( {
								showFilterButton: ! showFilterButton,
							} )
						}
					/>
				</PanelBody>
			</InspectorControls>
		);
	};

	const noProductsPlaceholder = () => (
		<Placeholder
			className="wc-block-price-slider"
			icon={ <Icon icon={ currencyDollar } /> }
			label={ __( 'Filter by Price', 'fincommerce' ) }
			instructions={ __(
				'Display a slider to filter products in your store by price.',
				'fincommerce'
			) }
		>
			<p>
				{ __(
					'To filter your products by price you first need to assign prices to your products.',
					'fincommerce'
				) }
			</p>
			<Button
				className="wc-block-price-slider__add-product-button"
				variant="secondary"
				href={ getAdminLink( 'post-new.php?post_type=product' ) }
				target="_top"
			>
				{ __( 'Add new product', 'fincommerce' ) + ' ' }
				<Icon icon={ external } />
			</Button>
			<Button
				className="wc-block-price-slider__read_more_button"
				variant="tertiary"
				href="https://fincommerce.com/document/managing-products/"
				target="_blank"
			>
				{ __( 'Learn more', 'fincommerce' ) }
			</Button>
		</Placeholder>
	);

	return (
		<div { ...blockProps }>
			{ blocksConfig.productCount === 0 ? (
				noProductsPlaceholder()
			) : (
				<>
					{ getInspectorControls() }
					{ heading && (
						<BlockTitle
							className="wc-block-price-filter__title"
							headingLevel={ headingLevel }
							heading={ heading }
							onChange={ ( value: string ) =>
								setAttributes( { heading: value } )
							}
						/>
					) }
					<Disabled>
						<Block attributes={ attributes } isEditor={ true } />
					</Disabled>
				</>
			) }
		</div>
	);
}
