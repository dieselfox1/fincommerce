export function isSameDay(left, right) {
    return (left.getDate() === right.getDate() &&
        left.getMonth() === right.getMonth() &&
        left.getFullYear() === right.getFullYear());
}
