export const getOnboardingData = (state, 
// This is only used to get the onboarding data from the store,
// and is not used to determine the current step.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
sessionEntryPoint) => state;
export const isOnboardingDataRequestPending = (state) => state.isFetching;
export const getOnboardingDataError = (state) => state.errors.getOnboardingData;
