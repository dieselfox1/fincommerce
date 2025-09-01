/**
 * External dependencies
 */
import { FormEvent, useEffect } from 'react';
import { Button, Modal, Spinner } from '@wordpress/components';
import { resolveSelect } from '@wordpress/data';
import {
	createElement,
	Fragment,
	useContext,
	useCallback,
	useState,
} from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { closeSmall } from '@wordpress/icons';
import {
	__experimentalSelectControl as SelectControl,
	__experimentalSelectControlMenu as Menu,
	__experimentalSelectControlMenuItem as MenuItem,
	useAsyncFilter,
} from '@fincommerce/components';
import { CurrencyContext } from '@fincommerce/currency';
import { productsStore, Product } from '@fincommerce/data';

/**
 * Internal dependencies
 */
import { AddProductsModalProps } from './types';

export function getProductImageStyle( product: Product ) {
	return product.images.length > 0
		? {
				backgroundImage: `url(${ product.images[ 0 ].src })`,
		  }
		: undefined;
}

export function AddProductsModal( {
	initialValue,
	onSubmit,
	onClose,
}: AddProductsModalProps ) {
	const [ products, setProducts ] = useState< Product[] >( [] );
	const [ selectedProducts, setSelectedProducts ] = useState< Product[] >(
		[]
	);

	function handleSubmit( event: FormEvent< HTMLFormElement > ) {
		event.preventDefault();

		onSubmit( [ ...selectedProducts ] );
	}

	function handleCancelClick() {
		onClose();
	}

	const filter = useCallback(
		async ( search = '' ) => {
			setProducts( [] );

			return resolveSelect( productsStore )
				.getProducts( {
					search,
					orderby: 'title',
					order: 'asc',
					exclude: [ ...initialValue, ...selectedProducts ].map(
						( product ) => product.id
					),
				} )
				.then( ( response: Product[] ) => {
					setProducts( response );
					return response;
				} );
		},
		[ selectedProducts ]
	);

	const { isFetching, ...selectProps } = useAsyncFilter< Product >( {
		filter,
	} );

	useEffect(
		function preloadProducts() {
			filter();
		},
		[ initialValue, selectedProducts ]
	);

	function handleSelect( value: Product ) {
		setSelectedProducts( ( current ) => [ ...current, value ] );
	}

	const { formatAmount } = useContext( CurrencyContext );

	function removeProductHandler( product: Product ) {
		return function handleRemoveClick() {
			setSelectedProducts( ( current ) =>
				current.filter( ( item ) => item.id !== product.id )
			);
		};
	}

	return (
		<Modal
			title={ __( 'Add products to this group', 'fincommerce' ) }
			className="fincommerce-add-products-modal"
			onRequestClose={ onClose }
		>
			<form
				noValidate
				onSubmit={ handleSubmit }
				className="fincommerce-add-products-modal__form"
			>
				<fieldset className="fincommerce-add-products-modal__form-group">
					<legend className="fincommerce-add-products-modal__form-group-title">
						{ __(
							'Add and manage products in this group to let customers purchase them all in one go.',
							'fincommerce'
						) }
					</legend>

					<div className="fincommerce-add-products-modal__form-group-content">
						<SelectControl< Product >
							{ ...selectProps }
							items={ products }
							placeholder={ __(
								'Search for products',
								'fincommerce'
							) }
							label=""
							selected={ null }
							onSelect={ handleSelect }
							__experimentalOpenMenuOnFocus
						>
							{ ( {
								items,
								isOpen,
								highlightedIndex,
								getMenuProps,
								getItemProps,
							} ) => (
								<Menu
									isOpen={ isOpen }
									getMenuProps={ getMenuProps }
									className="fincommerce-add-products-modal__menu"
								>
									{ isFetching ? (
										<div className="fincommerce-add-products-modal__menu-loading">
											<Spinner />
										</div>
									) : (
										items.map( ( item, index ) => (
											<MenuItem< Product >
												key={ item.id }
												index={ index }
												isActive={
													highlightedIndex === index
												}
												item={ item }
												getItemProps={ (
													options
												) => ( {
													...getItemProps( options ),
													className:
														'fincommerce-add-products-modal__menu-item',
												} ) }
											>
												<>
													<div
														className="fincommerce-add-products-modal__menu-item-image"
														style={ getProductImageStyle(
															item
														) }
													/>
													<div className="fincommerce-add-products-modal__menu-item-content">
														<div className="fincommerce-add-products-modal__menu-item-title">
															{ item.name }
														</div>

														{ Boolean(
															item.price
														) && (
															<div className="fincommerce-add-products-modal__menu-item-description">
																{ formatAmount(
																	item.price
																) }
															</div>
														) }
													</div>
												</>
											</MenuItem>
										) )
									) }
								</Menu>
							) }
						</SelectControl>
					</div>

					{ Boolean( selectedProducts.length ) && (
						<ul className="fincommerce-add-products-modal__list">
							{ selectedProducts.map( ( item ) => (
								<li
									key={ item.id }
									className="fincommerce-add-products-modal__list-item"
								>
									<div
										className="fincommerce-add-products-modal__list-item-image"
										style={ getProductImageStyle( item ) }
									/>
									<div className="fincommerce-add-products-modal__list-item-content">
										<div className="fincommerce-add-products-modal__list-item-title">
											{ item.name }
										</div>

										<div className="fincommerce-add-products-modal__list-item-description">
											{ item.sku }
										</div>
									</div>

									<div className="fincommerce-add-products-modal__list-item-actions">
										<Button
											type="button"
											variant="tertiary"
											icon={ closeSmall }
											aria-label={ __(
												'Remove product',
												'fincommerce'
											) }
											onClick={ removeProductHandler(
												item
											) }
										/>
									</div>
								</li>
							) ) }
						</ul>
					) }
				</fieldset>

				<div className="fincommerce-add-products-modal__actions">
					<Button
						variant="tertiary"
						type="button"
						onClick={ handleCancelClick }
					>
						{ __( 'Cancel', 'fincommerce' ) }
					</Button>
					<Button variant="primary" type="submit">
						{ __( 'Add', 'fincommerce' ) }
					</Button>
				</div>
			</form>
		</Modal>
	);
}
