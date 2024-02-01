import { Button, Htag, Rating, Tag } from '@/components';
import { Noto_Sans } from 'next/font/google';
import React, { useState } from 'react';

const noto_Sans = Noto_Sans({ subsets: ['latin'] });

export default function Home() {
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
			</>
		</main>
	);
}
