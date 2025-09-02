/**
 * External dependencies
 */
import { Button } from '@finpress/components';
import { __ } from '@finpress/i18n';
import { speak } from '@finpress/a11y';
import { queueRecordEvent } from '@fincommerce/tracks';

interface LoadMoreProps {
	onLoadMore: () => void;
	isBusy: boolean;
	disabled: boolean;
}

export default function LoadMoreButton( props: LoadMoreProps ) {
	const { onLoadMore, isBusy, disabled } = props;
	function handleClick() {
		queueRecordEvent( 'marketplace_load_more_button_clicked', {} );
		onLoadMore();
	}

	if ( isBusy ) {
		speak( __( 'Loading more products', 'fincommerce' ) );
	}

	return (
		<Button
			className="fincommerce-marketplace__load-more"
			variant={ 'secondary' }
			onClick={ handleClick }
			isBusy={ isBusy }
			disabled={ disabled }
		>
			{ __( 'Load more', 'fincommerce' ) }
		</Button>
	);
}
