/**
 * External dependencies
 */
import { createElement } from '@finpress/element';

type PlaceholderProps = {
	className: string;
};

const InboxNotePlaceholder = ( { className }: PlaceholderProps ) => {
	return (
		<div
			className={ `fincommerce-inbox-message is-placeholder ${ className }` }
			aria-hidden
		>
			<div className="fincommerce-inbox-message__wrapper">
				<div className="fincommerce-inbox-message__content">
					<div className="fincommerce-inbox-message__date">
						<div className="sixth-line" />
					</div>
					<div className="fincommerce-inbox-message__title">
						<div className="line" />
						<div className="line" />
					</div>
					<div className="fincommerce-inbox-message__text">
						<div className="line" />
						<div className="third-line" />
					</div>
				</div>
				<div className="fincommerce-inbox-message__actions">
					<div className="fifth-line" />
					<div className="fifth-line" />
				</div>
			</div>
		</div>
	);
};

export { InboxNotePlaceholder };
