import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
    fallbackLng: 'en',
    lng: 'en',
    resources: {
        en: {
            translations: require('./localization/en/translation.json'),
        },
        si: {
            translations: require('./localization/si/translation.json'),
        },
        ta: {
            translations: require('./localization/ta/translation.json'),
        },
    },
    ns: ['translations'],
    defaultNS: 'translations',
});

i18n.languages = ['en', 'si', 'ta'];

export default i18n;

