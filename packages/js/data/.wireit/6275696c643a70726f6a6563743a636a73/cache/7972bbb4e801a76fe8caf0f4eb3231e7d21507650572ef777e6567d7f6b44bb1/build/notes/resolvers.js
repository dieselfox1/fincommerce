"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNotes = getNotes;
/**
 * External dependencies
 */
const url_1 = require("@wordpress/url");
const data_controls_1 = require("@wordpress/data-controls");
/**
 * Internal dependencies
 */
const constants_1 = require("../constants");
const actions_1 = require("./actions");
const utils_1 = require("../utils");
function* getNotes(query = {}) {
    const url = (0, url_1.addQueryArgs)(`${constants_1.NAMESPACE}/admin/notes`, query);
    try {
        yield (0, utils_1.checkUserCapability)('manage_fincommerce');
        const notes = yield (0, data_controls_1.apiFetch)({
            path: url,
        });
        yield (0, actions_1.setNotes)(notes);
        yield (0, actions_1.setNotesQuery)(query, notes.map((note) => note.id));
    }
    catch (error) {
        yield (0, actions_1.setError)('getNotes', error);
    }
}
