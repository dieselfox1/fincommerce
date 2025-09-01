export type ContentValidationData = {
    validateContent: () => boolean;
};
export declare const validateEmailContent: (content: string, templateContent: string, { addValidationNotice, hasValidationNotice, removeValidationNotice, }: {
    addValidationNotice: (id: string, message: string, actions: unknown[]) => void;
    hasValidationNotice: (id?: string) => boolean;
    removeValidationNotice: (id: string) => void;
}) => boolean;
export declare const useContentValidation: () => ContentValidationData;
