import styles from './Menu.module.css';
import cn from 'classnames';
import { KeyboardEvent, useContext, useEffect, useState} from 'react';
import { AppContext } from '../../context/app.context';
import { FirstLevelMenuItem, MenuItem, PageItem } from '../../interfaces/menu.interface';
import { firstLevelMenu } from '@/helpers/helpers';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, useReducedMotion } from 'framer-motion';
import axios, { isAxiosError } from 'axios';
import { API } from '@/helpers/api';
import { TopLevelCategory } from '@/interfaces/page.interface';


export const Menu = (): JSX.Element => {	
	const { menu, setMenu, firstCategory } = useContext(AppContext);
	const router = useRouter();
	const [announce, setAnnounce] = useState<'closed' | 'opened' | undefined>();
	const shouldReduceMotion = useReducedMotion();

	useEffect(() => {
		setMenu &&	getMenu(firstCategory); 
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [firstCategory]);

	const openSecondLevelKey = (key: KeyboardEvent, secondCategory: string) => {
		if (key.code == 'Space' || key.code == 'Enter') {
			key.preventDefault();
			openSecondLevel(secondCategory);
		}
	};

	async function getMenu(firstCategory: TopLevelCategory) {
		try {
			const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
				firstCategory
			});
			setMenu && setMenu(menu);
		} catch (err) {
			if (isAxiosError(err)) {
				console.error(err.toJSON());
			}		
		}
	}
	

	const variants = {
		visible: {
			marginBottom: 10,
			transition: shouldReduceMotion ? {} : {
				when: 'beforeChildren',
				staggerChildren: 0.1
			}
		},
		hidden: { marginBottom: 0 }
	};

	const variantsChildren = {
		visible: {
			opacity: 1,
			height: 29
		},
		hidden: { opacity: shouldReduceMotion ? 1 : 0, height: 0 }
	};

	const openSecondLevel = (secondCategory: string) => {
		setMenu && setMenu(menu.map(m => {
			if (m._id.secondCategory == secondCategory) {
				setAnnounce(m.isOpened ? 'closed' : 'opened');
				m.isOpened = !m.isOpened;
			}
			return m;
		}));
	};

	const buildFirstLevel = () => {
		return (
			<ul className={styles.firstLevelList}>
				{firstLevelMenu.map(m => (
					// eslint-disable-next-line jsx-a11y/role-supports-aria-props
					<li key={m.route} aria-expanded={m.id == firstCategory}>
						<Link href={`/${m.route}`}>
							<div className={cn(styles.firstLevel, {
								[styles.firstLevelActive]: m.id == firstCategory
							})}>
								{m.icon}
								<span >{m.name}</span>
							</div>
						</Link>
						{m.id == firstCategory && buildSecondLevel(m)}
					</li>
				))}
			</ul>
		);
	};

	const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
		return (
			<ul className={styles.secondBlock}>
				{menu.map(m => {
					if (m.pages.map(p => p.alias).includes(router.asPath.split('/')[2])) {
						m.isOpened = true;
					}
					return (
						<li key={m._id.secondCategory}>
							<button
								onKeyDown={(key: KeyboardEvent) => openSecondLevelKey(key, m._id.secondCategory)}
								className={styles.secondLevel}
								onClick={() => openSecondLevel(m._id.secondCategory)}
								aria-expanded={m.isOpened}
							>{m._id.secondCategory}</button>
							<motion.ul
								layout
								variants={variants}
								initial={m.isOpened ? 'visible' : 'hidden'}
								animate={m.isOpened ? 'visible' : 'hidden'}
								className={styles.secondLevelBlock}
							>
								{buildThirdLevel(m.pages, menuItem.route, m.isOpened ?? false)}
							</motion.ul>
						</li>
					);
				})}
			</ul>
		);
	};

	const buildThirdLevel = (pages: PageItem[], route: string, isOpened: boolean) => {
		
		return (
			pages.map(p => (
				<motion.li key={p._id} variants={variantsChildren}>
					<Link tabIndex={isOpened ? 0 : -1} 
						href={`/${route}/${p.alias}`} 
						aria-current={`/${route}/${p.alias}` == router.asPath ? 'page' : false}
						className={cn(styles.thirdLevel, {
							[styles.thirdLevelActive]: `/${route}/${p.alias}` == router.asPath
						})}>
						{p.category}
					</Link>
				</motion.li>
			))
		);
	};

	return (
		<nav className={styles.menu} role='navigation'>
			{announce && <span role="log" className="visualyHidden">{announce == 'opened' ? 'развернуто' : 'свернуто'}</span>}
			{buildFirstLevel()}
		</nav>
	);
};