import { Htag, P } from '@/components';
import { Noto_Sans } from 'next/font/google';
import React from 'react';
import { withLayout } from '../layout/Layout';


const noto_Sans = Noto_Sans({ subsets: ['latin'] });

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Home(): JSX.Element {
	

	return (
		<main
			className={`flex flex-col  gap-40 items-center justify-between p-24 ${noto_Sans.className}`}
		>
			<>
				<Htag tag='h1'>Пользовательское соглашение</Htag>
				<P> Пользовательское соглашение сайта mysite.ru

Настоящий документ «Пользовательское соглашение» представляет собой предложение ООО «_____» (далее — «Администрация»), заключить договор на изложенных ниже условиях Соглашения.
1. Общие положения Пользовательского соглашения

1.1. В настоящем документе и вытекающих или связанным с ним отношениях Сторон применяются следующие термины и определения:
а) Платформа — программно-аппаратные средства, интегрированные с Сайтом Администрации;

б) Пользователь — дееспособное физическое лицо, присоединившееся к настоящему Соглашению в собственном интересе либо выступающее от имени и в интересах представляемого им юридического лица.

в) Сайт Администрации/ Сайт — интернет-сайты, размещенные в домене ________.ru и его поддоменах.

г) Сервис — комплекс услуг и лицензия, предоставляемые Пользователю с использованием Платформы.

д) Соглашение - настоящее соглашение со всеми дополнениями и изменениями.</P>
				
			</>
		</main>
	);
}

export default withLayout(Home);

