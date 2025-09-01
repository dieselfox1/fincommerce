import type { Settings } from './types';
export declare const useSettings: (group: string, settingsKeys?: string[]) => {
    persistSettings: () => void;
    updateAndPersistSettings: (name: string, data: Settings) => void;
    updateSettings: (name: string, data: Settings) => void;
    siteUrl?: string;
    shopUrl?: string;
    general?: {
        [key: string]: string;
    };
    tax?: {
        [key: string]: string;
    };
    settingsError: boolean;
    isRequesting: boolean;
    isDirty: boolean;
};
//# sourceMappingURL=use-settings.d.ts.map