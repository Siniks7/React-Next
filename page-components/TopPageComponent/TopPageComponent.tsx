import { TopPageComponentProps } from './TopPageComponent.props';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const TopPageComponent = ({ page, products, firstCategory }: TopPageComponentProps): JSX.Element => {
	return (
		<>
			{products && products.length}
		</>
	);
};