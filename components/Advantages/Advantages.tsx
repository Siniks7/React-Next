import styles from './Advantages.module.css';
import CheckIcon from './check.svg';
import { AdvantagesProps } from './Advantages.props';
import { TopPageAdvantage } from '@/interfaces/page.interface';

export const Advatages = ( { advantages } : AdvantagesProps): JSX.Element => {
	return (
		<>
			{advantages.map((a: TopPageAdvantage) => (
				<div key={a._id} className={styles.advantage}>
					<CheckIcon />
					<div className={styles.title}>{a.title}</div>
					<hr className={styles.vline} />
					<div>{a.description}</div>
				</div>
			))}
		</>
	);
};