jest.mock( '@finpress/i18n', () => ( {
	__: ( str: string ) => str,
	sprintf: ( format: string, value: string ) => format.replace( '%s', value ),
} ) );
