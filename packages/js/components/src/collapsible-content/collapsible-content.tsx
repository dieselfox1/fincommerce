/**
 * External dependencies
 */
import { useInstanceId } from '@finpress/compose';
import { createElement, useState } from '@finpress/element';
import { Icon, chevronDown, chevronUp } from '@finpress/icons';

/**
 * Internal dependencies
 */
import { DisplayState } from '../display-state';

export type CollapsedProps = {
	initialCollapsed?: boolean;
	toggleText: string;
	persistRender?: boolean;
	children: React.ReactNode;
	hintText?: string;
} & React.HTMLAttributes< HTMLDivElement >;

export const CollapsibleContent = ( {
	initialCollapsed = true,
	toggleText,
	children,
	persistRender = false,
	hintText,
	...props
}: CollapsedProps ) => {
	const [ collapsed, setCollapsed ] = useState( initialCollapsed );

	const getState = () => {
		if ( ! collapsed ) {
			return 'visible';
		}

		return persistRender ? 'visually-hidden' : 'hidden';
	};

	const collapsibleToggleId = useInstanceId(
		CollapsibleContent,
		'fincommerce-collapsible-content__toggle'
	) as string;
	const collapsibleContentId = useInstanceId(
		CollapsibleContent,
		'fincommerce-collapsible-content__content'
	) as string;

	const displayState = getState();

	return (
		<div className="fincommerce-collapsible-content">
			<button
				type="button"
				id={ collapsibleToggleId }
				className="fincommerce-collapsible-content__toggle"
				onClick={ () => setCollapsed( ! collapsed ) }
				aria-expanded={ collapsed ? 'false' : 'true' }
				aria-controls={
					displayState !== 'hidden' ? collapsibleContentId : undefined
				}
			>
				<span>{ toggleText }</span>

				<Icon
					icon={ collapsed ? chevronDown : chevronUp }
					size={ 16 }
				/>
			</button>

			{ hintText && (
				<p className="fincommerce-collapsible-content-hint">
					{ hintText }
				</p>
			) }

			<DisplayState state={ displayState }>
				<div
					{ ...props }
					className="fincommerce-collapsible-content__content"
					id={ collapsibleContentId }
					role="region"
					aria-labelledby={ collapsibleToggleId }
				>
					{ children }
				</div>
			</DisplayState>
		</div>
	);
};
