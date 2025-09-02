/**
 * External dependencies
 */
import { useState } from '@finpress/element';
import { ImageUpload } from '@fincommerce/components';

const ImageUploadExample = () => {
	const [ image, setImage ] = useState( null );

	return (
		<ImageUpload
			image={ image }
			onChange={ ( _image ) => setImage( _image ) }
		/>
	);
};

export const Basic = () => <ImageUploadExample />;

export default {
	title: 'Components/ImageUpload',
	component: ImageUpload,
};
