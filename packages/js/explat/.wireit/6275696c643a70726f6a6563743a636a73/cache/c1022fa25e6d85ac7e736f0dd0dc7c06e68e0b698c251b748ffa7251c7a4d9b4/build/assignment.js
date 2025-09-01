"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchExperimentAssignmentWithAuth = exports.fetchExperimentAssignment = exports.canTrack = void 0;
/**
 * External dependencies
 */
const qs_1 = require("qs");
const hooks_1 = require("@wordpress/hooks");
const api_fetch_1 = __importDefault(require("@wordpress/api-fetch"));
exports.canTrack = window.wcTracks?.isEnabled || window?._wca?.push !== undefined;
const EXPLAT_VERSION = '0.1.0';
const isValidQueryParams = (queryParams) => {
    return (queryParams.hasOwnProperty('experiment_name') &&
        queryParams.hasOwnProperty('woo_country_code') &&
        queryParams.hasOwnProperty('woo_wcadmin_install_timestamp'));
};
const getRequestQueryParams = ({ experimentName, anonId, }) => {
    /**
     * List of URL query parameters to be sent to the server.
     *
     * @filter fincommerce_explat_request_args
     * @example
     * addFilter(
     * 	'fincommerce_explat_request_args',
     * 	'fincommerce_explat_request_args',
     * ( args ) => {
     * 	args.experimentName = 'my-experiment';
     * 	return args;
     * });
     */
    const queryParams = (0, hooks_1.applyFilters)('fincommerce_explat_request_args', {
        experiment_name: experimentName,
        anon_id: anonId ?? undefined,
        woo_country_code: window.wcSettings?.preloadSettings?.general
            ?.fincommerce_default_country ||
            window.wcSettings?.admin?.preloadSettings?.general
                ?.fincommerce_default_country,
        woo_wcadmin_install_timestamp: window.wcSettings?.admin?.preloadOptions
            ?.fincommerce_admin_install_timestamp,
    });
    if (!isValidQueryParams(queryParams)) {
        throw new Error(`Invalid query Params: ${JSON.stringify(queryParams)}`);
    }
    // Make sure test name is a valid one.
    if (!/^[A-Za-z0-9_]+$/.test(queryParams.experiment_name)) {
        throw new Error(`Invalid A/B test name: ${queryParams.experiment_name}`);
    }
    return queryParams;
};
const fetchExperimentAssignment = async ({ experimentName, anonId, }) => {
    if (!exports.canTrack) {
        throw new Error(`Tracking is disabled, can't fetch experimentAssignment`);
    }
    const queryParams = getRequestQueryParams({ experimentName, anonId });
    if (!queryParams.anon_id) {
        throw new Error(`Can't fetch experiment assignment without an anonId or auth, please initialize anonId first or use fetchExperimentAssignmentWithAuth instead.`);
    }
    const response = await window.fetch(`https://public-api.wordpress.com/wpcom/v2/experiments/${EXPLAT_VERSION}/assignments/fincommerce?${(0, qs_1.stringify)(queryParams)}`);
    return await response.json();
};
exports.fetchExperimentAssignment = fetchExperimentAssignment;
const fetchExperimentAssignmentWithAuth = async ({ experimentName, anonId, }) => {
    if (!exports.canTrack) {
        throw new Error(`Tracking is disabled, can't fetch experimentAssignment`);
    }
    // Use apiFetch to send request with credentials and nonce to our backend api to get the assignment with a user token via Jetpack.
    return await (0, api_fetch_1.default)({
        path: `/wc-admin/experiments/assignment?${(0, qs_1.stringify)(getRequestQueryParams({
            experimentName,
            anonId,
        }))}`,
    });
};
exports.fetchExperimentAssignmentWithAuth = fetchExperimentAssignmentWithAuth;
