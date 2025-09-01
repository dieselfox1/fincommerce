/**
 * Internal dependencies
 */
import { TemplateCategory } from '../../store';
type Props = {
    selectedCategory?: TemplateCategory;
    templateCategories: Array<{
        name: TemplateCategory;
        label: string;
    }>;
    onClickCategory: (name: TemplateCategory) => void;
};
export declare function TemplateCategoriesListSidebar({ selectedCategory, templateCategories, onClickCategory, }: Props): import("react/jsx-runtime").JSX.Element;
export {};
