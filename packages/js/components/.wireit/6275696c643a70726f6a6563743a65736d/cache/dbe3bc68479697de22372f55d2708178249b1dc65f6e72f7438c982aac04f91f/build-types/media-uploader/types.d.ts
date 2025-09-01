/**
 * External dependencies
 */
import { UploadMediaErrorCode } from '@wordpress/media-utils';
export type ErrorType = {
    code: UploadMediaErrorCode;
    message: string;
    file: File;
};
export type File = {
    id?: number;
} & {
    [k: string]: any;
};
//# sourceMappingURL=types.d.ts.map