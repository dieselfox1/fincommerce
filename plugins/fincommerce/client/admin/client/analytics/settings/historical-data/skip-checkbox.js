/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import { CheckboxControl } from '@finpress/components';
import { importStore } from '@fincommerce/data';
import { withDispatch } from '@finpress/data';

function HistoricalDataSkipCheckbox( { checked, disabled, setSkipPrevious } ) {
	const skipChange = ( value ) => {
		setSkipPrevious( value );
	};
	return (
		<CheckboxControl
			className="fincommerce-settings-historical-data__skip-checkbox"
			checked={ checked }
			disabled={ disabled }
			label={ __(
				'Skip previously imported customers and orders',
				'fincommerce'
			) }
			onChange={ skipChange }
		/>
	);
}

export default withDispatch( ( dispatch ) => {
	const { setSkipPrevious } = dispatch( importStore );
	return { setSkipPrevious };
} )( HistoricalDataSkipCheckbox );
