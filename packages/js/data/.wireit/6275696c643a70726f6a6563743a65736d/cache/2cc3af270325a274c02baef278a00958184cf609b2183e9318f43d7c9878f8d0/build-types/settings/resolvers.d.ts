type RawSetting = {
    id: string;
    group_id: string;
    label: string;
    description: string;
    tip?: string;
    type: 'text' | 'email' | 'number' | 'color' | 'password' | 'textarea' | 'select' | 'multiselect' | 'radio' | 'image_width' | 'checkbox';
    default: unknown;
    value: unknown;
    options: {
        [key: string]: string;
    };
    placeholder?: string;
};
export declare function getSettings(group: string): Generator<Object, {
    type: "UPDATE_SETTINGS_FOR_GROUP";
    group: string;
    data: import("./types").Settings;
    time: Date;
} | {
    type: "UPDATE_ERROR_FOR_GROUP";
    group: string;
    data: import("./types").Settings | null;
    error: unknown;
    time: Date;
}, RawSetting[]>;
export declare function getSettingsForGroup(group: string): Generator<never, Generator<Object, {
    type: "UPDATE_SETTINGS_FOR_GROUP";
    group: string;
    data: import("./types").Settings;
    time: Date;
} | {
    type: "UPDATE_ERROR_FOR_GROUP";
    group: string;
    data: import("./types").Settings | null;
    error: unknown;
    time: Date;
}, RawSetting[]>, unknown>;
export {};
//# sourceMappingURL=resolvers.d.ts.map