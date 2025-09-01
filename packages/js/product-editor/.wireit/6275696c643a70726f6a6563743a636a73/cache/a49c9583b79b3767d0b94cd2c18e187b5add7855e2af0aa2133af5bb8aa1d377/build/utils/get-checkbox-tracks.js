"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCheckboxTracks = getCheckboxTracks;
const tracks_1 = require("@fincommerce/tracks");
/**
 * Get additional props to be passed to all checkbox inputs.
 *
 * @param name Name of the checkbox.
 * @return Props.
 */
function getCheckboxTracks(name) {
    return {
        onChange: (isChecked) => {
            (0, tracks_1.recordEvent)(`product_checkbox_${name}`, {
                checked: isChecked,
            });
        },
    };
}
