/**
 * External dependencies
 */
import clsx from 'clsx';
import { Card, CardBody } from '@finpress/components';
import { Stepper } from '@fincommerce/components';

export const Placeholder = () => {
	const classes = clsx(
		'is-loading',
		'fincommerce-task-payment-method',
		'fincommerce-task-card'
	);

	return (
		<Card aria-hidden="true" className={ classes }>
			<CardBody>
				<Stepper
					isVertical
					currentStep={ 'none' }
					steps={ [
						{
							key: 'first',
							label: '',
						},
						{
							key: 'second',
							label: '',
						},
					] }
				/>
			</CardBody>
		</Card>
	);
};
