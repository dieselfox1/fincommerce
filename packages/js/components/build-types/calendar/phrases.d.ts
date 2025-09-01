declare namespace _default {
    let calendarLabel: string;
    let closeDatePicker: string;
    let focusStartDate: string;
    let clearDate: string;
    let clearDates: string;
    let jumpToPrevMonth: string;
    let jumpToNextMonth: string;
    let enterKey: string;
    let leftArrowRightArrow: string;
    let upArrowDownArrow: string;
    let pageUpPageDown: string;
    let homeEnd: string;
    let escape: string;
    let questionMark: string;
    let selectFocusedDate: string;
    let moveFocusByOneDay: string;
    let moveFocusByOneWeek: string;
    let moveFocusByOneMonth: string;
    let moveFocustoStartAndEndOfWeek: string;
    let returnFocusToInput: string;
    let keyboardNavigationInstructions: string;
    function chooseAvailableStartDate({ date }: {
        date: any;
    }): string;
    function chooseAvailableEndDate({ date }: {
        date: any;
    }): string;
    function chooseAvailableDate({ date }: {
        date: any;
    }): any;
    function dateIsUnavailable({ date }: {
        date: any;
    }): string;
    function dateIsSelected({ date }: {
        date: any;
    }): string;
}
export default _default;
//# sourceMappingURL=phrases.d.ts.map