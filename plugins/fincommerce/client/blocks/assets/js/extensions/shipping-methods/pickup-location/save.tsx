/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import styled from '@emotion/styled';
import { Button } from '@finpress/components';

/**
 * Internal dependencies
 */
import { SettingsSection } from '@fincommerce/block-library/assets/js/extensions/shipping-methods/shared-components';
import { useSettingsContext } from '@fincommerce/block-library/assets/js/extensions/shipping-methods/pickup-location/settings-context';

const SaveSectionWrapper = styled( SettingsSection )`
	text-align: right;
	padding-top: 0;
	margin-top: 0;
`;

const SaveSettings = () => {
	const { isSaving, save, isDirty } = useSettingsContext();

	return (
		<SaveSectionWrapper className={ 'submit' }>
			<Button
				variant="primary"
				isBusy={ isSaving }
				disabled={ isSaving || ! isDirty }
				onClick={ (
					event: React.MouseEvent< HTMLButtonElement, MouseEvent >
				) => {
					event.preventDefault();
					const target = event.target as HTMLButtonElement;
					if ( target?.form?.reportValidity() ) {
						save();
					}
				} }
				type="submit"
			>
				{ __( 'Save changes', 'fincommerce' ) }
			</Button>
		</SaveSectionWrapper>
	);
};

export default SaveSettings;
