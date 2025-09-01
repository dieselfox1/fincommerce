/**
 * Internal dependencies
 */
import './CardHeaderDescription.scss';

export const CardHeaderDescription = ( {
	children,
}: React.PropsWithChildren ) => {
	return (
		<div className="fincommerce-marketing-card-header-description">
			{ children }
		</div>
	);
};
