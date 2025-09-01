type WCPayCardHeaderProps = {
    logoWidth?: number;
    logoHeight?: number;
    children?: React.ReactNode;
};
export declare const WCPayCardHeader: ({ logoWidth, logoHeight, children, }: WCPayCardHeaderProps) => JSX.Element;
type WCPayCardBodyProps = {
    description: string;
    heading: string;
    onLinkClick?: () => void;
};
export declare const WCPayCardBody: React.VFC<WCPayCardBodyProps>;
export declare const WCPayCardFooter: ({ children, }: {
    children?: React.ReactNode;
}) => JSX.Element;
export declare const WCPayCard: ({ children }: {
    children?: React.ReactNode;
}) => JSX.Element;
export {};
//# sourceMappingURL=WCPayCard.d.ts.map