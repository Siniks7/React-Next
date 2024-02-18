import React from 'react';
import { Htag } from '../components';
import { withLayout } from '../layout/Layout';
import { MenuItem } from '@/interfaces/menu.interface';
import { GetStaticProps } from 'next';
import axios from 'axios';
import { API } from '@/helpers/api';


export function Error404(): JSX.Element {

	return (
		<>
			<Htag tag='h1'>Ошибка 404</Htag>
		</>
	);
}

export default withLayout(Error404);



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