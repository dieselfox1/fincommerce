export type NoticeAction = {
    label: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
};
export type Notice = {
    id?: string;
    title?: string;
    content?: string;
    className?: string;
    type?: string;
    children?: React.ReactNode;
    isDismissible?: boolean;
    handleDismiss?: () => void;
    actions?: NoticeAction[];
};
export type ValidationNoticesData = {
    notices: Notice[];
    hasValidationNotice: (noticeId?: string) => boolean;
    addValidationNotice: (noticeId: string, message: string, actions?: NoticeAction[]) => void;
    removeValidationNotice: (noticeId: string) => void;
};
export declare const useValidationNotices: () => ValidationNoticesData;
