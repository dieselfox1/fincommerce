"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVisibleTasks = void 0;
/**
 * Filters tasks to only visible tasks, taking in account snoozed tasks.
 */
const getVisibleTasks = (tasks) => tasks.filter((task) => !task.isDismissed);
exports.getVisibleTasks = getVisibleTasks;
