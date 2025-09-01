import { __experimentalInputControl as InputControl } from '@wordpress/components';
export declare const defaultDateFormat = "m/d/Y";
export declare const default12HourDateTimeFormat = "m/d/Y h:i a";
export declare const default24HourDateTimeFormat = "m/d/Y H:i";
export type DateTimePickerControlOnChangeHandler = (dateTimeIsoString: string, isValid: boolean) => void;
export type DateTimePickerControlProps = {
    currentDate?: string | null;
    dateTimeFormat?: string;
    disabled?: boolean;
    isDateOnlyPicker?: boolean;
    is12HourPicker?: boolean;
    timeForDateOnly?: 'start-of-day' | 'end-of-day';
    onChange?: DateTimePickerControlOnChangeHandler;
    onBlur?: () => void;
    label?: string;
    placeholder?: string;
    help?: React.ReactNode;
    onChangeDebounceWait?: number;
    popoverProps?: Record<string, boolean | string>;
} & Omit<React.ComponentProps<typeof InputControl>, 'onChange' | 'onDrag'>;
export declare const DateTimePickerControl: import("react").ForwardRefExoticComponent<Omit<DateTimePickerControlProps, "ref"> & import("react").RefAttributes<HTMLInputElement>>;
//# sourceMappingURL=date-time-picker-control.d.ts.map