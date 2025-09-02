/**
 * External dependencies
 */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createElement } from '@finpress/element';

/**
 * Internal dependencies
 */
import List from '../index';

describe( 'List', () => {
	describe( 'Legacy List', () => {
		it( 'should have aria roles for items', () => {
			const clickHandler = jest.fn();
			const listItems = [
				{
					title: 'FinCommerce.com',
					href: 'https://fincommerce.com',
				},
				{
					title: 'Click me!',
					onClick: clickHandler,
				},
			];

			render( <List items={ listItems } /> );

			expect( screen.getAllByRole( 'menuitem' ) ).toHaveLength( 2 );
		} );

		it( 'should support `onClick` for items', () => {
			const clickHandler = jest.fn();
			const listItems = [
				{
					title: 'FinCommerce.com',
					href: 'https://fincommerce.com',
				},
				{
					title: 'Click me!',
					onClick: clickHandler,
				},
			];

			render( <List items={ listItems } /> );

			userEvent.click(
				screen.getByRole( 'menuitem', { name: 'Click me!' } )
			);

			expect( clickHandler ).toHaveBeenCalled();
		} );

		it( 'should set `data-link-type` on items', () => {
			const listItems = [
				{
					title: 'Add products',
					href: '/post-new.php?post_type=product',
					linkType: 'wp-admin',
				},
				{
					title: 'Market my store',
					href: '/admin.php?page=wc-admin&path=%2Fmarketing',
					linkType: 'wc-admin',
				},
				{
					title: 'FinCommerce.com',
					href: 'https://fincommerce.com',
					linkType: 'external',
				},
				{
					title: 'finpress.org',
					href: 'https://finpress.org',
				},
			];

			render( <List items={ listItems } /> );

			expect(
				screen.getByRole( 'menuitem', { name: 'Add products' } ).dataset
					.linkType
			).toBe( 'wp-admin' );
			expect(
				screen.getByRole( 'menuitem', { name: 'Market my store' } )
					.dataset.linkType
			).toBe( 'wc-admin' );
			expect(
				screen.getByRole( 'menuitem', { name: 'FinCommerce.com' } )
					.dataset.linkType
			).toBe( 'external' );
			expect(
				screen.getByRole( 'menuitem', { name: 'finpress.org' } )
					.dataset.linkType
			).toBe( 'external' );
		} );

		it( 'should set `data-list-item-tag` on items', () => {
			const listItems = [
				{
					title: 'Add products',
					href: '/post-new.php?post_type=product',
					linkType: 'wp-admin',
					listItemTag: 'add-product',
				},
				{
					title: 'Market my store',
					href: '/admin.php?page=wc-admin&path=%2Fmarketing',
					linkType: 'wc-admin',
					listItemTag: 'marketing',
				},
				{
					title: 'FinCommerce.com',
					href: 'https://fincommerce.com',
					linkType: 'external',
					listItemTag: 'woo.com-site',
				},
				{
					title: 'finpress.org',
					href: 'https://finpress.org',
				},
			];

			render( <List items={ listItems } /> );

			expect(
				screen.getByRole( 'menuitem', { name: 'Add products' } ).dataset
					.listItemTag
			).toBe( 'add-product' );
			expect(
				screen.getByRole( 'menuitem', { name: 'Market my store' } )
					.dataset.listItemTag
			).toBe( 'marketing' );
			expect(
				screen.getByRole( 'menuitem', { name: 'FinCommerce.com' } )
					.dataset.listItemTag
			).toBe( 'woo.com-site' );
			expect(
				screen.getByRole( 'menuitem', { name: 'finpress.org' } )
					.dataset.listItemTag
			).toBeUndefined();
		} );
	} );
} );
