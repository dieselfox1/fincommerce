/**
 * Internal dependencies
 */
import { PostWithPermissions } from '../../store';
declare const getTrashEmailPostAction: () => {
    id: string;
    label: string;
    supportsBulk: boolean;
    icon: import("react").JSX.Element;
    isEligible(item: PostWithPermissions): boolean;
    hideModalHeader: boolean;
    modalFocusOnMount: string;
    RenderModal: ({ items, closeModal, onActionPerformed }: {
        items: any;
        closeModal: any;
        onActionPerformed: any;
    }) => import("react/jsx-runtime").JSX.Element;
};
/**
 * Delete action for PostWithPermissions.
 */
export default getTrashEmailPostAction;
