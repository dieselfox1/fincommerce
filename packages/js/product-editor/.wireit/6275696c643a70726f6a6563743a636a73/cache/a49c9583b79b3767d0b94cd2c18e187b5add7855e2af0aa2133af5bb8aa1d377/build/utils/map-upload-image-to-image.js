"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapUploadImageToImage = mapUploadImageToImage;
/**
 * Converts an uploaded image into an Image object.
 */
function mapUploadImageToImage(upload) {
    if (!upload.id)
        return null;
    return {
        id: upload.id,
        name: upload.title,
        src: upload.url,
        alt: upload.alt,
    };
}
