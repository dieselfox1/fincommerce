import { QueryProps, TableHeader } from './types';
type TablePlaceholderProps = {
    /**  An object of the query parameters passed to the page */
    query?: QueryProps;
    /**  A label for the content in this table. */
    caption: string;
    /**  An integer with the number of rows to display. */
    numberOfRows?: number;
    /**
     * Which column should be the row header, defaults to the first item (`0`) (but could be set to `1`, if the first col
     * is checkboxes, for example). Set to false to disable row headers.
     */
    rowHeader?: number | false;
    /** An array of column headers (see `Table` props). */
    headers: Array<TableHeader>;
};
/**
 * `TablePlaceholder` behaves like `Table` but displays placeholder boxes instead of data. This can be used while loading.
 */
declare const TablePlaceholder: React.VFC<TablePlaceholderProps>;
export default TablePlaceholder;
//# sourceMappingURL=placeholder.d.ts.map