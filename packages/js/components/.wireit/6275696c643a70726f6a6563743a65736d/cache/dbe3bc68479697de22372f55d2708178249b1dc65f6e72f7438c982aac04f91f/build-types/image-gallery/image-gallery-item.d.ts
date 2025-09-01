export type ImageGalleryItemProps = {
    id?: string;
    alt: string;
    isCover?: boolean;
    isDraggable?: boolean;
    src: string;
    displayToolbar?: boolean;
    className?: string;
    onClick?: () => void;
    children?: JSX.Element;
} & React.HTMLAttributes<HTMLDivElement>;
export declare const ImageGalleryItem: ({ id, alt, isCover, isDraggable, src, className, onClick, onBlur, children, }: ImageGalleryItemProps) => JSX.Element;
//# sourceMappingURL=image-gallery-item.d.ts.map