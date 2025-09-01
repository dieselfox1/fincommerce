"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProvideExperimentDataWithAuth = exports.ExperimentWithAuth = exports.useExperimentWithAuth = exports.dangerouslyGetExperimentAssignmentWithAuth = exports.loadExperimentAssignmentWithAuth = exports.ProvideExperimentData = exports.Experiment = exports.useExperiment = exports.dangerouslyGetExperimentAssignment = exports.loadExperimentAssignment = exports.initializeExPlat = void 0;
/**
 * External dependencies
 */
const explat_client_1 = require("@automattic/explat-client");
const explat_client_react_helpers_1 = __importDefault(require("@automattic/explat-client-react-helpers"));
/**
 * Internal dependencies
 */
const utils_1 = require("./utils");
const error_1 = require("./error");
const assignment_1 = require("./assignment");
const anon_1 = require("./anon");
const initializeExPlat = () => {
    if (assignment_1.canTrack) {
        (0, anon_1.initializeAnonId)().catch((e) => (0, error_1.logError)({ message: e.message }));
    }
};
exports.initializeExPlat = initializeExPlat;
(0, exports.initializeExPlat)();
const exPlatClient = (0, explat_client_1.createExPlatClient)({
    fetchExperimentAssignment: assignment_1.fetchExperimentAssignment,
    getAnonId: anon_1.getAnonId,
    logError: error_1.logError,
    isDevelopmentMode: utils_1.isDevelopmentMode,
});
exports.loadExperimentAssignment = exPlatClient.loadExperimentAssignment, exports.dangerouslyGetExperimentAssignment = exPlatClient.dangerouslyGetExperimentAssignment;
_a = (0, explat_client_react_helpers_1.default)(exPlatClient), exports.useExperiment = _a.useExperiment, exports.Experiment = _a.Experiment, exports.ProvideExperimentData = _a.ProvideExperimentData;
// Create another auth client that send request to wpcom as auth user.
const exPlatClientWithAuth = (0, explat_client_1.createExPlatClient)({
    fetchExperimentAssignment: assignment_1.fetchExperimentAssignmentWithAuth,
    getAnonId: anon_1.getAnonId,
    logError: error_1.logError,
    isDevelopmentMode: utils_1.isDevelopmentMode,
});
exports.loadExperimentAssignmentWithAuth = exPlatClientWithAuth.loadExperimentAssignment, exports.dangerouslyGetExperimentAssignmentWithAuth = exPlatClientWithAuth.dangerouslyGetExperimentAssignment;
_b = (0, explat_client_react_helpers_1.default)(exPlatClientWithAuth), exports.useExperimentWithAuth = _b.useExperiment, exports.ExperimentWithAuth = _b.Experiment, exports.ProvideExperimentDataWithAuth = _b.ProvideExperimentData;
