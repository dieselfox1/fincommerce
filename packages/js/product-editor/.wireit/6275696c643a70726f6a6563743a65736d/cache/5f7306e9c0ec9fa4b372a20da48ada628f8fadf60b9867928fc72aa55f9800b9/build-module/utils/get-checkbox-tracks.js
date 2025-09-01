import { recordEvent } from '@fincommerce/tracks';
/**
 * Get additional props to be passed to all checkbox inputs.
 *
 * @param name Name of the checkbox.
 * @return Props.
 */
export function getCheckboxTracks(name) {
    return {
        onChange: (isChecked) => {
            recordEvent(`product_checkbox_${name}`, {
                checked: isChecked,
            });
        },
    };
}
