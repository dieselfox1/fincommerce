export declare const DEFAULT_CONTROLS: {
    fontFamily: boolean;
    fontSize: boolean;
    fontAppearance: boolean;
    lineHeight: boolean;
    letterSpacing: boolean;
    textTransform: boolean;
    textDecoration: boolean;
    writingMode: boolean;
    textColumns: boolean;
};
export declare function TypographyElementPanel({ element, headingLevel, defaultControls, }: {
    element: string;
    headingLevel: string;
    defaultControls?: typeof DEFAULT_CONTROLS;
}): import("react/jsx-runtime").JSX.Element;
export default TypographyElementPanel;
