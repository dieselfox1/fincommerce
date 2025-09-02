/**
 * External dependencies
 */
import { Component } from '@finpress/element';
import { createHigherOrderComponent } from '@finpress/compose';
import { getBlockType } from '@finpress/blocks';
import { addFilter } from '@finpress/hooks';

/**
 * withDefaultAttributes HOC for editor.BlockListBlock.
 *
 * @param object BlockListBlock The BlockListBlock element.
 */
const withDefaultAttributes = createHigherOrderComponent(
	( BlockListBlock ) => {
		class WrappedComponent extends Component {
			mounted = false;

			componentDidMount() {
				const { block, setAttributes } = this.props;

				if ( block.name.startsWith( 'fincommerce/' ) ) {
					setAttributes( this.getAttributesWithDefaults() );
				}
			}

			componentDidUpdate() {
				if (
					this.props.block.name.startsWith( 'fincommerce/' ) &&
					! this.mounted
				) {
					this.mounted = true;
				}
			}

			getAttributesWithDefaults() {
				const blockType = getBlockType( this.props.block.name );
				let attributes = this.props.attributes;

				if (
					! this.mounted &&
					this.props.block.name.startsWith( 'fincommerce/' ) &&
					typeof blockType.attributes !== 'undefined' &&
					typeof blockType.defaults !== 'undefined'
				) {
					attributes = Object.assign(
						{},
						this.props.attributes || {}
					);
					Object.keys( blockType.attributes ).map( ( key ) => {
						if (
							typeof attributes[ key ] === 'undefined' &&
							typeof blockType.defaults[ key ] !== 'undefined'
						) {
							attributes[ key ] = blockType.defaults[ key ];
						}
						return key;
					} );
				}
				return attributes;
			}

			render() {
				return (
					<BlockListBlock
						{ ...this.props }
						attributes={ this.getAttributesWithDefaults() }
					/>
				);
			}
		}
		return WrappedComponent;
	},
	'withDefaultAttributes'
);

/**
 * Hook into `editor.BlockListBlock` to set default attributes (if blocks
 * define them separately) when a block is inserted.
 *
 * This is a workaround for Gutenberg which does not save "default" attributes
 * to the post, which means if defaults change, all existing blocks change too.
 *
 * See https://github.com/finpress/gutenberg/issues/7342
 *
 * To use this, the block name needs a `fincommerce/` prefix, and as well
 * as defining `attributes` during block registration, you must also declare an
 * array called `defaults`. Defaults should be omitted from `attributes`.
 */
addFilter(
	'editor.BlockListBlock',
	'fincommerce-blocks/block-list-block',
	withDefaultAttributes
);
