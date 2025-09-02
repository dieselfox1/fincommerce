import * as components from '@finpress/components';

declare module '@finpress/components' {
	declare namespace CheckboxControl {
		interface Props {
			indeterminate?: boolean;
		}
	}
}
