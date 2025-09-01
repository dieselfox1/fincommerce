type Position = 'top left' | 'top right' | 'top center' | 'middle left' | 'middle right' | 'middle center' | 'bottom left' | 'bottom right' | 'bottom center';
type TooltipProps = {
    children?: JSX.Element | string;
    helperText?: string;
    position?: Position;
    text: JSX.Element | string;
    className?: string;
};
export declare const Tooltip: ({ children, className, helperText, position, text, }: TooltipProps) => JSX.Element;
export {};
//# sourceMappingURL=tooltip.d.ts.map