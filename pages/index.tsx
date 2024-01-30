import { Htag } from '@/components';
import { Noto_Sans } from 'next/font/google';
import React from 'react';


const noto_Sans = Noto_Sans({ subsets: ['latin'] });

export default function Home() {
	return (
		<main
			className={`flex min-h-screen flex-col items-center justify-between p-24 ${noto_Sans.className}`}
		>
			<>
				<Htag tag='h1'>Текст</Htag>
			</>
		</main>
	);
}
