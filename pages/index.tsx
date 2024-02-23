import { Htag } from '@/components';
import { Noto_Sans } from 'next/font/google';
import React from 'react';
import { withLayout } from '../layout/Layout';
import { MenuItem } from '../interfaces/menu.interface';
import { GetStaticProps } from 'next';
import axios from 'axios';
import { API } from '@/helpers/api';
import Logo from '@/public/next.svg';
import Head from 'next/head';


const noto_Sans = Noto_Sans({ subsets: ['latin'] });

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Home({ menu }: HomeProps): JSX.Element {
	

	return (
		<>
			<Head>
				<title>MyTop - мой лучший топ</title>
			</Head>
			<main
				className={`flex flex-col  gap-40 items-center justify-between p-24 ${noto_Sans.className}`}
			>
			
				<Htag tag='h1'>Лучшие курсы только для вас!</Htag>
				<Logo />
			</main>
		</>
	);
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
	const firstCategory = 0;
	const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
		firstCategory
	});
	return {
		props: {
			menu,
			firstCategory
		}
	};
};

interface HomeProps extends Record<string, unknown> {
	menu: MenuItem[];
	firstCategory: number;
}