/**
 * External dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
export default {
    calendarLabel: __('Calendar', 'fincommerce'),
    closeDatePicker: __('Close', 'fincommerce'),
    focusStartDate: __('Interact with the calendar and select start and end dates.', 'fincommerce'),
    clearDate: __('Clear Date', 'fincommerce'),
    clearDates: __('Clear Dates', 'fincommerce'),
    jumpToPrevMonth: __('Move backward to switch to the previous month.', 'fincommerce'),
    jumpToNextMonth: __('Move forward to switch to the next month.', 'fincommerce'),
    enterKey: __('Enter key', 'fincommerce'),
    leftArrowRightArrow: __('Right and left arrow keys', 'fincommerce'),
    upArrowDownArrow: __('up and down arrow keys', 'fincommerce'),
    pageUpPageDown: __('page up and page down keys', 'fincommerce'),
    homeEnd: __('Home and end keys', 'fincommerce'),
    escape: __('Escape key', 'fincommerce'),
    questionMark: __('Question mark', 'fincommerce'),
    selectFocusedDate: __('Select the date in focus.', 'fincommerce'),
    moveFocusByOneDay: __('Move backward (left) and forward (right) by one day.', 'fincommerce'),
    moveFocusByOneWeek: __('Move backward (up) and forward (down) by one week.', 'fincommerce'),
    moveFocusByOneMonth: __('Switch months.', 'fincommerce'),
    moveFocustoStartAndEndOfWeek: __('Go to the first or last day of a week.', 'fincommerce'),
    returnFocusToInput: __('Return to the date input field.', 'fincommerce'),
    keyboardNavigationInstructions: __('Press the down arrow key to interact with the calendar and select a date.', 'fincommerce'),
    chooseAvailableStartDate: ({ date }) => 
    /* translators: %s: start date */
    sprintf(__('Select %s as a start date.', 'fincommerce'), date),
    chooseAvailableEndDate: ({ date }) => 
    /* translators: %s: end date */
    sprintf(__('Select %s as an end date.', 'fincommerce'), date),
    chooseAvailableDate: ({ date }) => date,
    dateIsUnavailable: ({ date }) => 
    /* translators: %s: unavailable date which was selected */
    sprintf(__('%s is not selectable.', 'fincommerce'), date),
    dateIsSelected: ({ date }) => 
    /* translators: %s: selected date successfully */
    sprintf(__('Selected. %s', 'fincommerce'), date),
};
