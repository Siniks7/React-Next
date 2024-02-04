import { SidebarProps } from './Sidebar.props';
import { Menu } from '../Menu/Menu';
import Logo from '../logo.svg';
import cn from 'classnames';
import styles from './Sidebar.module.css';

export const Sidebar = ({ className, ...props }: SidebarProps): JSX.Element => {
	return (
		<div className={cn(className, styles.sidebar)} {...props}>
			<Logo className={styles.logo} />
			<div>поиск</div>
			<Menu />
		</div>
	);
};