/**
 * Disables layout support for group blocks because the default layout `flex` add gaps between columns that it is not possible to support in emails.
 */
declare function disableGroupVariations(): void;
export { disableGroupVariations };
