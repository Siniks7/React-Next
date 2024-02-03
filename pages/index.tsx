import { Button, Htag, Rating, Tag } from '@/components';
import { Noto_Sans } from 'next/font/google';
import React, { useState } from 'react';
import { withLayout } from '../layout/Layout';
import { MenuItem } from '../interfaces/menu.interface';
import { GetStaticProps } from 'next';
import axios from 'axios';

const noto_Sans = Noto_Sans({ subsets: ['latin'] });

function Home({ menu }: HomeProps): JSX.Element {
	const [rating, setRating] = useState<number>(4);

	return (
		<main
			className={`flex min-h-screen flex-col items-center justify-between p-24 ${noto_Sans.className}`}
		>
			<>
				<Htag tag='h1'>Текст</Htag>
				<Button appearance='primary'>Кнопка</Button>
				<Button arrow='down' appearance='ghost'>Кнопка</Button>
				<Tag size='s'>Ghost</Tag>
				<Tag size='m' color='red'>Red</Tag>
				<Tag size='s' color='green'>Green</Tag>
				<Tag color='primary'>Green</Tag>
				<Rating rating={rating} isEditable setRating={setRating} />
				<ul>
					{menu.map(m => (<li key={m._id.secondCategory}>{m._id.secondCategory}</li>))}
				</ul>
			</>
		</main>
	);
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
	const firstCategory = 0;
	const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
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