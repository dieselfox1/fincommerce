export type HandleConfirmProps = {
    message?: string;
    onOk(): void;
    onCancel?(): void;
};
export declare function handleConfirm({ message, onOk, onCancel, }: HandleConfirmProps): Promise<void>;
//# sourceMappingURL=handle-confirm.d.ts.map