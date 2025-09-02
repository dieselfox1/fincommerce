/**
 * External dependencies
 */
import { optionsStore } from '@fincommerce/data';
import { useSelect, useDispatch } from '@finpress/data';

export const BLOCK_EDITOR_TOUR_SHOWN_OPTION =
	'fincommerce_block_product_tour_shown';

export const useBlockEditorTourOptions = () => {
	const { updateOptions } = useDispatch( optionsStore );
	const { shouldTourBeShown } = useSelect( ( select ) => {
		const { getOption, hasFinishedResolution } = select( optionsStore );

		const wasTourShown =
			getOption( BLOCK_EDITOR_TOUR_SHOWN_OPTION ) === 'yes' ||
			! hasFinishedResolution( 'getOption', [
				BLOCK_EDITOR_TOUR_SHOWN_OPTION,
			] );

		return {
			shouldTourBeShown: ! wasTourShown,
		};
	}, [] );

	const dismissModal = () => {
		updateOptions( {
			[ BLOCK_EDITOR_TOUR_SHOWN_OPTION ]: 'yes',
		} );
	};

	return {
		dismissModal,
		shouldTourBeShown,
	};
};
