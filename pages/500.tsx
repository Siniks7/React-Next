import React from 'react';
import { Htag } from '../components';
import { withLayout } from '../layout/Layout';
import { MenuItem } from '@/interfaces/menu.interface';
import axios from 'axios';
import { GetStaticProps } from 'next';
import { API } from '@/helpers/api';

function Error500(): JSX.Element {
	return (
		<>
			<Htag tag='h1'>Ошибка 500</Htag>
		</>
	);
}

export default withLayout(Error500);

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