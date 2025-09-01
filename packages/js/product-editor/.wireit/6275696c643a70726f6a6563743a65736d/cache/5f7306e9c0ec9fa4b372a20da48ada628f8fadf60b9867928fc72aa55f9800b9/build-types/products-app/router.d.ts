export type Route = {
    key: string;
    areas: {
        sidebar?: React.JSX.Element;
        content?: React.JSX.Element;
        edit?: React.JSX.Element;
        mobile?: React.JSX.Element | boolean;
        preview?: boolean;
    };
    widths?: {
        content?: number;
        edit?: number;
        sidebar?: number;
    };
};
export default function useLayoutAreas(): {
    key: string;
    areas: {
        sidebar: JSX.Element;
        content: JSX.Element;
        preview: boolean;
        mobile: JSX.Element;
        edit: any;
    };
    widths: {
        edit: number | undefined;
    };
} | {
    key: string;
    areas: {
        preview: boolean;
        mobile: boolean;
        sidebar?: undefined;
        content?: undefined;
        edit?: undefined;
    };
    widths?: undefined;
};
//# sourceMappingURL=router.d.ts.map