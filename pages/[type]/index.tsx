import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import React from 'react';
import axios from 'axios';
import { MenuItem } from '../../interfaces/menu.interface';
import { withLayout } from '../../layout/Layout';
import { firstLevelMenu } from '../../helpers/helpers';
import { ParsedUrlQuery } from 'node:querystring';
import { API } from '@/helpers/api';
import Link from 'next/link';
import { useRouter } from 'next/router';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Type({ menu, firstCategory }: TypeProps): JSX.Element {

	const router = useRouter();

	return (
		<main className={'grid grid-cols-5 gap-1 items-center'}>
			{menu && menu.flatMap(m => m.pages.map(p => <Link href={`/${router.asPath}/${p.alias}`} className={' border-solid border-2 bg-indigo-400 p-5 min-h-full text-gray-100'} key={p._id}>{p.title}</Link>))}
		</main>
	);
}

export default withLayout(Type);

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: firstLevelMenu.map(m => '/' + m.route),
		fallback: true
	};
};

export const getStaticProps: GetStaticProps<TypeProps> = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {
	if (!params) {
		return {
			notFound: true
		};
	}
	const firstCategoryItem = firstLevelMenu.find(m => m.route == params.type);
	if (!firstCategoryItem) {
		return {
			notFound: true
		};
	}
	try {
		const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
			firstCategory: firstCategoryItem.id
		});	
		return {
			props: {
				menu,
				firstCategory: firstCategoryItem.id
			}
		};
	} catch {
		return {
			notFound: true
		};
	}	
};

interface TypeProps extends Record<string, unknown> {
	menu: MenuItem[];
	firstCategory: number;
}


