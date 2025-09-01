/**
 * This is a wrapper + a work around the Combobox to
 * expose important properties and events from the
 * internal input element that are required when
 * validating the field in the context of a form
 */
export declare const ComboboxControl: import("react").ForwardRefExoticComponent<Pick<import("@wordpress/components/build-types/base-control/types").BaseControlProps, "label" | "className" | "help" | "hideLabelFromVision" | "__nextHasNoMarginBottom"> & {
    __experimentalRenderItem?: (args: {
        item: import("@wordpress/components/build-types/combobox-control/types").ComboboxControlOption;
    }) => React.ReactNode;
    __next36pxDefaultSize?: boolean;
    __next40pxDefaultSize?: boolean;
    allowReset?: boolean;
    expandOnFocus?: boolean;
    messages?: {
        selected: string;
    };
    onChange?: (value: import("@wordpress/components/build-types/combobox-control/types").ComboboxControlProps["value"]) => void;
    onFilterValueChange?: (value: string) => void;
    options: import("@wordpress/components/build-types/combobox-control/types").ComboboxControlOption[];
    value?: string | null;
} & Pick<import("react").DetailedHTMLProps<import("react").InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "id" | "name" | "onBlur"> & import("react").RefAttributes<HTMLInputElement>>;
//# sourceMappingURL=combobox-control.d.ts.map