import { unstable_setRequestLocale } from 'next-intl/server';

import NavBar from '@/components/NavBar';
import { TopBanner } from '@/components/TopBanner';
import { BaseTemplate } from '@/templates/BaseTemplate';

export default function Layout(props: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(props.params.locale);

  return (
    <>
      <TopBanner />
      <BaseTemplate
        leftNav={(<NavBar />)}
      >
        <div className="py-5 text-xl [&_p]:my-6">{props.children}</div>
      </BaseTemplate>
    </>
  );
}
