/**
 * Filters tasks to only visible tasks, taking in account snoozed tasks.
 */
export const getVisibleTasks = (tasks) => tasks.filter((task) => !task.isDismissed);
