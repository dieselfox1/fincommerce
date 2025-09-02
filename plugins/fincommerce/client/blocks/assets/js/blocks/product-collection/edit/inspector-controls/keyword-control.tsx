/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import { useEffect, useState } from '@finpress/element';
import { useDebounce } from '@finpress/compose';
import {
	TextControl,
	// @ts-expect-error Using experimental features
	// eslint-disable-next-line @finpress/no-unsafe-wp-apis
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@finpress/components';

/**
 * Internal dependencies
 */
import { CoreFilterNames, QueryControlProps } from '@fincommerce/block-library/assets/js/blocks/product-collection/types';

const KeywordControl = ( props: QueryControlProps ) => {
	const { query, trackInteraction, setQueryAttribute } = props;
	const [ querySearch, setQuerySearch ] = useState( query.search );

	const onChangeDebounced = useDebounce( () => {
		if ( query.search !== querySearch ) {
			setQueryAttribute( {
				search: querySearch,
			} );
			trackInteraction( CoreFilterNames.KEYWORD );
		}
	}, 250 );

	useEffect( () => {
		onChangeDebounced();
		return onChangeDebounced.cancel;
	}, [ querySearch, onChangeDebounced ] );

	const deselectCallback = () => {
		setQuerySearch( '' );
		trackInteraction( CoreFilterNames.KEYWORD );
	};

	return (
		<ToolsPanelItem
			hasValue={ () => !! querySearch }
			label={ __( 'Keyword', 'fincommerce' ) }
			onDeselect={ deselectCallback }
			resetAllFilter={ deselectCallback }
		>
			<TextControl
				label={ __( 'Keyword', 'fincommerce' ) }
				value={ querySearch }
				onChange={ setQuerySearch }
			/>
		</ToolsPanelItem>
	);
};

export default KeywordControl;
