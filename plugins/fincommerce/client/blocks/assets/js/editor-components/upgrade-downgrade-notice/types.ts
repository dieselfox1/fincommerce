/**
 * External dependencies
 */
import { Notice } from '@finpress/components';

export type UpgradeDowngradeNoticeProps = Omit< Notice.Props, 'actions' > & {
	actionLabel: string;
	onActionClick(): void;
};
