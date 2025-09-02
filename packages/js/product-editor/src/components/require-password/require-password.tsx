/**
 * External dependencies
 */
import { useInstanceId } from '@finpress/compose';
import {
	createElement,
	Fragment,
	useEffect,
	useState,
} from '@finpress/element';
import { __ } from '@finpress/i18n';
import { recordEvent } from '@fincommerce/tracks';
import {
	BaseControl,
	CheckboxControl,
	__experimentalInputControl as InputControl,
} from '@finpress/components';

/**
 * Internal dependencies
 */
import { RequirePasswordProps } from './types';
import { TRACKS_SOURCE } from '../../constants';

export function RequirePassword( {
	label,
	postPassword,
	onInputChange,
}: RequirePasswordProps ) {
	const postPasswordId = useInstanceId(
		BaseControl,
		'post_password'
	) as string;

	const [ isPasswordRequired, setPasswordRequired ] = useState(
		Boolean( postPassword )
	);

	useEffect( () => {
		if ( ! isPasswordRequired && postPassword !== '' ) {
			setPasswordRequired( true );
		}
	}, [ postPassword ] );

	return (
		<>
			<CheckboxControl
				label={ label }
				checked={ isPasswordRequired }
				className="wp-block-fincommerce-product-password-fields__field"
				onChange={ ( selected ) => {
					recordEvent( 'product_catalog_require_password', {
						source: TRACKS_SOURCE,
						value: selected,
					} );
					setPasswordRequired( selected );
					if ( ! selected ) {
						onInputChange( '' );
					}
				} }
			/>
			{ isPasswordRequired && (
				<BaseControl
					id={ postPasswordId }
					label={ __( 'Password', 'fincommerce' ) }
				>
					<InputControl
						id={ postPasswordId }
						value={ postPassword }
						onChange={ ( value ) => {
							onInputChange( value ?? '' );
						} }
					/>
				</BaseControl>
			) }
		</>
	);
}
