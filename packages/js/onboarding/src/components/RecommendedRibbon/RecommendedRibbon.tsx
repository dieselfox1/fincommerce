/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import { createElement } from '@finpress/element';

type RecommendedRibbonProps = {
	isLocalPartner?: boolean;
};

export const RecommendedRibbon: React.VFC< RecommendedRibbonProps > = ( {
	isLocalPartner = false,
} ) => {
	const text = isLocalPartner
		? __( 'Local Partner', 'fincommerce' )
		: __( 'Recommended', 'fincommerce' );

	return (
		<div className={ 'fincommerce-task-payment__recommended-ribbon' }>
			<span>{ text }</span>
		</div>
	);
};
