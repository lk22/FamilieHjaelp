import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export default function initializeLocalization(locale: string, translations: Record<string, never>) {
    i18n.use(initReactI18next).init({
        lng: locale,
        fallbackLng: 'en',
        ns: ['web'],
        defaultNS: 'web',
        resources: translations,
    });
}