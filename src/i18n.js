import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import uzCommon from './locales/uz/common.json';
import ruCommon from './locales/ru/common.json';
import enCommon from './locales/en/common.json';

const savedLang = localStorage.getItem('portfolio-lang') || 'en';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      uz: { common: uzCommon },
      ru: { common: ruCommon },
      en: { common: enCommon },
    },
    lng: savedLang,
    fallbackLng: 'en',
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
