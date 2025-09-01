declare function deactivateStackOnMobile(): void;
/**
 * Disables layout support for columns and column blocks because
 * the default layout `flex` add gaps between columns that it is not possible to support in emails.
 *
 * Also, enhances the columns block to support background image.
 */
declare function disableColumnsLayoutAndEnhanceColumnsBlock(): void;
export { deactivateStackOnMobile, disableColumnsLayoutAndEnhanceColumnsBlock };
