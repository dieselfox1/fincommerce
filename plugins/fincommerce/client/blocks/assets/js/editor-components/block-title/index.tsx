/**
 * External dependencies
 */
import { PlainText } from '@finpress/block-editor';
import { withInstanceId } from '@finpress/compose';
import { __ } from '@finpress/i18n';

/**
 * Internal dependencies
 */
import '@fincommerce/block-library/assets/js/editor-components/block-title/editor.scss';
interface BlockTitleProps {
	className: string;
	headingLevel: number;
	onChange: ( value: string ) => void;
	heading: string;
	instanceId: number;
}
const BlockTitle = ( {
	className,
	headingLevel,
	onChange,
	heading,
	instanceId,
}: BlockTitleProps ) => {
	const TagName = `h${ headingLevel }` as keyof JSX.IntrinsicElements;
	return (
		<TagName className={ className }>
			<label
				className="screen-reader-text"
				htmlFor={ `block-title-${ instanceId }` }
			>
				{ __( 'Block title', 'fincommerce' ) }
			</label>
			<PlainText
				id={ `block-title-${ instanceId }` }
				className="wc-block-editor-components-title"
				value={ heading }
				onChange={ onChange }
				style={ { backgroundColor: 'transparent' } }
			/>
		</TagName>
	);
};

export default withInstanceId( BlockTitle );
