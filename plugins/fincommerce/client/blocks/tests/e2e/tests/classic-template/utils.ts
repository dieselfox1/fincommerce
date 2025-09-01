export const fincommerce_ID = 'fincommerce/fincommerce';

export const getDefaultTemplateProps = ( templateTitle: string ) => {
	return {
		templateTitle,
		addedBy: fincommerce_ID,
		hasActions: false,
	};
};
