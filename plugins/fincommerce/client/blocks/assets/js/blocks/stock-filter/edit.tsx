/**
 * External dependencies
 */
import { __, _x } from '@finpress/i18n';
import clsx from 'clsx';
import { useBlockProps, InspectorControls } from '@finpress/block-editor';
import BlockTitle from '@fincommerce/editor-components/block-title';
import type { BlockEditProps } from '@finpress/blocks';
import {
	Disabled,
	PanelBody,
	ToggleControl,
	withSpokenMessages,
	// eslint-disable-next-line @finpress/no-unsafe-wp-apis
	__experimentalToggleGroupControl as ToggleGroupControl,
	// eslint-disable-next-line @finpress/no-unsafe-wp-apis
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from '@finpress/components';

/**
 * Internal dependencies
 */
import Block from '@fincommerce/block-library/assets/js/blocks/stock-filter/block';
import '@fincommerce/block-library/assets/js/blocks/stock-filter/editor.scss';
import { Attributes } from '@fincommerce/block-library/assets/js/blocks/stock-filter/types';
import { UpgradeNotice } from '@fincommerce/block-library/assets/js/blocks/filter-wrapper/upgrade';

const Edit = ( {
	clientId,
	attributes,
	setAttributes,
}: BlockEditProps< Attributes > ) => {
	const {
		className,
		heading,
		headingLevel,
		showCounts,
		showFilterButton,
		selectType,
		displayStyle,
	} = attributes;

	const blockProps = useBlockProps( {
		className: clsx( 'wc-block-stock-filter', className ),
	} );

	const getInspectorControls = () => {
		return (
			<InspectorControls key="inspector">
				<PanelBody>
					<UpgradeNotice clientId={ clientId } />
				</PanelBody>
				<PanelBody title={ __( 'Display Settings', 'fincommerce' ) }>
					<ToggleControl
						label={ __( 'Display product count', 'fincommerce' ) }
						checked={ showCounts }
						onChange={ () =>
							setAttributes( {
								showCounts: ! showCounts,
							} )
						}
					/>
					<ToggleGroupControl
						label={ __(
							'Allow selecting multiple options?',
							'fincommerce'
						) }
						isBlock
						value={ selectType || 'multiple' }
						onChange={ ( value: string ) =>
							setAttributes( {
								selectType: value,
							} )
						}
						className="wc-block-attribute-filter__multiple-toggle"
					>
						<ToggleGroupControlOption
							value="multiple"
							label={ _x(
								'Multiple',
								'Number of filters',
								'fincommerce'
							) }
						/>
						<ToggleGroupControlOption
							value="single"
							label={ _x(
								'Single',
								'Number of filters',
								'fincommerce'
							) }
						/>
					</ToggleGroupControl>
					<ToggleGroupControl
						label={ __( 'Display Style', 'fincommerce' ) }
						isBlock
						value={ displayStyle }
						onChange={ ( value ) =>
							setAttributes( {
								displayStyle: value,
							} )
						}
						className="wc-block-attribute-filter__display-toggle"
					>
						<ToggleGroupControlOption
							value="list"
							label={ __( 'List', 'fincommerce' ) }
						/>
						<ToggleGroupControlOption
							value="dropdown"
							label={ __( 'Dropdown', 'fincommerce' ) }
						/>
					</ToggleGroupControl>
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
						onChange={ ( value ) =>
							setAttributes( {
								showFilterButton: value,
							} )
						}
					/>
				</PanelBody>
			</InspectorControls>
		);
	};

	return (
		<>
			{ getInspectorControls() }
			{
				<div { ...blockProps }>
					{ heading && (
						<BlockTitle
							className="wc-block-stock-filter__title"
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
				</div>
			}
		</>
	);
};

export default withSpokenMessages( Edit );
