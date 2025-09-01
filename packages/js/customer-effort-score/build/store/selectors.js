"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCesSurveyQueue = getCesSurveyQueue;
exports.getVisibleCESModalData = getVisibleCESModalData;
exports.isProductMVPFeedbackModalVisible = isProductMVPFeedbackModalVisible;
function getCesSurveyQueue(state) {
    return state.queue;
}
function getVisibleCESModalData(state) {
    return state.showCESModal ? state.cesModalData : undefined;
}
function isProductMVPFeedbackModalVisible(state) {
    return state.showProductMVPFeedbackModal;
}
