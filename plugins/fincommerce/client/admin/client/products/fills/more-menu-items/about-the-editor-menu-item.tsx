/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import { MenuItem } from '@finpress/components';
import { info, Icon } from '@finpress/icons';
import { useState } from '@finpress/element';

/**
 * Internal dependencies
 */
import BlockEditorGuide from '~/products/tour/block-editor/block-editor-guide';
import { usePublishedProductsCount } from '~/products/tour/block-editor/use-published-products-count';

export const AboutTheEditorMenuItem = ( {
	onClick = () => null,
	onCloseGuide,
}: {
	onClick: () => void;
	onCloseGuide: () => void;
} ) => {
	const [ isGuideOpen, setIsGuideOpen ] = useState( false );
	const { isNewUser } = usePublishedProductsCount();
	return (
		<>
			<MenuItem
				onClick={ () => {
					setIsGuideOpen( true );
					onClick();
				} }
				icon={ <Icon icon={ info } /> }
				iconPosition="right"
			>
				{ __( 'About the form…', 'fincommerce' ) }
			</MenuItem>
			{ isGuideOpen && (
				<BlockEditorGuide
					isNewUser={ isNewUser }
					onCloseGuide={ () => {
						setIsGuideOpen( false );
						onCloseGuide();
					} }
				/>
			) }
		</>
	);
};
