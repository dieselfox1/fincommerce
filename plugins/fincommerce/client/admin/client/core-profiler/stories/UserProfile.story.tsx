/**
 * Internal dependencies
 */
import { UserProfile } from '../pages/UserProfile';

import '../style.scss';
import { WithSetupWizardLayout } from './WithSetupWizardLayout';

export const Basic = () => (
	<UserProfile
		sendEvent={ () => {} }
		navigationProgress={ 40 }
		context={ {
			userProfile: {},
		} }
	/>
);

export default {
	title: 'FinCommerce Admin/Core Profiler/User Profile',
	component: UserProfile,
	decorators: [ WithSetupWizardLayout ],
};
