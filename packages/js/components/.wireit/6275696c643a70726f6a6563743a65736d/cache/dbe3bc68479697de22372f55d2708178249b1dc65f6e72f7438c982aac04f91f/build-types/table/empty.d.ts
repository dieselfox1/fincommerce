type EmptyTableProps = {
    children: React.ReactNode;
    /** An integer with the number of rows the box should occupy. */
    numberOfRows?: number;
};
/**
 * `EmptyTable` displays a blank space with an optional message passed as a children node
 * with the purpose of replacing a table with no rows.
 * It mimics the same height a table would have according to the `numberOfRows` prop.
 */
declare const EmptyTable: ({ children, numberOfRows }: EmptyTableProps) => JSX.Element;
export default EmptyTable;
//# sourceMappingURL=empty.d.ts.map