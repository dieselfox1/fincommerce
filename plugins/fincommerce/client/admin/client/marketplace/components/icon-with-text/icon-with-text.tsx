/**
 * External dependencies
 */
import { Icon } from '@finpress/icons';
import { ReactElement } from 'react';

/**
 * Internal dependencies
 */
import './icon-with-text.scss';

export interface IconWithTextProps {
	icon: JSX.Element;
	title: ReactElement | string;
	description: string;
}

export default function IconWithText( props: IconWithTextProps ): JSX.Element {
	const { icon, title, description } = props;
	return (
		<div className="fincommerce-marketplace__icon-group">
			<div className="fincommerce-marketplace__icon-group-headline">
				<Icon
					icon={ icon }
					size={ 20 }
					className="fincommerce-marketplace__icon-group-icon"
				/>
				<h3 className="fincommerce-marketplace__icon-group-title">
					{ title }
				</h3>
			</div>
			<p className="fincommerce-marketplace__icon-group-description">
				{ description }
			</p>
		</div>
	);
}
