/**
 * Converts an uploaded image into an Image object.
 */
export function mapUploadImageToImage(upload) {
    if (!upload.id)
        return null;
    return {
        id: upload.id,
        name: upload.title,
        src: upload.url,
        alt: upload.alt,
    };
}
