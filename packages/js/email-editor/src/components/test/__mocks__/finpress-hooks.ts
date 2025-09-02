jest.mock( '@finpress/hooks', () => ( {
	applyFilters: ( _hook: string, value: string ) => value,
} ) );
