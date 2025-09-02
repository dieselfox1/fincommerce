/**
 * External dependencies
 */
import { createElement, useEffect, useRef } from '@finpress/element';
import clsx from 'clsx';

/**
 * Internal dependencies
 */
import { sanitizeHTML } from '../../utils';

type InfoViewProps = {
	text: string;
	className?: string;
	css?: string;
};

export const InfoView = ( { text, className, css = '' }: InfoViewProps ) => {
	const ref = useRef< HTMLDivElement >( null );

	useEffect( () => {
		if ( ref.current ) {
			ref.current.style.cssText = css;
		}
	}, [ css ] );

	return (
		<div
			ref={ ref }
			className={ clsx( 'fincommerce-settings-info-view', className ) }
			dangerouslySetInnerHTML={ {
				__html: sanitizeHTML( text ?? '' ),
			} }
		/>
	);
};
