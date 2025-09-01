/**
 * External dependencies
 */
import { createElement } from '@wordpress/element';
import clsx from 'clsx';

type FormSectionProps = {
	title: JSX.Element | string;
	description: JSX.Element | string;
	className?: string;
};

export const FormSection = ( {
	title,
	description,
	className,
	children,
}: React.PropsWithChildren< FormSectionProps > ) => {
	return (
		<div className={ clsx( 'fincommerce-form-section', className ) }>
			<div className="fincommerce-form-section__header">
				<h3 className="fincommerce-form-section__title">{ title }</h3>
				<div className="fincommerce-form-section__description">
					{ description }
				</div>
			</div>
			<div className="fincommerce-form-section__content">
				{ children }
			</div>
		</div>
	);
};
