import { GetStaticProps } from 'next';
import React from 'react';
import { withLayout } from '../layout/Layout';
import axios from 'axios';
import { MenuItem } from '../interfaces/menu.interface';
import { API } from '@/helpers/api';
import { useRouter } from 'next/router';
import { ProductModel } from '@/interfaces/product.interface';
import { TopPageComponent } from '@/page-components';
import { Htag } from '@/components';


function Search({ products, firstCategory}: HomeProps): JSX.Element {

	const router = useRouter();
	const q = router.query.q;
	
	return (
		<>	
			{!q && <Htag tag='h1'>Продукты не найдены</Htag>}
			{q && <TopPageComponent
				firstCategory={firstCategory}
				products={products.filter(p => p.title.toLowerCase().includes(q.toString()))}
			/>}
		</>
	);
}

export default withLayout(Search);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
	const firstCategory = 0;
	try {
		const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
			firstCategory: firstCategory
		});	

		const myArray = [];
		for (const el of menu) {
			myArray.push(el.pages);
		}
		const allMenu = myArray.flat();
		const allProducts = [];
		for (const product of allMenu) {		
			const { data: products } = await axios.post<ProductModel[]>(API.product.find, {
				category: product.category,
				limit: 10
			});
			allProducts.push(products);
		}
		const products = Array.from(new Set(allProducts.flat()));
		
		return {
			props: {
				menu,
				firstCategory: firstCategory,
				products
			}
		};
	} catch {
		return {
			notFound: true
		};
	}
};

interface HomeProps extends Record<string, unknown> {
	menu: MenuItem[];
	firstCategory: number;
	products: ProductModel[];
}

