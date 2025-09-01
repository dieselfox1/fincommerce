/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * Internal dependencies
 */
import './style.scss';

type Props = {
	title: string | JSX.Element;
	subTitle?: string | JSX.Element;
	className?: string;
};

export const Heading = ( { className, title, subTitle }: Props ) => {
	return (
		<div className={ clsx( 'fincommerce-profiler-heading', className ) }>
			<h1 className="fincommerce-profiler-heading__title">{ title }</h1>
			{ subTitle && (
				<h2 className="fincommerce-profiler-heading__subtitle">
					{ subTitle }
				</h2>
			) }
		</div>
	);
};
