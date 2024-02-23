import { GetStaticProps } from 'next';
import React from 'react';
import { withLayout } from '../layout/Layout';
import axios from 'axios';
import { MenuItem, PageItem } from '../interfaces/menu.interface';
import { API } from '@/helpers/api';
import { useRouter } from 'next/router';
import { ProductModel } from '@/interfaces/product.interface';
import { TopPageComponent } from '@/page-components';
import { Htag } from '@/components';
import Head from 'next/head';


function Search({ products, firstCategory}: HomeProps): JSX.Element {

	const router = useRouter();
	const q = router.query.q;
	let myProducts: ProductModel[] = [];
	q ?  myProducts = unique(products.filter(p => p.title.toLowerCase().includes(q.toString()))) : myProducts = [];

	function unique(arr: ProductModel[]): ProductModel[] {
		const result: ProductModel[] = [];
		const myRes: string[] = [];
		for (const el of arr) {
			
			if (!myRes.includes(JSON.stringify(el))) {
				myRes.push((JSON.stringify(el)));
				result.push(el);
			}
		}
		return result;
	}

	
	return (
		<>	
			<Head>
				<title>MyTop - мой лучший топ</title>
			</Head>
			{!q && <Htag tag='h1'>Продукты не найдены</Htag>}
			{q && <TopPageComponent
				firstCategory={firstCategory}
				products={myProducts}
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

		let myArray: PageItem[] = [];
		for (const el of menu) {
			myArray = myArray.concat(el.pages);
		}
		const allMenu = myArray.flat();
		let allProducts: ProductModel[] = [];
		for (const product of allMenu) {		
			const { data: products } = await axios.post<ProductModel[]>(API.product.find, {
				category: product.category,
				limit: 10
			});
			allProducts = allProducts.concat(products);
		}
		const products = allProducts;

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

