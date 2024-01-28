import { Noto_Sans } from 'next/font/google';
import Head from 'next/head';

const noto_Sans = Noto_Sans({ subsets: ['latin'] });

export default function Home() {
	return (
		<main
			className={`flex min-h-screen flex-col items-center justify-between p-24 ${noto_Sans.className}`}
		>
			<Head>
				<title>
					Top app
				</title>
			</Head>
			<div>
				352
			</div>
		</main>
	);
}
