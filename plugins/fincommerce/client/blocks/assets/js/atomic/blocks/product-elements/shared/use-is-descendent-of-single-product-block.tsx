/**
 * External dependencies
 */
import { useSelect } from '@finpress/data';

interface UseIsDescendentOfSingleProductBlockProps {
	blockClientId: string;
}

export const useIsDescendentOfSingleProductBlock = ( {
	blockClientId,
}: UseIsDescendentOfSingleProductBlockProps ) => {
	const { isDescendentOfSingleProductBlock } = useSelect(
		( select ) => {
			const { getBlockParentsByBlockName } =
				select( 'core/block-editor' );
			const blockParentBlocksIds = getBlockParentsByBlockName(
				blockClientId?.replace( 'block-', '' ),
				[ 'fincommerce/single-product' ]
			);
			return {
				isDescendentOfSingleProductBlock:
					blockParentBlocksIds.length > 0,
			};
		},
		[ blockClientId ]
	);

	return { isDescendentOfSingleProductBlock };
};
