/**
 * External dependencies
 */
import { useDispatch, useSelect } from '@finpress/data';
import { Button, Card, CardHeader } from '@finpress/components';
import { optionsStore } from '@fincommerce/data';
import { EllipsisMenu } from '@fincommerce/components';
import { __ } from '@finpress/i18n';
import { createContext, useContext } from '@finpress/element';
import clsx from 'clsx';

/**
 * Internal dependencies
 */
import './dismissable-list.scss';

// using a context provider for the option name so that the option name prop doesn't need to be passed to the `DismissableListHeading` too
const OptionNameContext = createContext( '' );

export const DismissableListHeading = ( {
	onDismiss = () => null,
	children,
}: {
	children: React.ReactNode;
	onDismiss?: () => void;
} ) => {
	const { updateOptions } = useDispatch( optionsStore );
	const dismissOptionName = useContext( OptionNameContext );

	const handleDismissClick = () => {
		onDismiss();
		updateOptions( {
			[ dismissOptionName ]: 'yes',
		} );
	};

	return (
		<CardHeader>
			<div className="fincommerce-dismissable-list__header">
				{ children }
			</div>
			<div>
				<EllipsisMenu
					label={ __( 'Task List Options', 'fincommerce' ) }
					renderContent={ () => (
						<div className="fincommerce-dismissable-list__controls">
							<Button onClick={ handleDismissClick }>
								{ __( 'Hide this', 'fincommerce' ) }
							</Button>
						</div>
					) }
				/>
			</div>
		</CardHeader>
	);
};

export const DismissableList = ( {
	children,
	className,
	dismissOptionName,
}: {
	children: React.ReactNode;
	className?: string;
	dismissOptionName: string;
} ) => {
	const isVisible = useSelect(
		( select ) => {
			const { getOption, hasFinishedResolution } = select( optionsStore );

			const hasFinishedResolving = hasFinishedResolution( 'getOption', [
				dismissOptionName,
			] );

			const isDismissed = getOption( dismissOptionName ) === 'yes';

			return hasFinishedResolving && ! isDismissed;
		},
		[ dismissOptionName ]
	);

	if ( ! isVisible ) {
		return null;
	}

	return (
		<Card
			size="medium"
			className={ clsx( 'fincommerce-dismissable-list', className ) }
		>
			<OptionNameContext.Provider value={ dismissOptionName }>
				{ children }
			</OptionNameContext.Provider>
		</Card>
	);
};
