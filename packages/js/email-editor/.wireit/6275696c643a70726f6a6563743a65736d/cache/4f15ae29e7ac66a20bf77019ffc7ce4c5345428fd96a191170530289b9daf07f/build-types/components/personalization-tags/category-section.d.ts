/**
 * Internal dependencies
 */
import { PersonalizationTag } from '../../store';
declare const CategorySection: ({ groupedTags, activeCategory, onInsert, canInsertLink, closeCallback, openLinkModal, }: {
    groupedTags: Record<string, PersonalizationTag[]>;
    activeCategory: string | null;
    onInsert: (tag: string, isLink: boolean) => void;
    canInsertLink: boolean;
    closeCallback: () => void;
    openLinkModal: (tag: PersonalizationTag) => void;
}) => import("react/jsx-runtime").JSX.Element;
export { CategorySection };
