export type HandlePromptProps = {
    message?: string;
    defaultValue?: string;
    onOk(value: string): void;
    onCancel?(): void;
};
export declare function handlePrompt({ message, defaultValue, onOk, onCancel, }: HandlePromptProps): Promise<void>;
//# sourceMappingURL=handle-prompt.d.ts.map