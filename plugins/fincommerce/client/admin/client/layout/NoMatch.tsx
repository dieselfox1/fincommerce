/**
 * External dependencies
 */
import { useState, useEffect } from '@finpress/element';

/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import { Card, CardBody } from '@finpress/components';
import { Spinner } from '@fincommerce/components';
import { Text } from '@fincommerce/experimental';
import { WooHeaderPageTitle } from '@fincommerce/admin-layout';

const NoMatch = () => {
	const [ isDelaying, setIsDelaying ] = useState( true );

	/*
	 * Delay for 3 seconds to wait if there are routing pages added after the
	 * initial routing pages to reduce the chance of flashing the error message
	 * on this page.
	 */
	useEffect( () => {
		const timerId = setTimeout( () => {
			setIsDelaying( false );
		}, 3000 );

		return () => {
			clearTimeout( timerId );
		};
	}, [] );

	if ( isDelaying ) {
		return (
			<>
				<WooHeaderPageTitle>
					{ __( 'Loading…', 'fincommerce' ) }
				</WooHeaderPageTitle>
				<div className="fincommerce-layout__loading">
					<Spinner />
				</div>
			</>
		);
	}

	return (
		<div className="fincommerce-layout__no-match">
			<Card>
				<CardBody>
					<Text>
						{ __(
							'Sorry, you are not allowed to access this page.',
							'fincommerce'
						) }
					</Text>
				</CardBody>
			</Card>
		</div>
	);
};

export { NoMatch };
