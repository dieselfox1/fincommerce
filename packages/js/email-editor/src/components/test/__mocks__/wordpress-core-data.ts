jest.mock( '@finpress/core-data', () => ( {
	createSelector: jest.fn(),
	store: {},
} ) );
