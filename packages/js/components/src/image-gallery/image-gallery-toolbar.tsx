/**
 * External dependencies
 */
import { createElement } from '@wordpress/element';
import { chevronRight, chevronLeft, trash } from '@wordpress/icons';
import { MediaItem, MediaUpload } from '@wordpress/media-utils';
import { __ } from '@wordpress/i18n';
import {
	Toolbar,
	ToolbarButton,
	ToolbarGroup,
	ToolbarItem,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import { SortableHandle } from '../sortable';
import { MediaUploadComponentType } from './types';
import { ImageGalleryToolbarDropdown } from './image-gallery-toolbar-dropdown';

export type ImageGalleryToolbarProps = {
	childIndex: number;
	allowDragging?: boolean;
	value?: number;
	moveItem: ( fromIndex: number, toIndex: number ) => void;
	removeItem: ( removeIndex: number ) => void;
	replaceItem: (
		replaceIndex: number,
		media: { id: number } & MediaItem
	) => void;
	setToolBarItem: ( key: string | null ) => void;
	lastChild: boolean;
	MediaUploadComponent: MediaUploadComponentType;
} & React.HTMLAttributes< HTMLDivElement >;

export const ImageGalleryToolbar = ( {
	childIndex,
	allowDragging = true,
	moveItem,
	removeItem,
	replaceItem,
	setToolBarItem,
	lastChild,
	value,
	MediaUploadComponent = MediaUpload,
}: ImageGalleryToolbarProps ) => {
	const moveNext = () => {
		moveItem( childIndex, childIndex + 1 );
	};

	const movePrevious = () => {
		moveItem( childIndex, childIndex - 1 );
	};

	const setAsCoverImage = ( coverIndex: number ) => {
		moveItem( coverIndex, 0 );
		setToolBarItem( null );
	};

	const isCoverItem = childIndex === 0;

	return (
		<div className="fincommerce-image-gallery__toolbar">
			<Toolbar
				onClick={ ( e ) => e.stopPropagation() }
				label={ __( 'Options', 'fincommerce' ) }
				id="options-toolbar"
			>
				{ ! isCoverItem && (
					<ToolbarGroup>
						{ allowDragging && (
							<ToolbarButton
								icon={ () => (
									<SortableHandle itemIndex={ childIndex } />
								) }
								label={ __( 'Drag to reorder', 'fincommerce' ) }
							/>
						) }
						<ToolbarButton
							disabled={ childIndex < 2 }
							onClick={ () => movePrevious() }
							icon={ chevronLeft }
							label={ __( 'Move previous', 'fincommerce' ) }
						/>
						<ToolbarButton
							onClick={ () => moveNext() }
							icon={ chevronRight }
							label={ __( 'Move next', 'fincommerce' ) }
							disabled={ lastChild }
						/>
					</ToolbarGroup>
				) }
				{ ! isCoverItem && (
					<ToolbarGroup>
						<ToolbarButton
							onClick={ () => setAsCoverImage( childIndex ) }
							label={ __( 'Set as cover', 'fincommerce' ) }
						>
							{ __( 'Set as cover', 'fincommerce' ) }
						</ToolbarButton>
					</ToolbarGroup>
				) }
				{ isCoverItem && (
					<ToolbarGroup className="fincommerce-image-gallery__toolbar-media">
						<MediaUploadComponent
							value={ value }
							onSelect={ ( media ) =>
								replaceItem( childIndex, media as MediaItem )
							}
							allowedTypes={ [ 'image' ] }
							render={ ( { open } ) => (
								<ToolbarButton onClick={ open }>
									{ __( 'Replace', 'fincommerce' ) }
								</ToolbarButton>
							) }
						/>
					</ToolbarGroup>
				) }
				{ isCoverItem && (
					<ToolbarGroup>
						<ToolbarButton
							onClick={ () => removeItem( childIndex ) }
							icon={ trash }
							label={ __( 'Remove', 'fincommerce' ) }
						/>
					</ToolbarGroup>
				) }
				{ ! isCoverItem && (
					<ToolbarGroup>
						<ToolbarItem>
							{ ( toggleProps ) => (
								<ImageGalleryToolbarDropdown
									canRemove={ true }
									onRemove={ () => removeItem( childIndex ) }
									onReplace={ ( media ) =>
										replaceItem( childIndex, media )
									}
									MediaUploadComponent={
										MediaUploadComponent
									}
									{ ...toggleProps }
								/>
							) }
						</ToolbarItem>
					</ToolbarGroup>
				) }
			</Toolbar>
		</div>
	);
};
