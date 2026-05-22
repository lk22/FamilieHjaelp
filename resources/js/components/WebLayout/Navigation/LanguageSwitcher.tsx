import {Link} from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import { useEffect } from "react";
import i18n from "i18next";
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { locale } = usePage<{ locale: string }>().props;
  const {t} = useTranslation();

  useEffect(() => {
    if (locale && i18n.language !== locale) {
      void i18n.changeLanguage(locale);
    }
  }, [locale]);

  return (
    <>
      <Link href={route('home', { locale: 'da' })} className={`text-sm text-white ${locale === 'da' ? 'font-bold' : ''}`}>
        {t('language_da')}
      </Link>
      <span className="mx-1">|</span>
      <Link href={route('home', { locale: 'en' })} className={`text-sm text-white ${locale === 'en' ? 'font-bold' : ''}`}>
        {t('language_en')}
      </Link>
    </>
  );
}