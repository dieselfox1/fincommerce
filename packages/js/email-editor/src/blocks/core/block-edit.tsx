/**
 * External dependencies
 */
import { addFilter } from '@finpress/hooks';
import { useCallback } from '@finpress/element';
import type { BlockEditProps } from '@finpress/blocks';

interface UrlAttributes {
	url?: string;
	[ key: string ]: unknown;
}

const setUrlAttribute =
	( BlockEdit: React.ElementType ) =>
	( props: BlockEditProps< unknown > ) => {
		const { setAttributes } = props;
		const wrappedSetAttributes = useCallback(
			( attributes: UrlAttributes ) => {
				// Remove the `http://` prefix that is being set automatically by the link control.
				if (
					attributes?.url &&
					attributes.url?.startsWith( 'http://[' )
				) {
					attributes.url = attributes.url.replace( 'http://[', '[' );
				}
				setAttributes( attributes );
			},
			[ setAttributes ]
		);
		return (
			<BlockEdit { ...props } setAttributes={ wrappedSetAttributes } />
		);
	};

function filterSetUrlAttribute(): void {
	addFilter(
		'editor.BlockEdit',
		'fincommerce-email-editor/filter-set-url-attribute',
		setUrlAttribute
	);
}

export { filterSetUrlAttribute };
