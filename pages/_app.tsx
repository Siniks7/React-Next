import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';


export default function App({ Component, pageProps, router }: AppProps) {

	return <>
		<Head>
			<title>MyTop - наш лучший топ</title>
			<meta property="og:url" content={process.env.NEXT_PUBLIC_DOMAIN + router.asPath} />
			<meta property="og:locale" content="ru_RU" />
		</Head>
		<Component {...pageProps} />;
	</>;
}
