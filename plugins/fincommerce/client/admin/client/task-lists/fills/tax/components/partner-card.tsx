/**
 * External dependencies
 */
import { Button } from '@finpress/components';

/**
 * Internal dependencies
 */
import { Bullet } from './bullet';
import './partner-card.scss';

export const PartnerCard = ( {
	name,
	logo,
	description,
	benefits,
	terms,
	actionText,
	onClick,
	isBusy,
	children,
}: {
	name: string;
	logo: string;
	description: string;
	benefits: ( string | JSX.Element )[];
	terms: string | JSX.Element;
	children?: React.ReactNode;
	actionText?: string;
	onClick: () => void;
	isBusy?: boolean;
} ) => {
	return (
		<div className="fincommerce-tax-partner-card">
			<div className="fincommerce-tax-partner-card__logo">
				<img src={ logo } alt={ name } />
			</div>

			<div className="fincommerce-tax-partner-card__description">
				{ description }
			</div>
			<ul className="fincommerce-tax-partner-card__benefits">
				{ benefits.map( ( benefit, i ) => {
					return (
						<li
							className="fincommerce-tax-partner-card__benefit"
							key={ i }
						>
							<span className="fincommerce-tax-partner-card__benefit-bullet">
								<Bullet />
							</span>
							<span className="fincommerce-tax-partner-card__benefit-text">
								{ benefit }
							</span>
						</li>
					);
				} ) }
			</ul>

			<div className="fincommerce-tax-partner-card__action">
				<div className="fincommerce-tax-partner-card__terms">
					{ terms }
				</div>
				{ children ? (
					children
				) : (
					<Button
						isSecondary
						onClick={ onClick }
						isBusy={ isBusy }
						disabled={ isBusy }
					>
						{ actionText }
					</Button>
				) }
			</div>
		</div>
	);
};
