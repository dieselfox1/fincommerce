"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.controls = exports.batchFetch = void 0;
/**
 * External dependencies
 */
const data_controls_1 = require("@wordpress/data-controls");
const api_fetch_1 = __importDefault(require("@wordpress/api-fetch"));
/**
 * Internal dependencies
 */
const constants_1 = require("../constants");
const utils_1 = require("./utils");
const batchFetch = (optionName) => {
    return {
        type: 'BATCH_FETCH',
        optionName,
    };
};
exports.batchFetch = batchFetch;
let optionNames = [];
const fetches = {};
const debouncedFetch = async (optionName) => {
    // Wrap the debounced function in a promise because debounce function doesn't wait for the promise to resolve
    return new Promise(async (resolve, reject) => (0, utils_1.debounce)(() => {
        // If the option name is already being fetched, return the promise
        if (fetches.hasOwnProperty(optionName)) {
            return fetches[optionName]
                .then(resolve)
                .catch(reject);
        }
        if (optionNames.length === 0) {
            // Previous batch fetch might fail
            optionNames.push(optionName);
        }
        // Get unique option names
        const uniqueOptionNames = [...new Set(optionNames)];
        const names = uniqueOptionNames.join(',');
        // Send request for a group of options
        const fetch = (0, api_fetch_1.default)({
            path: `${constants_1.WC_ADMIN_NAMESPACE}/options?options=${names}`,
        });
        uniqueOptionNames.forEach(async (option) => {
            fetches[option] = fetch;
            try {
                await fetch;
            }
            catch (error) {
                // ignore error, the error will be thrown by the parent fetch
            }
            finally {
                // Delete the fetch after completion to allow wp data to handle cache invalidation
                delete fetches[option];
            }
        });
        // Clear option names after we've sent the request for a group of options
        optionNames = [];
        fetch.then(resolve).catch(reject);
    }, 100)() // 100ms debounce time for batch fetches (to avoid multiple fetches for the same options while not affecting user experience too much. Typically, values between 50ms and 200ms should provide a good balance for most applications.
    );
};
exports.controls = {
    ...data_controls_1.controls,
    async BATCH_FETCH({ optionName }) {
        optionNames.push(optionName);
        // Consolidate multiple fetches into a single fetch
        return await debouncedFetch(optionName);
    },
};
