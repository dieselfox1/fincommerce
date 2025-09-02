/**
 * External dependencies
 */
import { createElement } from '@finpress/element';
import { Spinner, Button } from '@finpress/components';
import { close } from '@finpress/icons';

type SuffixProps = {
	value: string;
	isLoading: boolean;
	isFocused: boolean;
	onRemove: () => void;
};

export const Suffix = ( {
	isLoading,
	isFocused,
	value,
	onRemove,
}: SuffixProps ) => {
	if ( isLoading ) {
		return <Spinner />;
	}

	if ( ! isFocused && value ) {
		return (
			<Button
				icon={ close }
				onClick={ onRemove }
				iconSize={ 16 }
				size="compact"
			/>
		);
	}

	return null;
};
