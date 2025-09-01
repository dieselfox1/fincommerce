/**
 * Internal dependencies
 */
import type { Taxonomy } from '../../../types';
type CreateTaxonomyModalProps = {
    initialName?: string;
    dialogNameHelpText?: string;
    parentTaxonomyText?: string;
    hierarchical: boolean;
    slug: string;
    title: string;
    onCancel: () => void;
    onCreate: (taxonomy: Taxonomy) => void;
};
export declare const CreateTaxonomyModal: ({ onCancel, onCreate, initialName, slug, hierarchical, dialogNameHelpText, parentTaxonomyText, title, }: CreateTaxonomyModalProps) => JSX.Element;
export {};
//# sourceMappingURL=create-taxonomy-modal.d.ts.map