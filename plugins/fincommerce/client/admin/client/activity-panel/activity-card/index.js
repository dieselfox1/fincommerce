/**
 * External dependencies
 */
import clsx from 'clsx';
import { cloneElement, Component } from '@wordpress/element';
import NoticeOutline from 'gridicons/dist/notice-outline';
import moment from 'moment';
import PropTypes from 'prop-types';
import { H, Section } from '@fincommerce/components';
import { Button } from '@wordpress/components';

/**
 * Internal dependencies
 */
import './style.scss';

/**
 * Determine if the provided string is a date, as
 * formatted by wc_rest_prepare_date_response().
 *
 * @param {string} value String value
 */
const isDateString = ( value ) =>
	// PHP date format: Y-m-d\TH:i:s.
	/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test( value );

class ActivityCard extends Component {
	getCard() {
		const {
			actions,
			className,
			children,
			date,
			icon,
			subtitle,
			title,
			unread,
		} = this.props;
		const cardClassName = clsx( 'fincommerce-activity-card', className );
		const actionsList = Array.isArray( actions ) ? actions : [ actions ];
		const dateString = isDateString( date )
			? moment.utc( date ).fromNow()
			: date;

		return (
			<section className={ cardClassName }>
				{ unread && (
					<span className="fincommerce-activity-card__unread" />
				) }
				{ icon && (
					<span
						className="fincommerce-activity-card__icon"
						aria-hidden
					>
						{ icon }
					</span>
				) }
				{ title && (
					<header className="fincommerce-activity-card__header">
						<H className="fincommerce-activity-card__title">
							{ title }
						</H>
						{ subtitle && (
							<div className="fincommerce-activity-card__subtitle">
								{ subtitle }
							</div>
						) }
						{ dateString && (
							<span className="fincommerce-activity-card__date">
								{ dateString }
							</span>
						) }
					</header>
				) }
				{ children && (
					<Section className="fincommerce-activity-card__body">
						{ children }
					</Section>
				) }
				{ actions && (
					<footer className="fincommerce-activity-card__actions">
						{ actionsList.map( ( item, i ) =>
							cloneElement( item, { key: i } )
						) }
					</footer>
				) }
			</section>
		);
	}

	render() {
		const { onClick } = this.props;
		if ( onClick ) {
			return (
				<Button
					className="fincommerce-activity-card__button"
					onClick={ onClick }
				>
					{ this.getCard() }
				</Button>
			);
		}
		return this.getCard();
	}
}

ActivityCard.propTypes = {
	actions: PropTypes.oneOfType( [
		PropTypes.arrayOf( PropTypes.element ),
		PropTypes.element,
	] ),
	onClick: PropTypes.func,
	className: PropTypes.string,
	children: PropTypes.node,
	date: PropTypes.string,
	icon: PropTypes.node,
	subtitle: PropTypes.node,
	title: PropTypes.oneOfType( [ PropTypes.string, PropTypes.node ] ),
	unread: PropTypes.bool,
};

ActivityCard.defaultProps = {
	icon: <NoticeOutline size={ 48 } />,
	unread: false,
};

export { ActivityCard };
export { default as ActivityCardPlaceholder } from './placeholder';
