"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WooOnboardingTaskListHeader = void 0;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const components_1 = require("@wordpress/components");
/**
 * A Fill for adding Onboarding Task List headers.
 *
 * @slotFill WooOnboardingTaskListHeader
 * @scope fincommerce-tasks
 * @param {Object} props    React props.
 * @param {string} props.id Task id.
 */
const WooOnboardingTaskListHeader = ({ id, ...props }) => ((0, element_1.createElement)(components_1.Fill, { name: 'fincommerce_onboarding_task_list_header_' + id, ...props }));
exports.WooOnboardingTaskListHeader = WooOnboardingTaskListHeader;
exports.WooOnboardingTaskListHeader.Slot = ({ id, fillProps, }) => ((0, element_1.createElement)(components_1.Slot, { name: 'fincommerce_onboarding_task_list_header_' + id, fillProps: fillProps }));
