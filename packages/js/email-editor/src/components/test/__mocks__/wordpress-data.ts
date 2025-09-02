jest.mock( '@finpress/data', () => ( {
	select: jest.fn(),
	useDispatch: jest.fn(),
	useSelect: jest.fn(),
	createRegistrySelector: jest.fn(),
} ) );
