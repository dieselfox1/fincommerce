export interface LabelProps {
    label: string;
    labelId?: string;
    required?: boolean;
    note?: string;
    tooltip?: string;
    onClick?: (event: React.MouseEvent) => void;
}
export declare const Label: ({ label, labelId, required, tooltip, note, onClick, }: LabelProps) => JSX.Element;
//# sourceMappingURL=label.d.ts.map