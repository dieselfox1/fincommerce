/**
 * External dependencies
 */
import { __, _x } from '@finpress/i18n';
import clsx from 'clsx';
import { useBlockProps, InspectorControls } from '@finpress/block-editor';
import type { BlockEditProps } from '@finpress/blocks';
import {
	Disabled,
	Notice,
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
import Block from '@fincommerce/block-library/assets/js/blocks/rating-filter/block';
import type { Attributes } from '@fincommerce/block-library/assets/js/blocks/rating-filter/types';
import '@fincommerce/block-library/assets/js/blocks/rating-filter/editor.scss';
import { UpgradeNotice } from '@fincommerce/block-library/assets/js/blocks/filter-wrapper/upgrade';

const noRatingsNotice = (
	<Notice status="warning" isDismissible={ false }>
		<p>
			{ __(
				"Your store doesn't have any products with ratings yet. This filter option will display when a product receives a review.",
				'fincommerce'
			) }
		</p>
	</Notice>
);

const Edit = ( {
	attributes,
	setAttributes,
	clientId,
}: BlockEditProps< Attributes > ) => {
	const {
		className,
		displayStyle,
		showCounts,
		showFilterButton,
		selectType,
	} = attributes;

	const blockProps = useBlockProps( {
		className: clsx( 'wc-block-rating-filter', className ),
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
						onChange={ ( value: string ) =>
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
					<Disabled>
						<Block
							attributes={ attributes }
							isEditor={ true }
							noRatingsNotice={ noRatingsNotice }
						/>
					</Disabled>
				</div>
			}
		</>
	);
};

export default withSpokenMessages( Edit );
