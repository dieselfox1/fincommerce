"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAnonId = exports.initializeAnonId = exports.readAnonCookie = void 0;
/**
 * External dependencies
 */
const cookie_1 = __importDefault(require("cookie"));
/**
 * Internal dependencies
 */
const assignment_1 = require("./assignment");
let initializeAnonIdPromise = null;
const anonIdPollingIntervalMilliseconds = 50;
const anonIdPollingIntervalMaxAttempts = 100; // 50 * 100 = 5000 = 5 seconds
/**
 * Gather w.js anonymous cookie, tk_ai
 */
const readAnonCookie = () => {
    return cookie_1.default.parse(document.cookie).tk_ai || null;
};
exports.readAnonCookie = readAnonCookie;
/**
 * Initializes the anonId:
 * - Polls for AnonId receival
 * - Should only be called once at startup
 * - Happens to be safe to call multiple times if it is necessary to reset the anonId - something like this was necessary for testing.
 *
 * This purely for boot-time initialization, in usual circumstances it will be retrieved within 100-300ms, it happens in parallel booting
 * so should only delay experiment loading that much for boot-time experiments. In some circumstances such as a very slow connection this
 * can take a lot longer.
 *
 * The state of initializeAnonIdPromise should be used rather than the return of this function.
 * The return is only available to make this easier to test.
 *
 * Throws on error.
 */
const initializeAnonId = async () => {
    let attempt = 0;
    initializeAnonIdPromise = new Promise((res) => {
        const poll = () => {
            const anonId = (0, exports.readAnonCookie)();
            if (typeof anonId === 'string' && anonId !== '') {
                res(anonId);
                return;
            }
            if (anonIdPollingIntervalMaxAttempts - 1 <= attempt) {
                res(null);
                return;
            }
            attempt = attempt + 1;
            setTimeout(poll, anonIdPollingIntervalMilliseconds);
        };
        poll();
    });
    return initializeAnonIdPromise;
};
exports.initializeAnonId = initializeAnonId;
const getAnonId = async () => {
    if (!assignment_1.canTrack) {
        return null;
    }
    return await initializeAnonIdPromise;
};
exports.getAnonId = getAnonId;
