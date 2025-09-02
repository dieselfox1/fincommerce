/**
 * External dependencies
 */
import { Button, CheckboxControl } from '@finpress/components';
import { __ } from '@finpress/i18n';
import { chevronDown, chevronUp } from '@finpress/icons';
import clsx from 'clsx';
import { createElement, forwardRef } from 'react';
import { decodeEntities } from '@finpress/html-entities';

/**
 * Internal dependencies
 */
import { useTreeItem } from './hooks/use-tree-item';
import { Tree } from './tree';
import { TreeItemProps } from './types';

export const TreeItem = forwardRef( function ForwardedTreeItem(
	props: TreeItemProps,
	ref: React.ForwardedRef< HTMLLIElement >
) {
	const {
		item,
		treeItemProps,
		headingProps,
		treeProps,
		selection,
		getLabel,
	} = useTreeItem( {
		...props,
		ref,
	} );

	function handleKeyDown( event: React.KeyboardEvent< HTMLElement > ) {
		if ( event.key === 'Escape' && props.onEscape ) {
			event.preventDefault();
			props.onEscape();
		} else if ( event.key === 'ArrowLeft' ) {
			if ( item.index !== undefined ) {
				props.onExpand?.( item.index, false );
			}
		} else if ( event.key === 'ArrowRight' ) {
			if ( item.index !== undefined ) {
				props.onExpand?.( item.index, true );
			}
		}
	}

	return (
		<li
			{ ...treeItemProps }
			className={ clsx(
				treeItemProps.className,
				'experimental-fincommerce-tree-item',
				{
					'experimental-fincommerce-tree-item--highlighted':
						props.isHighlighted,
				}
			) }
		>
			<div
				{ ...headingProps }
				className="experimental-fincommerce-tree-item__heading"
			>
				{ /* eslint-disable-next-line jsx-a11y/label-has-for, jsx-a11y/label-has-associated-control */ }
				<label className="experimental-fincommerce-tree-item__label">
					{ selection.multiple ? (
						<CheckboxControl
							indeterminate={
								selection.checkedStatus === 'indeterminate'
							}
							checked={ selection.checkedStatus === 'checked' }
							onChange={ selection.onSelectChild }
							onKeyDown={ handleKeyDown }
							__nextHasNoMarginBottom={ true }
						/>
					) : (
						<input
							type="checkbox"
							className="experimental-fincommerce-tree-item__checkbox"
							checked={ selection.checkedStatus === 'checked' }
							onChange={ ( event ) =>
								selection.onSelectChild( event.target.checked )
							}
							onKeyDown={ handleKeyDown }
						/>
					) }

					{ typeof getLabel === 'function' ? (
						getLabel( item )
					) : (
						<span>{ decodeEntities( item.data.label ) }</span>
					) }
				</label>

				{ Boolean( item.children?.length ) && (
					<div className="experimental-fincommerce-tree-item__expander">
						<Button
							icon={
								item.data.isExpanded ? chevronUp : chevronDown
							}
							onClick={ () => {
								if ( item.index !== undefined ) {
									props.onExpand?.(
										item.index,
										! item.data.isExpanded
									);
								}
							} }
							onKeyDown={ handleKeyDown }
							className="experimental-fincommerce-tree-item__expander"
							aria-label={
								item.data.isExpanded
									? __( 'Collapse', 'fincommerce' )
									: __( 'Expand', 'fincommerce' )
							}
						/>
					</div>
				) }
			</div>

			{ Boolean( item.children.length ) && item.data.isExpanded && (
				<Tree
					{ ...treeProps }
					highlightedIndex={ props.highlightedIndex }
					onExpand={ props.onExpand }
					onEscape={ props.onEscape }
				/>
			) }
		</li>
	);
} );
