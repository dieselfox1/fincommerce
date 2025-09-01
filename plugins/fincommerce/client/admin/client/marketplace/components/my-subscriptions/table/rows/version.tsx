interface VersionProps {
	span: string;
}

export default function Version( props: VersionProps ) {
	return (
		<span className="fincommerce-marketplace__my-subscriptions-version">
			{ props.span }
		</span>
	);
}
