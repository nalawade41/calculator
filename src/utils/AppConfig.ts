import type { LocalePrefix } from 'node_modules/next-intl/dist/types/src/routing/types';

const localePrefix: LocalePrefix = 'as-needed';

export const AppConfig = {
  name: 'Wealth Journey Tools',
  locales: ['en'],
  defaultLocale: 'en',
  localePrefix,
};
