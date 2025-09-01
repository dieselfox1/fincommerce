import { Country } from './utils';
interface Props {
    /**
     *	Phone number with spaces and hyphens.
     */
    value: string;
    /**
     * Callback function when the value changes.
     *
     * @param value   Phone number with spaces and hyphens. e.g. `+1 234-567-8901`
     * @param e164    Phone number in E.164 format. e.g. `+12345678901`
     * @param country Country alpha2 code. e.g. `US`
     */
    onChange: (value: string, e164: string, country: string) => void;
    /**
     * ID for the input element, to bind a `<label>`.
     *
     * @default undefined
     */
    id?: string;
    /**
     * Additional class name applied to parent `<div>`.
     *
     * @default undefined
     */
    className?: string;
    /**
     * Render function for the selected country.
     * Displays the country flag and code by default.
     *
     * @default defaultSelectedRender
     */
    selectedRender?: (country: Country) => React.ReactNode;
    /**
     * Render function for each country in the dropdown.
     * Displays the country flag, name, and code by default.
     *
     * @default defaultItemRender
     */
    itemRender?: (country: Country) => React.ReactNode;
    /**
     * Render function for the dropdown arrow.
     * Displays a chevron down icon by default.
     *
     * @default defaultArrowRender
     */
    arrowRender?: () => React.ReactNode;
}
/**
 * An international phone number input with a country code select and a phone textfield which supports numbers, spaces and hyphens. And returns the full number as it is, in E.164 format, and the selected country alpha2.
 */
declare const PhoneNumberInput: ({ value, onChange, id, className, selectedRender, itemRender, arrowRender, }: Props) => JSX.Element;
export default PhoneNumberInput;
//# sourceMappingURL=index.d.ts.map