import { TemplateCategory, TemplatePreview } from '../../store';
type Props = {
    templates: TemplatePreview[];
    onTemplateSelection: (template: TemplatePreview) => void;
    selectedCategory?: TemplateCategory;
};
export declare function TemplateList({ templates, onTemplateSelection, selectedCategory, }: Props): import("react/jsx-runtime").JSX.Element;
export {};
