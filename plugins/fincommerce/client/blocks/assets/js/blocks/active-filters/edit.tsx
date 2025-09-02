/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import { InspectorControls, useBlockProps } from '@finpress/block-editor';
import type { BlockEditProps } from '@finpress/blocks';
import BlockTitle from '@fincommerce/editor-components/block-title';
import {
	Disabled,
	PanelBody,
	withSpokenMessages,
	// eslint-disable-next-line @finpress/no-unsafe-wp-apis
	__experimentalToggleGroupControl as ToggleGroupControl,
	// eslint-disable-next-line @finpress/no-unsafe-wp-apis
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from '@finpress/components';

/**
 * Internal dependencies
 */
import Block from '@fincommerce/block-library/assets/js/blocks/active-filters/block';
import type { Attributes } from '@fincommerce/block-library/assets/js/blocks/active-filters/types';
import '@fincommerce/block-library/assets/js/blocks/active-filters/editor.scss';
import { UpgradeNotice } from '@fincommerce/block-library/assets/js/blocks/filter-wrapper/upgrade';

const Edit = ( {
	attributes,
	setAttributes,
	clientId,
}: BlockEditProps< Attributes > ) => {
	const { className, displayStyle, heading, headingLevel } = attributes;

	const blockProps = useBlockProps( {
		className,
	} );

	const getInspectorControls = () => {
		return (
			<InspectorControls key="inspector">
				<PanelBody>
					<UpgradeNotice clientId={ clientId } />
				</PanelBody>
				<PanelBody title={ __( 'Display Settings', 'fincommerce' ) }>
					<ToggleGroupControl
						label={ __( 'Display Style', 'fincommerce' ) }
						isBlock
						value={ displayStyle }
						onChange={ ( value: Attributes[ 'displayStyle' ] ) =>
							setAttributes( {
								displayStyle: value,
							} )
						}
						className="wc-block-active-filter__style-toggle"
					>
						<ToggleGroupControlOption
							value="list"
							label={ __( 'List', 'fincommerce' ) }
						/>
						<ToggleGroupControlOption
							value="chips"
							label={ __( 'Chips', 'fincommerce' ) }
						/>
					</ToggleGroupControl>
				</PanelBody>
			</InspectorControls>
		);
	};

	return (
		<div { ...blockProps }>
			{ getInspectorControls() }
			{ heading && (
				<BlockTitle
					className="wc-block-active-filters__title"
					headingLevel={ headingLevel }
					heading={ heading }
					onChange={ ( value: Attributes[ 'heading' ] ) =>
						setAttributes( { heading: value } )
					}
				/>
			) }
			<Disabled>
				<Block attributes={ attributes } isEditor={ true } />
			</Disabled>
		</div>
	);
};

export default withSpokenMessages( Edit );
