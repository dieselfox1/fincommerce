/**
 * Internal dependencies
 */
import metadata from './block.json';
import { AttributesBlockEdit } from './edit';
declare const name: string;
export { metadata, name };
export declare const settings: {
    example: {};
    edit: typeof AttributesBlockEdit;
};
export declare const init: () => import("@wordpress/blocks").Block<Record<string, any>> | undefined;
//# sourceMappingURL=index.d.ts.map