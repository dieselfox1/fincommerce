export type UploadImage = {
    id?: number;
} & Record<string, string>;
export interface Image {
    id: number;
    src: string;
    name: string;
    alt: string;
}
/**
 * Converts an uploaded image into an Image object.
 */
export declare function mapUploadImageToImage(upload: UploadImage): Image | null;
//# sourceMappingURL=map-upload-image-to-image.d.ts.map