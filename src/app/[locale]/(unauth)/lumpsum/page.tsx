import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

import { LumpsumCalculatorForm } from '@/components/LumpsumCalculatorForm';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'SimpleSIP',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

const LumpSum = () => {
  const t = useTranslations('LumpSum');

  return (
    <>
      <LumpsumCalculatorForm />
      <div className="mt-3">
        <Suspense fallback={<p>{t('loading_lumpsum')}</p>}>
          <div>{t('fallback_title')}</div>
        </Suspense>
      </div>
    </>
  );
};
export const dynamic = 'force-dynamic';
export default LumpSum;
