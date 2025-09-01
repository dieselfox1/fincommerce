"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOnboardingDataError = exports.isOnboardingDataRequestPending = exports.getOnboardingData = void 0;
const getOnboardingData = (state, 
// This is only used to get the onboarding data from the store,
// and is not used to determine the current step.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
sessionEntryPoint) => state;
exports.getOnboardingData = getOnboardingData;
const isOnboardingDataRequestPending = (state) => state.isFetching;
exports.isOnboardingDataRequestPending = isOnboardingDataRequestPending;
const getOnboardingDataError = (state) => state.errors.getOnboardingData;
exports.getOnboardingDataError = getOnboardingDataError;
