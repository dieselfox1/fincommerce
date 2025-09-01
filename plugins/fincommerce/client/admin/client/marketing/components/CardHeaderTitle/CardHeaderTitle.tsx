/**
 * Internal dependencies
 */
import './CardHeaderTitle.scss';

export const CardHeaderTitle = ( { children }: React.PropsWithChildren ) => {
	return (
		<div className="fincommerce-marketing-card-header-title">
			{ children }
		</div>
	);
};
