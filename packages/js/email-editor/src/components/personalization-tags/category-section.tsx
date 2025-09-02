/**
 * External dependencies
 */
import { Button } from '@finpress/components';
import { __ } from '@finpress/i18n';
import { useDispatch, useSelect } from '@finpress/data';
import { store as blockEditorStore } from '@finpress/block-editor';

/**
 * Internal dependencies
 */
import { PersonalizationTag } from '../../store';

const CategorySection = ( {
	groupedTags,
	activeCategory,
	onInsert,
	canInsertLink,
	closeCallback,
	openLinkModal,
}: {
	groupedTags: Record< string, PersonalizationTag[] >;
	activeCategory: string | null;
	onInsert: ( tag: string, isLink: boolean ) => void;
	canInsertLink: boolean;
	closeCallback: () => void;
	openLinkModal: ( tag: PersonalizationTag ) => void;
} ) => {
	const { updateBlockAttributes } = useDispatch( blockEditorStore );
	const selectedBlockId = useSelect( ( select ) =>
		select( blockEditorStore ).getSelectedBlockClientId()
	);
	const selectedBlock = useSelect( ( select ) =>
		select( blockEditorStore ).getBlock( selectedBlockId )
	);
	const canSetURL = [ 'core/button' ].includes( selectedBlock?.name );

	const categoriesToRender: [ string, PersonalizationTag[] ][] =
		activeCategory === null
			? Object.entries( groupedTags ) // Render all categories
			: [ [ activeCategory, groupedTags[ activeCategory ] || [] ] ]; // Render only one selected category

	return (
		<>
			{ categoriesToRender.map(
				( [ category, items ]: [ string, PersonalizationTag[] ] ) => (
					<div key={ category }>
						<div className="fincommerce-personalization-tags-modal-category">
							{ category }
						</div>
						<div className="fincommerce-personalization-tags-modal-category-group">
							{ items.map( ( item ) => {
								// Detects if the personalization tag is expected to return a URL by checking the token name,
								// since personalization tags lack explicit return type definitions.
								const isURLTag = /\burl\b/.test( item.token );

								return (
									<div
										className="fincommerce-personalization-tags-modal-category-group-item"
										key={ item.token }
									>
										<div className="fincommerce-personalization-tags-modal-item-text">
											<strong>{ item.name }</strong>
											{ item.valueToInsert }
										</div>
										<div
											style={ {
												display: 'flex',
												flexDirection: 'column',
												alignItems: 'flex-end',
											} }
										>
											<Button
												variant="link"
												onClick={ () => {
													if ( onInsert ) {
														onInsert(
															item.valueToInsert,
															false
														);
													}
												} }
											>
												{ __(
													'Insert',
													'fincommerce'
												) }
											</Button>
											{ canSetURL && isURLTag && (
												<Button
													variant="link"
													onClick={ () => {
														updateBlockAttributes(
															selectedBlockId,
															{
																url: item.valueToInsert,
															}
														);
														closeCallback();
													} }
												>
													{ __(
														'Set as URL',
														'fincommerce'
													) }
												</Button>
											) }
											{ category ===
												__( 'Link', 'fincommerce' ) &&
												canInsertLink && (
													<>
														<Button
															variant="link"
															onClick={ () => {
																closeCallback();
																openLinkModal(
																	item
																);
															} }
														>
															{ __(
																'Insert as link',
																'fincommerce'
															) }
														</Button>
													</>
												) }
										</div>
									</div>
								);
							} ) }
						</div>
					</div>
				)
			) }
		</>
	);
};

export { CategorySection };
