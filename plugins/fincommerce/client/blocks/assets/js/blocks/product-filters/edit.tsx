/**
 * External dependencies
 */
import { InnerBlocks, useBlockProps } from '@finpress/block-editor';
import { BlockEditProps, InnerBlockTemplate } from '@finpress/blocks';
import { __ } from '@finpress/i18n';
import { Icon, close } from '@finpress/icons';
import { useState } from '@finpress/element';
import { filterThreeLines } from '@fincommerce/icons';
import clsx from 'clsx';

/**
 * Internal dependencies
 */
import '@fincommerce/block-library/assets/js/blocks/product-filters/editor.scss';
import { type BlockAttributes } from '@fincommerce/block-library/assets/js/blocks/product-filters/types';
import { getProductFiltersCss } from '@fincommerce/block-library/assets/js/blocks/product-filters/utils/get-product-filters-css';

const TEMPLATE: InnerBlockTemplate[] = [
	[
		'core/heading',
		{
			level: 2,
			content: __( 'Filters', 'fincommerce' ),
			style: {
				margin: { top: '0', bottom: '0' },
				spacing: { margin: { top: '0', bottom: '0' } },
			},
		},
	],
	[ 'fincommerce/product-filter-active' ],
	[ 'fincommerce/product-filter-price' ],
	[ 'fincommerce/product-filter-rating' ],
	[ 'fincommerce/product-filter-attribute' ],
	[ 'fincommerce/product-filter-taxonomy' ],
	[ 'fincommerce/product-filter-status' ],
];

export const Edit = ( props: BlockEditProps< BlockAttributes > ) => {
	const { attributes } = props;
	const { isPreview } = attributes;
	const [ isOpen, setIsOpen ] = useState( false );
	const blockProps = useBlockProps( {
		className: clsx( 'wc-block-product-filters', {
			'is-overlay-opened': isOpen,
		} ),
		style: getProductFiltersCss( attributes ),
	} );

	return (
		<div { ...blockProps }>
			{ isPreview ? (
				<div className="wc-block-product-filters__overlay-content">
					<InnerBlocks templateLock={ false } template={ TEMPLATE } />
				</div>
			) : (
				<>
					<button
						className="wc-block-product-filters__open-overlay"
						onClick={ () => setIsOpen( ! isOpen ) }
					>
						<Icon icon={ filterThreeLines } />
						<span>{ __( 'Filter products', 'fincommerce' ) }</span>
					</button>

					<div className="wc-block-product-filters__overlay">
						<div className="wc-block-product-filters__overlay-wrapper">
							<div
								className="wc-block-product-filters__overlay-dialog"
								role="dialog"
							>
								<header className="wc-block-product-filters__overlay-header">
									<button
										className="wc-block-product-filters__close-overlay"
										onClick={ () => setIsOpen( ! isOpen ) }
									>
										<span>
											{ __( 'Close', 'fincommerce' ) }
										</span>
										<Icon icon={ close } />
									</button>
								</header>
								<div className="wc-block-product-filters__overlay-content">
									<InnerBlocks
										templateLock={ false }
										template={ TEMPLATE }
									/>
								</div>
								<footer className="wc-block-product-filters__overlay-footer">
									<button
										className="wc-block-product-filters__apply wp-block-button__link wp-element-button"
										onClick={ () => setIsOpen( ! isOpen ) }
									>
										<span>
											{ __( 'Apply', 'fincommerce' ) }
										</span>
									</button>
								</footer>
							</div>
						</div>
					</div>
				</>
			) }
		</div>
	);
};
