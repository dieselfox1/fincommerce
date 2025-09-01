import type { ColumnStyle, ViewTable } from '@wordpress/dataviews';
export declare const defaultLayouts: Record<string, {
    layout: {
        primaryField: string;
        mediaField?: string;
        styles?: Record<string, ColumnStyle>;
    };
}>;
export declare function useDefaultViews({ postType }: {
    postType: string;
}): Array<{
    title: string;
    slug: string;
    icon: React.JSX.Element;
    view: ViewTable;
}>;
//# sourceMappingURL=default-views.d.ts.map