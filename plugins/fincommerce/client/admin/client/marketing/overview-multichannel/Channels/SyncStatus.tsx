/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import GridiconCheckmarkCircle from 'gridicons/dist/checkmark-circle';
import GridiconSync from 'gridicons/dist/sync';
import GridiconNotice from 'gridicons/dist/notice';
import clsx from 'clsx';

/**
 * Internal dependencies
 */
import { SyncStatusType } from '~/marketing/types';
import { iconSize } from './iconSize';
import './SyncStatus.scss';

type SyncStatusPropsType = {
	status: SyncStatusType;
};

const className = 'fincommerce-marketing-sync-status';

export const SyncStatus = ( { status }: SyncStatusPropsType ) => {
	if ( status === 'failed' ) {
		return (
			<div className={ clsx( className, `${ className }__failed` ) }>
				<GridiconNotice size={ iconSize } />
				{ __( 'Sync failed', 'fincommerce' ) }
			</div>
		);
	}

	if ( status === 'syncing' ) {
		return (
			<div className={ clsx( className, `${ className }__syncing` ) }>
				<GridiconSync size={ iconSize } />
				{ __( 'Syncing', 'fincommerce' ) }
			</div>
		);
	}

	return (
		<div className={ clsx( className, `${ className }__synced` ) }>
			<GridiconCheckmarkCircle size={ iconSize } />
			{ __( 'Synced', 'fincommerce' ) }
		</div>
	);
};
