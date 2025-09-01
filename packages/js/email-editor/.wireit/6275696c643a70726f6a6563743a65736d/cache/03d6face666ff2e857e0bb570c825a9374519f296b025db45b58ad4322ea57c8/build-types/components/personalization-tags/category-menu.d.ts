declare const CategoryMenu: ({ groupedTags, activeCategory, onCategorySelect, }: {
    groupedTags: Record<string, unknown[]>;
    activeCategory: string | null;
    onCategorySelect: (category: string | null) => void;
}) => import("react/jsx-runtime").JSX.Element;
export { CategoryMenu };
