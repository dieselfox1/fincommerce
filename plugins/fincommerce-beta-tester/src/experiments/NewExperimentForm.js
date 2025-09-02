/**
 * External dependencies
 */
import { withDispatch } from '@finpress/data';
import { compose } from '@finpress/compose';
import { Button } from '@finpress/components';
import { useState } from '@finpress/element';

/**
 * Internal dependencies
 */
import { STORE_KEY } from './data/constants';
import './data';

function NewExperimentForm( { addExperiment } ) {
	const [ experimentName, setExperimentName ] = useState( null );
	const [ variation, setVariation ] = useState( 'treatment' );

	const getInputValue = ( event ) => {
		setExperimentName( event.target.value );
	};

	const getVariationInput = ( event ) => {
		setVariation( event.target.value );
	};

	const AddNewExperiment = () => {
		addExperiment( experimentName, variation );
	};

	return (
		<div className="manual-input">
			<div className="description">
				Don&apos;t see an experiment you want to test? Add it manually.
			</div>
			<input type="text" onChange={ getInputValue } />
			<select value={ variation } onChange={ getVariationInput }>
				<option value="treatment">treatment</option>
				<option value="control">control</option>
			</select>

			<Button isPrimary onClick={ AddNewExperiment }>
				Add
			</Button>
		</div>
	);
}

export default compose(
	withDispatch( ( dispatch ) => {
		const { addExperiment } = dispatch( STORE_KEY );
		return {
			addExperiment,
		};
	} )
)( NewExperimentForm );
