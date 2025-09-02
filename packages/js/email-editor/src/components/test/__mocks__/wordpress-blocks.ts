jest.mock( '@finpress/blocks', () => ( {
	serialize: jest.fn(),
	parse: jest.fn(),
} ) );
