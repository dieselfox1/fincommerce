"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerCoreProductFields = void 0;
/**
 * Internal dependencies
 */
const api_1 = require("../api");
const basic_select_control_1 = require("./basic-select-control");
const checkbox_1 = require("./checkbox");
const radio_1 = require("./radio");
const text_1 = require("./text");
const toggle_1 = require("./toggle");
const getAllProductFields = () => [
    ...['number'].map((type) => ({
        name: type,
        type,
    })),
    text_1.textSettings,
    toggle_1.toggleSettings,
    radio_1.radioSettings,
    basic_select_control_1.basicSelectControlSettings,
    checkbox_1.checkboxSettings,
].filter(Boolean);
const registerCoreProductFields = (fields = getAllProductFields()) => {
    fields.forEach((field) => {
        (0, api_1.registerProductField)(field.name, field);
    });
};
exports.registerCoreProductFields = registerCoreProductFields;
