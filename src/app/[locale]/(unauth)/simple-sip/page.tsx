import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

import { SimpleSIPCalculatorForm } from '@/components/SimpleSIPCalculatorForm';

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

const SimpleSip = () => {
  const t = useTranslations('SimpleSIP');

  return (
    <>
      <SimpleSIPCalculatorForm />
      <div className="mt-3">
        <Suspense fallback={<p>{t('loading_simple_sip')}</p>}>
          <div>{t('fallback_title')}</div>
        </Suspense>
      </div>
    </>
  );
};
export const dynamic = 'force-dynamic';
export default SimpleSip;
