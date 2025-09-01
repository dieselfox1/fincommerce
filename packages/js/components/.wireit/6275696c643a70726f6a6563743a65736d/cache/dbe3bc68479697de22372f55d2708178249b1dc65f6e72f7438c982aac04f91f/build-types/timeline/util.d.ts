export namespace groupByOptions {
    let DAY: string;
    let WEEK: string;
    let MONTH: string;
}
export function groupItemsUsing(groupBy: any): (groups: any, newItem: any) => any;
export namespace orderByOptions {
    let ASC: string;
    let DESC: string;
}
export function sortByDateUsing(orderBy: any): (groupA: any, groupB: any) => number;
//# sourceMappingURL=util.d.ts.map