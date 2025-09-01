/**
 * External dependencies
 */
import clsx from 'clsx';
import { __ } from '@wordpress/i18n';
import { Icon, Disabled } from '@wordpress/components';
import { checkMark } from '@fincommerce/icons';
import { useMemo } from '@wordpress/element';
import { decodeHtmlEntities } from '@fincommerce/utils';
import {
	useBlockProps,
	withColors,
	InspectorControls,
	// @ts-expect-error - no types.
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
	// @ts-expect-error - no types.
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
} from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import '@fincommerce/block-library/assets/js/blocks/product-filters/inner-blocks/checkbox-list/style.scss';
import '@fincommerce/block-library/assets/js/blocks/product-filters/inner-blocks/checkbox-list/editor.scss';
import { EditProps } from '@fincommerce/block-library/assets/js/blocks/product-filters/inner-blocks/checkbox-list/types';
import { getColorClasses, getColorVars } from '@fincommerce/block-library/assets/js/blocks/product-filters/inner-blocks/checkbox-list/utils';

const CheckboxListEdit = ( props: EditProps ): JSX.Element => {
	const {
		clientId,
		context,
		attributes,
		setAttributes,
		optionElementBorder,
		setOptionElementBorder,
		optionElementSelected,
		setOptionElementSelected,
		optionElement,
		setOptionElement,
		labelElement,
		setLabelElement,
	} = props;

	const {
		customOptionElementBorder,
		customOptionElementSelected,
		customOptionElement,
		customLabelElement,
	} = attributes;
	const { filterData } = context;
	const { isLoading, items, showCounts } = filterData;

	const colorGradientSettings = useMultipleOriginColorsAndGradients();
	const blockProps = useBlockProps( {
		className: clsx( 'wc-block-product-filter-checkbox-list', {
			'is-loading': isLoading,
			...getColorClasses( attributes ),
		} ),
		style: getColorVars( attributes ),
	} );

	const loadingState = useMemo( () => {
		return [ ...Array( 5 ) ].map( ( x, i ) => (
			<div
				className="wc-block-product-filter-checkbox-list__item"
				key={ i }
				style={ {
					/* stylelint-disable */
					width: Math.floor( Math.random() * 75 ) + '%',
				} }
			>
				&nbsp;
			</div>
		) );
	}, [] );

	if ( ! items ) {
		return <></>;
	}

	const threshold = 15;
	const isLongList = items.length > threshold;

	return (
		<>
			<div { ...blockProps }>
				<Disabled>
					<div className="wc-block-product-filter-checkbox-list__items">
						{ isLoading && loadingState }
						{ ! isLoading &&
							( isLongList
								? items.slice( 0, threshold )
								: items
							).map( ( item, index ) => (
								<div
									key={ index }
									className={ clsx(
										'wc-block-product-filter-checkbox-list__item',
										{
											[ `has-depth-${ item?.depth }` ]:
												item?.depth,
										}
									) }
								>
									<label
										htmlFor={ `interactive-checkbox-${ index }` }
										className=" wc-block-product-filter-checkbox-list__label"
									>
										<span className="wc-block-product-filter-checkbox-list__input-wrapper">
											<input
												name={ `interactive-checkbox-${ index }` }
												type="checkbox"
												className="wc-block-product-filter-checkbox-list__input"
												defaultChecked={
													!! item.selected
												}
											/>
											<Icon
												className="wc-block-product-filter-checkbox-list__mark"
												icon={ checkMark }
											/>
										</span>
										<span className="wc-block-product-filter-checkbox-list__text-wrapper">
											<span className="wc-block-product-filter-checkbox-list__text">
												{ typeof item.label === 'string'
													? decodeHtmlEntities(
															item.label
													  )
													: item.label }
											</span>
											{ showCounts && (
												<span className="wc-block-product-filter-checkbox-list__count">
													{ ` (${ item.count })` }
												</span>
											) }
										</span>
									</label>
								</div>
							) ) }
					</div>
					{ ! isLoading && isLongList && (
						<button className="wc-block-product-filter-checkbox-list__show-more">
							{ __( 'Show more…', 'fincommerce' ) }
						</button>
					) }
				</Disabled>
			</div>
			<InspectorControls group="color">
				{ colorGradientSettings.hasColorsOrGradients && (
					<ColorGradientSettingsDropdown
						__experimentalIsRenderedInSidebar
						settings={ [
							{
								label: __( 'Label', 'fincommerce' ),
								colorValue:
									labelElement.color || customLabelElement,
								isShownByDefault: true,
								enableAlpha: true,
								onColorChange: ( colorValue: string ) => {
									setLabelElement( colorValue );
									setAttributes( {
										customLabelElement: colorValue,
									} );
								},
								resetAllFilter: () => {
									setLabelElement( '' );
									setAttributes( {
										customLabelElement: '',
									} );
								},
							},
							{
								label: __(
									'Option Element Border',
									'fincommerce'
								),
								colorValue:
									optionElementBorder.color ||
									customOptionElementBorder,
								isShownByDefault: true,
								enableAlpha: true,
								onColorChange: ( colorValue: string ) => {
									setOptionElementBorder( colorValue );
									setAttributes( {
										customOptionElementBorder: colorValue,
									} );
								},
								resetAllFilter: () => {
									setOptionElementBorder( '' );
									setAttributes( {
										customOptionElementBorder: '',
									} );
								},
							},
							{
								label: __(
									'Option Element (Selected)',
									'fincommerce'
								),
								colorValue:
									optionElementSelected.color ||
									customOptionElementSelected,
								isShownByDefault: true,
								enableAlpha: true,
								onColorChange: ( colorValue: string ) => {
									setOptionElementSelected( colorValue );
									setAttributes( {
										customOptionElementSelected: colorValue,
									} );
								},
								resetAllFilter: () => {
									setOptionElementSelected( '' );
									setAttributes( {
										customOptionElementSelected: '',
									} );
								},
							},
							{
								label: __( 'Option Element', 'fincommerce' ),
								colorValue:
									optionElement.color || customOptionElement,
								isShownByDefault: true,
								enableAlpha: true,
								onColorChange: ( colorValue: string ) => {
									setOptionElement( colorValue );
									setAttributes( {
										customOptionElement: colorValue,
									} );
								},
								resetAllFilter: () => {
									setOptionElement( '' );
									setAttributes( {
										customOptionElement: '',
									} );
								},
							},
						] }
						panelId={ clientId }
						{ ...colorGradientSettings }
					/>
				) }
			</InspectorControls>
		</>
	);
};

export default withColors( {
	optionElementBorder: 'option-element-border',
	optionElementSelected: 'option-element-border',
	optionElement: 'option-element',
	labelElement: 'label-element',
} )( CheckboxListEdit );
