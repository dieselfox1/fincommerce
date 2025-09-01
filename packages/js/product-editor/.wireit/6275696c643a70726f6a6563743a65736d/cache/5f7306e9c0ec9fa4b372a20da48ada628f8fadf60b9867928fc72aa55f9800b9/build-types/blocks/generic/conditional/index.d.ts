/**
 * Internal dependencies
 */
import metadata from './block.json';
import { Edit } from './edit';
declare const name: string;
export { metadata, name };
export declare const settings: {
    example: {};
    edit: typeof Edit;
};
export declare const init: () => import("@wordpress/blocks").Block<Record<string, any>> | undefined;
//# sourceMappingURL=index.d.ts.map