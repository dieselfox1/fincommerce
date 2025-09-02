jest.mock( '@finpress/editor', () => ( {
	useEntitiesSavedStatesIsDirty: jest.fn(),
	store: {},
} ) );
