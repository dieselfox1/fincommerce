/**
 * External dependencies
 */
import { DropdownMenu, MenuGroup, MenuItem } from '@finpress/components';
import { moreVertical } from '@finpress/icons';
import {
	Children,
	cloneElement,
	createElement,
	Fragment,
	isValidElement,
} from '@finpress/element';
import { __ } from '@finpress/i18n';
import { MediaItem, MediaUpload } from '@finpress/media-utils';

/**
 * Internal dependencies
 */
import { MediaUploadComponentType } from './types';

const POPOVER_PROPS = {
	className: 'fincommerce-image-gallery__toolbar-dropdown-popover',
	placement: 'bottom-start',
};

type ImageGalleryToolbarDropdownProps = {
	onReplace: ( media: { id: number } & MediaItem ) => void;
	onRemove: () => void;
	canRemove?: boolean;
	removeBlockLabel?: string;
	MediaUploadComponent: MediaUploadComponentType;
	children?:
		| React.ReactNode
		| ( ( props: { onClose: () => void } ) => React.ReactNode );
};

export function ImageGalleryToolbarDropdown( {
	children,
	onReplace,
	onRemove,
	canRemove,
	removeBlockLabel,
	MediaUploadComponent = MediaUpload,
	...props
}: ImageGalleryToolbarDropdownProps ) {
	return (
		<DropdownMenu
			icon={ moreVertical }
			label={ __( 'Options', 'fincommerce' ) }
			className="fincommerce-image-gallery__toolbar-dropdown"
			popoverProps={ POPOVER_PROPS }
			{ ...props }
		>
			{ ( { onClose } ) => (
				<>
					<MenuGroup>
						<MediaUploadComponent
							onSelect={ ( media ) => {
								onReplace( media as MediaItem );
								onClose();
							} }
							allowedTypes={ [ 'image' ] }
							render={ ( { open } ) => (
								<MenuItem
									onClick={ () => {
										open();
									} }
								>
									{ __( 'Replace', 'fincommerce' ) }
								</MenuItem>
							) }
						/>
					</MenuGroup>
					{ typeof children === 'function'
						? children( { onClose } )
						: Children.map(
								children,
								( child ) =>
									isValidElement< { onClose: () => void } >(
										child
									) &&
									cloneElement< { onClose: () => void } >(
										child,
										{ onClose }
									)
						  ) }
					{ canRemove && (
						<MenuGroup>
							<MenuItem
								onClick={ () => {
									onClose();
									onRemove();
								} }
							>
								{ removeBlockLabel ||
									__( 'Remove', 'fincommerce' ) }
							</MenuItem>
						</MenuGroup>
					) }
				</>
			) }
		</DropdownMenu>
	);
}
