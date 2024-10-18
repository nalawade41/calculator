import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

import { AgeCalculatorForm } from '@/components/AgeCalculatorForm';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'Age',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

const Counter = () => {
  const t = useTranslations('Age');

  return (
    <>
      <AgeCalculatorForm />
      <div className="mt-3">
        <Suspense fallback={<p>{t('loading_age')}</p>}>
          <div>{t('fallback_title')}</div>
        </Suspense>
      </div>
    </>
  );
};
export const dynamic = 'force-dynamic';
export default Counter;
