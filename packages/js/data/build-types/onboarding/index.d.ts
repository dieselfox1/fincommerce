import { SelectFromMap } from '@automattic/data-stores';
import * as selectors from './selectors';
import * as actions from './actions';
import { State } from './reducer';
import { WPDataSelectors } from '../types';
export * from './types';
export type { State };
export declare const store: import("@wordpress/data/build-types/types").StoreDescriptor<import("@wordpress/data/build-types/types").ReduxStoreConfig<unknown, typeof actions, typeof selectors>>;
export declare const ONBOARDING_STORE_NAME = "wc/admin/onboarding";
export type OnboardingSelector = SelectFromMap<typeof selectors> & WPDataSelectors;
//# sourceMappingURL=index.d.ts.map