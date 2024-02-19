import { HhData, Htag, Product, Sort, Tag } from '@/components';
import { TopPageComponentProps } from './TopPageComponent.props';
import { TopLevelCategory } from '@/interfaces/page.interface';
import styles from './TopPageComponent.module.css';
import { Advatages } from '@/components/Advantages/Advantages';
import { SortEnum } from '@/components/Sort/Sort.props';
import { useEffect, useReducer } from 'react';
import { sortReducer } from './sort.reducer';

export const TopPageComponent = ({ page, products, firstCategory }: TopPageComponentProps): JSX.Element => {
	
	const [{ products: sortedProducts, sort }, dispathSort] = useReducer(sortReducer, { products, sort: SortEnum.Rating });

	const setSort = (sort: SortEnum) => {
		dispathSort({ type: sort });
	};

	useEffect(() => {
		dispathSort({ type: 'reset', initialState: products });
	}, [products]);


	return (
		<div className={styles.wrapper}>
			<div className={styles.title}>
				{page && <Htag tag='h1'>{page.title}</Htag>}
				{!page && <Htag tag='h1'>Найденные курсы</Htag>}
				{products && <Tag color='grey' size='m'>{products.length}</Tag>}
				<Sort sort={sort} setSort={setSort} />
			</div>
			<div>
				{sortedProducts && sortedProducts.map(p => (<Product layout key={p._id} product={p} />))}
			</div>
			{page && <div className={styles.hhTitle}>
				<Htag tag='h2'>Вакансии - {page.category}</Htag>
				<Tag color='red' size='m'>hh.ru</Tag>
			</div>}
			{page && firstCategory == TopLevelCategory.Courses && page.hh && <HhData {...page.hh} />}
			{page && page.advantages && page.advantages.length > 0 && page.advantages[0].title && <>
				<Htag tag='h2'>Преимущeства</Htag>
				<Advatages advantages={page.advantages} />
			</>
			}
			{page && page.seoText && <div className={styles.seo} dangerouslySetInnerHTML={{ __html: page.seoText }} />}
			{page && <Htag tag='h2'>Получаемые навыки</Htag>}
			<div className={styles.tags}>
				{page && page.tags.map(t => <Tag key={t} color='primary'>{t}</Tag>)}
			</div>
		</div>
	);
};