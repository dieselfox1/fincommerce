import { APIFetchOptions } from '@wordpress/api-fetch';
import { AnyAction } from 'redux';
export declare const fetchWithHeaders: (options: APIFetchOptions) => AnyAction & {
    options: APIFetchOptions;
};
export type FetchWithHeadersResponse<Data> = {
    headers: Response['headers'];
    status: Response['status'];
    data: Data;
};
declare const controls: {
    FETCH_WITH_HEADERS(action: AnyAction): Promise<any>;
    AWAIT_PROMISE: <T>({ promise }: {
        promise: Promise<T>;
    }) => Promise<T>;
    API_FETCH({ request }: {
        request: APIFetchOptions;
    }): Promise<unknown>;
};
export default controls;
//# sourceMappingURL=controls.d.ts.map